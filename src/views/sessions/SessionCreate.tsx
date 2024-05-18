import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Spinner from '../../components/Navigation/Spinner'
import Form from '../../components/Forms/Form'
import FormSection from '../../components/Forms/FormSection'
import Select2 from '../../components/Fields/Select2'
import Divider from '../../components/Elements/Divider'
import Date from '../../components/Fields/Date'
import Time from '../../components/Fields/Time'

import { TActivity, TComponent, TEvent, TSession, TAttendance, TSessionErrors } from '../../types'
import * as constants from '../../constants'

import { transformCollection, generateId } from '../../utilities'

import { setNewSession, updateNewSession } from '../../redux/reducers/sessionSlice'

import validateForm from '../../validations/session.form.validations'

const SessionCreate = () => {
    const project = useSelector((state: any) => state.project) // add type selector
    const component = useSelector((state: any) => state.component) // add type selector
    const activity = useSelector((state: any) => state.activity) // add type selector
    const community = useSelector((state: any) => state.community) // add type selector
    const event = useSelector((state: any) => state.event) // add type selector
    const session = useSelector((state: any) => state.session) // add type selector

    const [loading, setLoading] = useState<boolean>(true)
    const [tempSession, setTempSession] = useState<TSession>(constants.session)
    const [errors, setErrors] = useState<TSessionErrors>({})

    const { id } = useParams()
    let { state } = useLocation()

    const navigate = useNavigate()
    const dispatch =  useDispatch()
    
    const action = id ? 'edit' : 'create'

    useEffect(() => {
        setLoading(false)

        if (action === 'create' && state.fecha) {
            setTempSession(prevState => ({
                ...prevState,
                fecha_sesion: state.fecha
            }))
        }

        if (action === 'edit') {
            // eslint-disable-next-line
            let filterSession = session.all.find((session: TSession) => session.id == id)

            if (filterSession) {
                const { evento, fecha_sesion, ...valuesSession } = filterSession

                setTempSession(prevState => ({
                    ...prevState,
                    ...valuesSession,
                    fecha_sesion: moment(fecha_sesion, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY"),
                    hora_sesion: moment(fecha_sesion, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
                }))
            }
        }

        // eslint-disable-next-line
    }, [])

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        let newErrors = validateForm(tempSession)

        setErrors(newErrors)

        if (!Object.keys(newErrors).length) {
            submitForm(tempSession)
        } else {
            toast.error('Advertencia', {
                description: 'Verifique los datos requeridos para poder proseguir.'
            })
        }
    }

    const submitForm = (values: TSession) => {
        let newSession = Object.assign({}, values)

        let filterSession = session.all.filter((session: TSession) => session.evento_id === newSession.evento_id)

        if (filterSession.length > 0) {
            let auxSession = filterSession[0]

            let proyecto = newSession.proyecto_id !== null ? newSession.proyecto_id : auxSession.proyecto_id
            let componente = newSession.componente_id !== null ? newSession.componente_id : auxSession.componente_id
            let actividad = newSession.actividad_tipo_id !== null ? newSession.actividad_tipo_id : auxSession.actividad_tipo_id
            let comunidad = newSession.comunidad_id !== null ? newSession.comunidad_id : auxSession.comunidad_id

            let fecha = `${newSession.fecha_sesion} ${newSession.hora_sesion}`

            if (action === "create") {
                newSession.id = generateId()

                newSession.attendances = auxSession.attendances.map((attendance: TAttendance) => {
                    return {
                        ...attendance,
                        evento_sesion_id: newSession.id,
                        estado_asistencia: false
                    }
                })
            }

            newSession.proyecto_id = proyecto
            newSession.componente_id = componente
            newSession.actividad_tipo_id = actividad
            newSession.nombre = auxSession.nombre
            newSession.fecha_sesion = moment(fecha, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
            newSession.responsable = auxSession.responsable
            newSession.estado_id = auxSession.estado_id
            newSession.estado = auxSession.estado
            newSession.municipio_id = auxSession.municipio_id
            newSession.municipio = auxSession.municipio
            newSession.comunidad_id = comunidad
            newSession.comunidad = auxSession.comunidad
            newSession.qty_preregistro = auxSession.qty_preregistro
            newSession.beneficiarios = auxSession.beneficiarios

            if (action === "create") {
                dispatch(setNewSession({
                    newSession: newSession
                }))
            } else {
                dispatch(updateNewSession({
                    sessionId: id,
                    updateSession: newSession
                }))
            }

            navigate("/sessions")

            let toastTitle = id ? 'Modificado exitosamente' : 'Añadido exitosamente'
            let toastDescription = id ? 'El elemento ha sido modificado de forma correcta.' : 'El elemento ha sido añadido de forma correcta.'

            toast.success(toastTitle, {
                description: toastDescription
            })
        } else {
            toast.error('Advertencia', {
                description: 'Ha ocurrido un error. No se pudo guardar el elemento.'
            })
        }
    }

    const components = tempSession.proyecto_id ? component.all.filter((component: TComponent) => component.proyectos.includes(tempSession.proyecto_id!)) : []
    const activities = tempSession.componente_id ? activity.all.filter((activity: TActivity) => activity.componente_id === tempSession.componente_id) : []

    const events = event.all.filter((event: TEvent) => {
        if ((tempSession.proyecto_id !== null && event.proyecto_id !== tempSession.proyecto_id) || (tempSession.componente_id !== null && event.componente_id !== tempSession.componente_id) || (tempSession.actividad_tipo_id !== null && event.actividad_tipo_id !== tempSession.actividad_tipo_id) || (tempSession.comunidad_id !== null && event.comunidad_id !== tempSession.comunidad_id)) {
            return false
        }

        return true
    })

    return loading ? (
        <Spinner />
    ) : (
    	<div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: '/sessions', icon: "ArrowUturnLeftIcon", name: "Regresar" },
                    { path: null, icon: null, name: `${action === 'create' ? "Crear" : "Editar"}` }
                ]}
            />

            <Form
                title="Sesión"
                buttonText={action === 'create' ? 'Crear' : 'Guardar'}
                buttons={null}
                onSubmit={handleSubmit}
                BodyForm={
                    <FormSection
                        title="Información general"
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
                                    value={tempSession.proyecto_id ? transformCollection(project.all, "nombre").find(project => project.value === tempSession.proyecto_id) : null}
                                    setAction={setTempSession}
                                    error={errors["proyecto_id"] ?? null}
                                />

                                <Select2
                                    name="componente_id"
                                    label="Componente"
                                    readonly={false}
                                    required={true}
                                    isDisabled={tempSession.proyecto_id ? false : true}
                                    isLoading={false}
                                    isClearable={false}
                                    isSearchable={true}
                                    placeholder="Seleccionar"
                                    emptyOptions="No se encuentran opciones"
                                    options={transformCollection(components, "nombre")}
                                    value={tempSession.componente_id ? transformCollection(components, "nombre").find(component => component.value === tempSession.componente_id) : null}
                                    setAction={setTempSession}
                                    error={errors["componente_id"] ?? null}
                                />

                                <Select2
                                    name="actividad_tipo_id"
                                    label="Actividad"
                                    readonly={false}
                                    required={true}
                                    isDisabled={tempSession.componente_id ? false : true}
                                    isLoading={false}
                                    isClearable={false}
                                    isSearchable={true}
                                    placeholder="Seleccionar"
                                    emptyOptions="No se encuentran opciones"
                                    options={transformCollection(activities, "nombre")}
                                    value={tempSession.actividad_tipo_id ? transformCollection(activities, "nombre").find(activity => activity.value === tempSession.actividad_tipo_id) : null}
                                    setAction={setTempSession}
                                    error={errors["actividad_tipo_id"] ?? null}
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
                                    options={transformCollection(community.all, "label")}
                                    value={tempSession.comunidad_id ? transformCollection(community.all, "label").find(community => community.value === tempSession.comunidad_id) : null}
                                    setAction={setTempSession}
                                    error={errors["comunidad_id"] ?? null}
                                />

                                <Divider classes="border-dashed border-gray-300 sm:col-span-6" />

                                <Select2
                                    name="evento_id"
                                    label="Evento"
                                    readonly={false}
                                    required={true}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isSearchable={true}
                                    placeholder="Seleccionar"
                                    emptyOptions="No se encuentran opciones"
                                    options={transformCollection(events, "nombre")}
                                    value={tempSession.evento_id ? transformCollection(events, "nombre").find(event => event.value === tempSession.evento_id) : null}
                                    setAction={setTempSession}
                                    error={errors["evento_id"] ?? null}
                                />

                                <Date 
                                    name="fecha_sesion"
                                    label="Fecha de sesión"
                                    readonly={false}
                                    required={true}
                                    value={tempSession.fecha_sesion}
                                    setAction={setTempSession}
                                    error={errors["fecha_sesion"] ?? null}
                                />

                                <Time 
                                    name="hora_sesion"
                                    label="Hora de sesión"
                                    readonly={false}
                                    required={true}
                                    value={tempSession.hora_sesion}
                                    setAction={setTempSession}
                                    error={errors["hora_sesion"] ?? null}
                                />
                            </div>
                        }
                    />
                }
            />
        </div>
    )
}

export default SessionCreate