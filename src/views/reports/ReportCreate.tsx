import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Spinner from '../../components/Navigation/Spinner'
import Form from '../../components/Forms/Form'
import FormSection from '../../components/Forms/FormSection'
import Text from '../../components/Fields/Text'
import Date from '../../components/Fields/Date'
import Select2 from '../../components/Fields/Select2'
import TextArea from '../../components/Fields/TextArea'
import Number from '../../components/Fields/Number'

import { TReport, TReportErrors, TComponent, TActivity, TMunicipality, TCommunity } from '../../types'

import * as constants from '../../constants'
import { transformCollection, generateId } from '../../utilities'

import { setReport, updateReport } from '../../redux/reducers/reportSlice'

import validateForm from '../../validations/report.form.validations'

const ReportCreate = () => {
    const report = useSelector((state: any) => state.report) // add type selector
    const project = useSelector((state: any) => state.project) // add type selector
    const component = useSelector((state: any) => state.component) // add type selector
    const activity = useSelector((state: any) => state.activity) // add type selector
    const state = useSelector((state: any) => state.state) // add type selector
    const municipality = useSelector((state: any) => state.municipality) // add type selector
    const community = useSelector((state: any) => state.community) // add type selector

    const [loading, setLoading] = useState<boolean>(true)
    const [tempReport, setTempReport] = useState<TReport>(constants.report)
    const [errors, setErrors] = useState<TReportErrors>({})

    const { id } = useParams()

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const action = id ? 'edit' : 'create'

    useEffect(() => {
        setLoading(false)

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (action === 'edit') {
            let filterReport = report.all.find((report: TReport) => report.id === id)

            if (filterReport) {
                setTempReport(prevState => ({
                    ...prevState,
                    ...filterReport
                }))
            }
        }

        // eslint-disable-next-line
    }, [action])

    const handleSubmit = (event: any) => {
        event.preventDefault()

        let newErrors = validateForm(tempReport)

        setErrors(newErrors)

        if (!Object.keys(newErrors).length) {
            submitForm(tempReport)
        } else {
            toast.error('Advertencia', {
                description: 'Verifique los datos requeridos para poder proseguir.'
            })
        }
    }

    const submitForm = (values: TReport) => {
        let newReport = Object.assign({}, values)

        if (action === "create") {
            newReport.id = generateId()
        }

        if (action === "create") {
            dispatch(setReport({
                newReport: newReport
            }))
        } else {
            dispatch(updateReport({
                updateReport: newReport
            }))
        }

        navigate(`/reports/${newReport.id}/edit`)

        let toastTitle = id ? 'Modificado exitosamente' : 'Añadido exitosamente'
        let toastDescription = id ? 'El reporte de actividad ha sido modificado de forma correcta.' : 'El reporte de actividad ha sido añadido de forma correcta.'

        toast.success(toastTitle, {
            description: toastDescription
        })
    }

    const components = tempReport.proyecto_id ? component.all.filter((component: TComponent) => component.proyectos.includes(tempReport.proyecto_id!)) : []
    const activities = tempReport.componente_id ? activity.all.filter((activity: TActivity) => activity.componente_id === tempReport.componente_id) : []
    const municipalities =  tempReport.estado_id ? municipality.all.filter((municipality: TMunicipality) => municipality.estado_id === tempReport.estado_id) : []
    const communities =  tempReport.municipio_id ? community.all.filter((community: TCommunity) => community.municipio_id === tempReport.municipio_id) : []

    return loading ? (
        <Spinner />
    ) : (
    	<div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: '/reports', name: 'Reportes de actividad' },
                    { path: null, name: `${action === 'create' ? 'Crear' : 'Editar'}` }
                ]}
            />

            <Form
                title="Reporte de actividad"
                buttonText={action === 'create' ? 'Crear' : 'Guardar'}
                buttons={null}
                onSubmit={handleSubmit}
                BodyForm={
                    <>
                        <FormSection
                            title="Información general"
                            buttons={null}
                            GroupForm={
                                <div className="px-2 sm:px-4 py-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">  
                                    <Text 
                                        name="nombre_actividad"
                                        label="Nombre de actividad"
                                        readonly={false}
                                        required={true}
                                        placeholder="Nombre de actividad"
                                        value={tempReport.nombre_actividad}
                                        setAction={setTempReport}
                                        error={errors["nombre_actividad"] ?? null}
                                    />

                                    <Date 
                                        name="fecha"
                                        label="Fecha de actividad"
                                        readonly={false}
                                        required={true}
                                        value={tempReport.fecha}
                                        setAction={setTempReport}
                                        error={errors["fecha"] ?? null}
                                    />

                                    <Select2
                                        name="proyecto_id"
                                        label="Proyecto"
                                        readonly={false}
                                        required={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={project.all}
                                        value={tempReport.proyecto_id ? transformCollection(project.all).find(project => project.value === tempReport.proyecto_id) : null}
                                        setAction={setTempReport}
                                        error={errors["proyecto_id"] ?? null}
                                    />

                                    <Select2
                                        name="componente_id"
                                        label="Componente"
                                        readonly={false}
                                        required={true}
                                        isDisabled={tempReport.proyecto_id ? false : true}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={components}
                                        value={tempReport.componente_id ? transformCollection(components).find(component => component.value === tempReport.componente_id) : null}
                                        setAction={setTempReport}
                                        error={errors["componente_id"] ?? null}
                                    />

                                    <Select2
                                        name="actividad_tipo_id"
                                        label="Tipo de actividad"
                                        readonly={false}
                                        required={true}
                                        isDisabled={tempReport.componente_id ? false : true}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={activities}
                                        value={tempReport.actividad_tipo_id ? transformCollection(activities).find(activity => activity.value === tempReport.actividad_tipo_id) : null}
                                        setAction={setTempReport}
                                        error={errors["actividad_tipo_id"] ?? null}
                                    />
                                </div>
                            }
                        />

                        <FormSection
                            title="Información geográfica"
                            buttons={null}
                            GroupForm={
                                <div className="px-2 sm:px-4 py-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">                                    
                                    <Select2
                                        name="estado_id"
                                        label="Estado"
                                        readonly={false}
                                        required={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={state.all}
                                        value={tempReport.estado_id ? transformCollection(state.all).find(state => state.value === tempReport.estado_id) : null}
                                        setAction={setTempReport}
                                        error={errors["estado_id"] ?? null}
                                    />

                                    <Select2
                                        name="municipio_id"
                                        label="Municipio"
                                        readonly={false}
                                        required={true}
                                        isDisabled={tempReport.estado_id ? false : true}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={municipalities}
                                        value={tempReport.municipio_id ? transformCollection(municipality.all).find(municipality => municipality.value === tempReport.municipio_id) : null}
                                        setAction={setTempReport}
                                        error={errors["municipio_id"] ?? null}
                                    />

                                    <Select2
                                        name="comunidad_id"
                                        label="Comunidad"
                                        readonly={false}
                                        required={true}
                                        isDisabled={tempReport.municipio_id ? false : true}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={communities}
                                        value={tempReport.comunidad_id ? transformCollection(community.all).find(community => community.value === tempReport.comunidad_id) : null}
                                        setAction={setTempReport}
                                        error={errors["comunidad_id"] ?? null}
                                    />
                                </div>
                            }
                        />

                        <FormSection
                            title="Asistencia"
                            buttons={null}
                            GroupForm={
                                <div className="px-2 sm:px-4 py-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                    <Number
                                        name="asistentes_hombres"
                                        label="Hombres"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.asistentes_hombres}
                                        setAction={setTempReport}
                                        error={null}
                                    />

                                    <Number
                                        name="asistentes_mujeres"
                                        label="Mujeres"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.asistentes_mujeres}
                                        setAction={setTempReport}
                                        error={null}
                                    />

                                    <Number
                                        name="asistentes_ninos"
                                        label="Niños"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.asistentes_ninos}
                                        setAction={setTempReport}
                                        error={null}
                                    />

                                    <Number
                                        name="asistentes_ninas"
                                        label="Niñas"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.asistentes_ninas}
                                        setAction={setTempReport}
                                        error={null}
                                    />

                                    <Number
                                        name="cde_ponentes_hombres"
                                        label="CDE Ponentes hombres"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.cde_ponentes_hombres}
                                        setAction={setTempReport}
                                        error={null}
                                    />

                                    <Number
                                        name="cde_ponentes_mujeres"
                                        label="CDE Ponentes mujeres"
                                        readonly={false}
                                        required={false}
                                        placeholder="0"
                                        value={tempReport.cde_ponentes_mujeres}
                                        setAction={setTempReport}
                                        error={null}
                                    />
                                </div>
                            }
                        />

                        <FormSection
                            title="Evidencias"
                            buttons={null}
                            GroupForm={
                                <div className="px-2 sm:px-4 py-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                    {/**
                                     * Agregar componente para subir un archivo PDF.
                                     */}
                                    <TextArea
                                        name="notas"
                                        label="Comentarios"
                                        readonly={false}
                                        required={false}
                                        rows={4}
                                        placeholder="Comentarios"
                                        value={tempReport.notas}
                                        setAction={setTempReport}
                                        styles={{ resize: 'none' }}
                                        error={null}
                                    />
                                </div>
                            }
                        />
                    </>
                }
            />
        </div>
    )
}

export default ReportCreate