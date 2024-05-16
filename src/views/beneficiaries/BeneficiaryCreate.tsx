import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Spinner from '../../components/Navigation/Spinner'
import Form from '../../components/Forms/Form'
import FormSection from '../../components/Forms/FormSection'
import Date from '../../components/Fields/Date'
import Text from '../../components/Fields/Text'
import Select from '../../components/Fields/Select'
import Select2 from '../../components/Fields/Select2'

import { TBeneficiary, TMunicipality, TCommunity } from '../../types'

import * as constants from '../../constants'
import { transformCollection, generateId, pushName } from '../../utilities'

import { setNewBeneficiary, updateNewBeneficiary } from '../../redux/reducers/beneficiarySlice'
import { attachNewBeneficiary, updateAttachedBeneficiary } from '../../redux/reducers/sessionSlice'

import validateForm from '../../validations/beneficiary.form.validations'

const BeneficiaryCreate = () => {
    const project = useSelector((state: any) => state.project) // add type selector
    const beneficiary = useSelector((state: any) => state.beneficiary) // add type selector
    const beneficiaryType = useSelector((state: any) => state.beneficiaryType) // add type selector
    const departments = useSelector((state: any) => state.state) // add type selector
    const municipality = useSelector((state: any) => state.municipality) // add type selector
    const community = useSelector((state: any) => state.community) // add type selector

    const [loading, setLoading] = useState<boolean>(true)
    const [tempBeneficiary, setTempBeneficiary] = useState<TBeneficiary>(constants.beneficiary)
    const [errors, setErrors] = useState<any>({})

    const { id } = useParams()
    let { state } = useLocation()

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const action = id ? 'edit' : 'create'

    useEffect(() => {
        setLoading(false)

        
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (action === "create" && state.redirect) {
            setTempBeneficiary(prevState => ({
                ...prevState,
                proyecto_id: state.projectId,
                estado_id: state.stateId,
                municipio_id: state.municipalityId,
                comunidad_id: state.communityId
            }))
        }

        if (action === 'edit') {
            // eslint-disable-next-line
            let filterBeneficiary = beneficiary.all.find((beneficiary: TBeneficiary) => beneficiary.id == id)

            if (filterBeneficiary) {
                setTempBeneficiary(prevState => ({
                   ...prevState,
                   ...filterBeneficiary
                }))
            }
        }

        // eslint-disable-next-line
    }, [action])

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        let newErrors = validateForm(tempBeneficiary)

        setErrors(newErrors)

        if (!Object.keys(newErrors).length) {
            submitForm(tempBeneficiary)
        } else {
            toast.error('Advertencia', {
                description: 'Verifique los datos requeridos para poder proseguir.'
            })
        }
    }

    const submitForm = (values: TBeneficiary) => {
        let newBeneficiary = Object.assign({}, values)

        let fullname: string[] = []
                
        pushName(values, 'primer_nombre', fullname)
        pushName(values, 'segundo_nombre', fullname)
        pushName(values, 'primer_apellido', fullname)
        pushName(values, 'segundo_apellido', fullname)

        newBeneficiary.fullname = fullname.join(" ")

        if (action === "create") {
            let beneficiaryExists = beneficiary.all.some((beneficiary: TBeneficiary) => beneficiary.codigo_de_beneficiario === newBeneficiary.codigo_de_beneficiario)

            if (beneficiaryExists === false) {
                newBeneficiary.id = generateId()

                dispatch(setNewBeneficiary({
                    newBeneficiary: newBeneficiary
                }))

                dispatch(attachNewBeneficiary({
                    eventId: state.eventId,
                    newBeneficiary: newBeneficiary
                }))

                toast.success('Añadido exitosamente', {
                    description: 'El beneficiario ha sido añadido de forma correcta.'
                })
            } else {
                toast.error('Advertencia', {
                    description: 'El beneficiario que intenta añadir ya existe, revise el listado de beneficiarios para que lo pueda adjuntar.'
                })
            }

            navigate(`/sessions/${state.sessionId}`)
        }

        if (action === "edit") {
            dispatch(updateNewBeneficiary({
                updateBeneficiary: newBeneficiary
            }))

            dispatch(updateAttachedBeneficiary({
                updateBeneficiary: newBeneficiary
            }))

            toast.success('Modificado exitosamente', {
                description: 'El beneficiario ha sido modificado de forma correcta.'
            })

            navigate('/beneficiaries')
        }
    }

    const municipalities =  tempBeneficiary.estado_id ? municipality.all.filter((municipality: TMunicipality) => municipality.estado_id === tempBeneficiary.estado_id) : []
    const communities =  tempBeneficiary.municipio_id ? community.all.filter((community: TCommunity) => community.municipio_id === tempBeneficiary.municipio_id) : []

    console.log(state)

    return loading ? (
        <Spinner />
    ) : (
    	<div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: state && state.redirect ? `/sessions/${state.sessionId}` : '/beneficiaries', name: state && state.redirect ? 'Detalle de sesión' : 'Beneficiarios' },
                    { path: null, name: `${action === 'create' ? 'Crear beneficiario' : 'Editar'}` }
                ]}
            />

            <Form
                title="Beneficiario"
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
                                        name="primer_nombre"
                                        label="Primer nombre"
                                        readonly={false}
                                        required={true}
                                        placeholder="Primer nombre"
                                        value={tempBeneficiary.primer_nombre}
                                        setAction={setTempBeneficiary}
                                        error={errors["primer_nombre"] ?? null}
                                    />

                                    <Text 
                                        name="segundo_nombre"
                                        label="Segundo nombre"
                                        readonly={false}
                                        required={false}
                                        placeholder="Segundo nombre"
                                        value={tempBeneficiary.segundo_nombre}
                                        setAction={setTempBeneficiary}
                                        error={errors["segundo_nombre"] ?? null}
                                    />

                                    <Text 
                                        name="primer_apellido"
                                        label="Primer apellido"
                                        readonly={false}
                                        required={true}
                                        placeholder="Primer apellido"
                                        value={tempBeneficiary.primer_apellido}
                                        setAction={setTempBeneficiary}
                                        error={errors["primer_apellido"] ?? null}
                                    />

                                    <Text 
                                        name="segundo_apellido"
                                        label="Segundo apellido"
                                        readonly={false}
                                        required={false}
                                        placeholder="Segundo apellido"
                                        value={tempBeneficiary.segundo_apellido}
                                        setAction={setTempBeneficiary}
                                        error={errors["segundo_apellido"] ?? null}
                                    />

                                    <Date 
                                        name="fecha_de_nacimiento"
                                        label="Fecha de nacimiento"
                                        readonly={false}
                                        required={true}
                                        value={tempBeneficiary.fecha_de_nacimiento}
                                        setAction={setTempBeneficiary}
                                        error={errors["fecha_de_nacimiento"] ?? null}
                                    />

                                    <Select 
                                        name="sexo"
                                        label="Sexo"
                                        readonly={false}
                                        required={true}
                                        value={tempBeneficiary.sexo}
                                        options={constants.sexo}
                                        setAction={setTempBeneficiary}
                                        error={errors["sexo"] ?? null}
                                    />
                                </div>
                            }
                        />

                        <FormSection
                            title="Información de beneficiario"
                            buttons={null}
                            GroupForm={
                                <div className="px-2 sm:px-4 py-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
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
                                        options={transformCollection(project.all, "nombre")}
                                        value={tempBeneficiary.proyecto_id ? transformCollection(project.all, "nombre").find(project => project.value === tempBeneficiary.proyecto_id) : null}
                                        setAction={setTempBeneficiary}
                                        error={errors["proyecto_id"] ?? null}
                                    />
                                    
                                    <Text 
                                        name="codigo_de_beneficiario"
                                        label="Código de beneficiario"
                                        readonly={false}
                                        required={true}
                                        placeholder="Código de beneficiario"
                                        value={tempBeneficiary.codigo_de_beneficiario}
                                        setAction={setTempBeneficiary}
                                        error={errors["codigo_de_beneficiario"] ?? null}
                                    />

                                    <Text 
                                        name="codigo_beneficiario_hogar"
                                        label="Código de hogar"
                                        readonly={false}
                                        required={true}
                                        placeholder="Código de hogar"
                                        value={tempBeneficiary.codigo_beneficiario_hogar}
                                        setAction={setTempBeneficiary}
                                        error={errors["codigo_beneficiario_hogar"] ?? null}
                                    />

                                    <Select2
                                        name="beneficiario_tipo_id"
                                        label="Tipo de beneficiario"
                                        readonly={false}
                                        required={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={transformCollection(beneficiaryType.all, "nombre")}
                                        value={tempBeneficiary.beneficiario_tipo_id ? transformCollection(beneficiaryType.all, "nombre").find(beneficiaryType => beneficiaryType.value === tempBeneficiary.beneficiario_tipo_id) : null}
                                        setAction={setTempBeneficiary}
                                        error={errors["beneficiario_tipo_id"] ?? null}
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
                                        options={transformCollection(departments.all, "nombre")}
                                        value={tempBeneficiary.estado_id ? transformCollection(departments.all, "nombre").find(state => state.value === tempBeneficiary.estado_id) : null}
                                        setAction={setTempBeneficiary}
                                        error={errors["estado_id"] ?? null}
                                    />

                                    <Select2
                                        name="municipio_id"
                                        label="Municipio"
                                        readonly={false}
                                        required={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={transformCollection(municipalities, "nombre")}
                                        value={tempBeneficiary.municipio_id ? transformCollection(municipality.all, "nombre").find(municipality => municipality.value === tempBeneficiary.municipio_id) : null}
                                        setAction={setTempBeneficiary}
                                        error={errors["municipio_id"] ?? null}
                                    />

                                    <Select2
                                        name="comunidad_id"
                                        label="Comunidad"
                                        readonly={false}
                                        required={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={transformCollection(communities, "nombre")}
                                        value={tempBeneficiary.comunidad_id ? transformCollection(community.all, "nombre").find(community => community.value === tempBeneficiary.comunidad_id) : null}
                                        setAction={setTempBeneficiary}
                                        error={errors["comunidad_id"] ?? null}
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

export default BeneficiaryCreate