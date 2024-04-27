import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Spinner from '../../components/Navigation/Spinner'
import Divider from '../../components/Elements/Divider'
import AttachBeneficiariesModal from './components/AttachBeneficiariesModal'

import { TBeneficiary, TSession, TAttendance, TFunction } from '../../types'

import { IconSolid, IconOutline, classNames, pushName } from '../../utilities'

import { updateAttendance, updateComment, attachAttendance } from '../../redux/reducers/sessionSlice'

const AttendanceDetail = () => {
    const session = useSelector((state: any) => state.session) // add type selector
    const beneficiary = useSelector((state: any) => state.beneficiary) // add type selector
    
    const [loading, setLoading] = useState<boolean>(true)

    const { id } = useParams()

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    useEffect(() => {
        setLoading(false)

        // eslint-disable-next-line
    }, [])

    const handleViewAttach = (session: TSession) => {
        const related = session.beneficiarios.map(beneficiario => beneficiario.id)

        const beneficiaries = beneficiary.all.filter((beneficiary: TBeneficiary) => beneficiary.comunidad_id === session.comunidad_id && !related.includes(beneficiary.id))
    
        const newBeneficiaries = beneficiaries.map((beneficiary: TBeneficiary) => {
            let beneficiaryCopy = { ...beneficiary }

            let fullname: string[] = []
            
            pushName(beneficiary, 'primer_nombre', fullname)
            pushName(beneficiary, 'segundo_nombre', fullname)
            pushName(beneficiary, 'primer_apellido', fullname)
            pushName(beneficiary, 'segundo_apellido', fullname)

            beneficiaryCopy.fullname = fullname.join(" ")
            beneficiaryCopy.checked = false
            
            return beneficiaryCopy
        })

        AttachBeneficiariesModal({
            title: 'Adjuntar beneficiarios',
            icon: 'UserGroupIcon',
            instructions: 'Por favor seleccione los beneficiarios que desea agregar al pre-registro de este evento.',
            session: session,
            beneficiaries: newBeneficiaries,
            textAcceptButton: 'Adjuntar',
            textCancelButton: 'Cancelar',
            textCreateButton: 'Crear beneficiario',
            onAccept: (props: TFunction) => {
                dispatch(attachAttendance({
                    eventId: session.evento_id,
                    beneficiaries: props.beneficiaries,
                }))

                toast.success('Agregados exitosamente', {
                    description: 'Los beneficiarios seleccionados han sido agregados a las sesiones de forma correcta.'
                })
            },
            onRedirect: () => {
                navigate("/beneficiaries/create", {
                    state: {
                        redirect: true,
                        projectId: session.proyecto_id,
                        eventId: session.evento_id,
                        sessionId: session.id,
                        stateId: session.estado_id,
                        municipalityId: session.municipio_id,
                        communityId: session.comunidad_id
                    }
                })
            }
        })
    }

    const handleItemClick = (sessionId: number, beneficiaryId: number | string, attended: boolean) => {
        dispatch(updateAttendance({
            sessionId: sessionId,
            beneficiaryId: beneficiaryId,
            attended: !attended
        }))
    }

    const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target

        let sessionId = id

        dispatch(updateComment({
            sessionId: sessionId,
            comment: value !== "" ? value : null
        }))
    }

    // eslint-disable-next-line
    let findSession = session.all.find((session: TSession) => session.id && session.id == id!)
    let attendenceCounter = findSession.attendances.filter((attendance: TAttendance) => Boolean(attendance.asistio) === true).length

    return loading ? (
        <Spinner />
    ) : (
        <>
            <BreadCrumb
                links={[
                    { path: '/sessions', name: 'Sesiones' },
                    { path: null, name: 'Detalle de sesión' }
                ]}
            />

            <div className="flex justify-between mb-8">
                <h2 className="flex flex-col sm:flex-row sm:items-center text-2xl font-bold text-gray-900">
                    Detalle de sesión
                </h2>

                <div className="space-x-2">
                    <button type="button" onClick={() => handleViewAttach(findSession)} className="inline-flex py-1 px-2 space-x-2 bg-white shadow rounded-md border border-gray-200">
                        <IconSolid icon="UserPlusIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-500" aria-hidden="true" />
                        <span className="hidden lg:block text-sm font-medium text-gray-400">
                            Adjuntar beneficiarios
                        </span>
                    </button>

                    {findSession.created && (
                        <Link to={`/sessions/${findSession.id}/edit`} className="inline-flex py-1 px-2 space-x-2 bg-white shadow rounded-md border border-gray-200">
                            <IconSolid icon="PencilSquareIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-500" aria-hidden="true" />
                            <span className="hidden lg:block text-sm font-medium text-gray-400">
                                Editar
                            </span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative px-4 py-3 sm:px-6 bg-white rounded-md shadow-md border border-gray-200">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-semibold text-gray-900">
                                {findSession.nombre}
                            </h3>

                            {findSession.upload && (
                                <IconSolid icon="CloudArrowUpIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-500" aria-hidden="true" />
                            )}
                        </div>

                        <Divider classes="border-dashed border-gray-200" />

                        <div className="space-y-2">
                            <div className="flex space-x-1">
                                <IconSolid icon="MapPinIcon" className="-ml-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-500" aria-hidden="true" />
                                <p className="truncate text-sm sm:text-md text-gray-500">
                                    {`${findSession.estado}, ${findSession.municipio}, ${findSession.comunidad}`}
                                </p>
                            </div>

                            <div className="flex space-x-1">
                                <IconSolid icon="UserIcon" className="-ml-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-400" aria-hidden="true" />
                                <p className="truncate text-sm sm:text-md text-gray-500">
                                    {findSession.responsable}
                                </p>
                            </div>

                            <Divider classes="border-dashed border-gray-200" />

                            <div className="flex items-center justify-between space-x-2">
                                <div className="flex flex-row justify-stretch space-x-4">
                                    <div className="flex space-x-1">
                                        <IconSolid icon="CalendarDaysIcon" className="-ml-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-400" aria-hidden="true" />
                                        
                                        <p className="truncate text-sm sm:text-md text-gray-500">
                                            {moment(findSession.fecha_sesion, "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY')}
                                        </p>
                                    </div>
                                
                                    <div className="flex items-center space-x-1">
                                        <IconOutline icon="ClockIcon" className="-ml-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-400" aria-hidden="true" />
                                        
                                        <p className="truncate text-sm sm:text-md text-gray-500">
                                            {moment(findSession.fecha_sesion, "YYYY-MM-DD HH:mm:ss").format('HH:mm A')}
                                        </p>
                                    </div>
                                </div>                             
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-5 sm:px-6 bg-white rounded-md shadow-md border border-gray-200">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Listado de beneficiarios
                            </h3>

                            <div className={classNames('bg-gray-50 inline-flex items-baseline rounded-lg border px-3 py-1 md:mt-2 lg:mt-0 space-x-1')}>
                                <IconSolid icon="UsersIcon" className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-500" aria-hidden="true" />
                                <p className="text-sm font-semibold text-green-800">
                                    {attendenceCounter} / {findSession.qty_preregistro}
                                </p>
                            </div>
                        </div>

                        <Divider classes="border-dashed border-gray-200" />

                        <div className="my-5 divide-y divide-gray-200" role="listitem">
                            {findSession.beneficiarios.length > 0 ? (

                                findSession.beneficiarios.map((beneficiary: TBeneficiary) => {
                                    let fullname: string[] = []
                                    let attendance = findSession.attendances.find((attendance: TAttendance) => attendance.beneficiario_id === beneficiary.id)

                                    pushName(beneficiary, 'primer_nombre', fullname)
                                    pushName(beneficiary, 'segundo_nombre', fullname)
                                    pushName(beneficiary, 'primer_apellido', fullname)
                                    pushName(beneficiary, 'segundo_apellido', fullname)

                                    let attended = Boolean(attendance.asistio)

                                    return (
                                        <div key={beneficiary.id} onClick={() => handleItemClick(attendance.sesion_id, beneficiary.id!, attended)} className="flex justify-between items-center py-2 px-2 cursor-pointer">
                                            <div className="inline-flex items-center space-x-2">
                                                <p className="text-sm font-medium text-gray-500">
                                                    {fullname.join(" ")}
                                                </p>
                                            </div>

                                            <div className="ml-3 flex h-6 items-center">
                                                {attended ? (
                                                    <IconSolid icon="CheckCircleIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-300" aria-hidden="true" />
                                                ) : (
                                                    <IconOutline icon="XCircleIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-300" aria-hidden="true" />
                                                )}              
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="relative card bg-white">
                                    <div className={classNames("px-6 py-8 flex flex-col justify-center items-center")}>
                                        <div className="text-center">
                                            <p className={classNames("uppercase text-80 text-xs font-semibold text-gray-400")}>
                                                No hay pre-registro de asistencia para mostrar
                                            </p>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden overflow-x-auto relative"></div>
                                </div>
                            )}                          
                        </div>
                    </div>
                </div>

                <div className="px-4 py-5 sm:px-6 bg-white rounded-md shadow-md border border-gray-200">
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            Comentario
                        </h3>

                        <Divider classes="border-dashed border-gray-200" />

                        <div className="pt-2 space-y-3">
                            <p className="text-sm text-gray-400">
                                Puede agregar comentarios correspondientes a esta sesión.
                            </p>

                            <textarea id="comentario" name="comentario" rows={5} placeholder="Comentario" value={findSession.comentario || ""} onChange={handleComment} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[13px] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" style={{ resize: 'none' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendanceDetail