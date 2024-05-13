import React, { useContext, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

import { AlertModalConfirm } from '../Alerts'

import { TBeneficiary, TReport, TSession } from '../../types'

import { SidebarContext } from '../../contexts/SidebarContext'
import { IconSolid, classNames, getMonthName } from '../../utilities'

import { useAuth } from '../../hooks/auth'

import { setLastUpdateDate, logoutUser } from '../../redux/reducers/userSlice'
import { setProjects } from '../../redux/reducers/projectSlice'
import { setComponents } from '../../redux/reducers/componentSlice'
import { setActivities } from '../../redux/reducers/activitySlice'
import { setStates } from '../../redux/reducers/stateSlice'
import { setMunicipalities } from '../../redux/reducers/municipalitySlice'
import { setCommunities } from '../../redux/reducers/communitySlice'
import { setEvents } from '../../redux/reducers/eventSlice'
import { setSessions } from '../../redux/reducers/sessionSlice'
import { setBeneficiaryTypes } from '../../redux/reducers/beneficiaryTypeSlice'
import { setBeneficiaries } from '../../redux/reducers/beneficiarySlice'
import { setReports } from '../../redux/reducers/reportSlice'

const Header = () => {
    const { toggleSidebar } = useContext(SidebarContext)

    const user = useSelector((state: any) => state.user) // add type selector
    const session = useSelector((state: any) => state.session) // add type selector
    const beneficiary = useSelector((state: any) => state.beneficiary) // add type selector
    const report = useSelector((state: any) => state.report) // add type selector

    const [dropdownUserShow, setDropdownUserShow] = useState<boolean>(false)

    const { logout } = useAuth()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let dropdown = React.useRef<HTMLDivElement>(null)

    const currentDate: Date = new Date()
    const lastDate: Date = new Date(user.lastUpdateDate)

    const differenceInMilliseconds: number = currentDate.getTime() - lastDate.getTime()

    const differenceInDays: number = differenceInMilliseconds / (1000 * 60 * 60 * 24)

    useEffect(() => {
        if (dropdownUserShow) {
            dropdown.current?.focus()
        } else {
            dropdown.current?.blur()
        }
    }, [dropdownUserShow])

    const visibleUserDropdown = () => {
        setDropdownUserShow(value => !value)
    }

    const handleUserBlur = () => {
        setDropdownUserShow(false)
    }

    const synchronize = () => {
        AlertModalConfirm({
            icon: 'ExclamationTriangleIcon',
            iconClasses: 'h-16 w-16 text-yellow-500',
            body: (
                <div className="space-y-4">
                    {lastDate > currentDate && differenceInDays > 7 ? (
                        <p className="text-xs text-gray-400 text-center">
                            Última sincronización: {`${lastDate.getDate()} de ${getMonthName(lastDate.getMonth() + 1)} de ${lastDate.getFullYear()}`}
                        </p>
                    ) : (null)}

                    <div className="space-y-1">
                        <h1 className="text-sm font-medium text-gray-500 text-center">
                            Este proceso no se puede deshacer.
                        </h1>

                        <p className="text-sm font-normal text-gray-500 text-center">
                            Al sincronizar los datos de asistencia, estos serán enviados al servidor y eliminados de esta aplicación.
                        </p>
                    </div>
                </div>
            ),
            btnTextAccept: 'Continuar',
            btnTextCancel: 'Cancelar',
            onAccept: () => {
                let beneficiaries = beneficiary.all.filter((beneficiary: TBeneficiary) => beneficiary.created === true)
                let newSessions = session.all.filter((session: TSession) => session.created === true || session.attached === true)
                let sessions = session.all.filter((session: TSession) => session.upload === true)

                axios.post('/api/pwa-process-data', {
                    beneficiaries: beneficiaries,
                    newSessions: newSessions,
                    sessions: sessions,
                    reports: report.all
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(response => {
                    if (response.status === 200) {
                        const data = response.data

                        dispatch(setProjects({ projects: data.proyectos }))
                        dispatch(setComponents({ components: data.componentes }))
                        dispatch(setActivities({ activities: data.actividades }))
                        dispatch(setStates({ states: data.estados }))
                        dispatch(setMunicipalities({ municipalities: data.municipios }))
                        dispatch(setCommunities({ communities: data.comunidades }))
                        dispatch(setEvents({ events: data.eventos }))
                        dispatch(setSessions({ sessions: data.sesiones }))
                        dispatch(setBeneficiaryTypes({ beneficiaryTypes: data.beneficiarioTipos }))
                        dispatch(setBeneficiaries({ beneficiaries: data.beneficiarios }))
                        dispatch(setReports({ reports: data.reportes }))

                        dispatch(setLastUpdateDate({ date: new Date() }))

                        toast.success('Sincronización exitosa', {
                            description: 'La sincronización se ha realizado de forma correcta, se han publicado y descargado los datos correspondientes.'
                        })
                    }
                }).catch((error) => {
                    console.error(error)
                })

                navigate("/home")
            }
        })
    }

    const hasUpdates = (sessions: TSession[], beneficiaries: TBeneficiary[], reports: TReport[]): boolean => {
        if (sessions.length > 0 || beneficiaries.length > 0 || reports.length > 0) {
            return true
        }

        return false
    }

    const handleLogout = () => {
        let sessions = session.all.filter((session: TSession) => session.created === true || session.attached === true || session.upload === true)
        let beneficiaries = beneficiary.all.filter((beneficiary: TBeneficiary) => beneficiary.created === true)
        let reports = report.all

        dispatch(logoutUser({
            hasUpdates: hasUpdates(sessions, beneficiaries, reports)
        }))

        logout()
    }

    

    return (
        <header className="z-40 py-4 bg-white shadow-bottom">
            <div className="flex items-center justify-between lg:justify-end h-full px-6 mx-auto text-purple-600">
                <button className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple" onClick={toggleSidebar} aria-label="Menu">
                    <IconSolid icon="Bars3Icon" className="w-6 h-6 text-gray-500" aria-hidden="true" />
                </button>

                {/*<div className="flex space-x-3">
                    <div className="group relative flex justify-center">
                        <button className="rounded-md focus:outline-none focus:shadow-outline-gray" aria-label="Internet mode">
                            {user.isOnline ? (
                                <IconSolid icon="SignalIcon" className="w-5 h-5 text-gray-500" aria-hidden="true" />
                            ) : (
                                <IconSolid icon="SignalSlashIcon" className="w-5 h-5 text-gray-500" aria-hidden="true" />
                            )}
                        </button>

                        <p className="absolute flex justify-center items-center space-x-3 w-72 top-14 left-1 p-2 scale-0 bg-white rounded-md shadow-md border border-gray-200  group-hover:scale-100">
                            {user.isOnline ? (
                                <IconSolid icon="WifiIcon" className="w-6 h-6 text-gray-500" aria-hidden="true" />
                            ) : (
                                <IconSolid icon="NoSymbolIcon" className="w-6 h-6 text-gray-500" aria-hidden="true" />
                            )}
                            
                            <span className="text-sm font-semibold text-gray-400 uppercase">
                                {user.isOnline ? "Hay conexión a internet." : "No hay conexión a internet."}
                            </span>
                        </p>
                    </div>
                </div>*/}
                
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {user.isOnline && (
                        <li className="flex">
                            <button onClick={synchronize} className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-gray" aria-label="Toggle refresh data">
                                <IconSolid icon="ArrowPathIcon" className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                {lastDate > currentDate && differenceInDays > 7 ? (
                                    <span className="absolute top-0 left-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-yellow-600 border-2 border-white rounded-full" aria-hidden="true"></span>
                                ) : (null)}
                            </button>
                        </li>
                    )}

                    {user.isOnline && (
                        <li className="relative rounded-full">
                            <button onClick={() => visibleUserDropdown()} className={classNames(user.user.shortname.length === 1 ? "px-3" : "px-2", "flex py-1.5 max-w-xs items-center rounded-full shadow-2xl bg-orange-600 active:bg-orange-700 hover:bg-orange-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2")} aria-label="Account" aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>  
                                <h1 className="text-md text-white font-semibold">
                                    {user.user.shortname}
                                </h1>
                            </button>
                            
                            <div tabIndex={2} ref={dropdown} onBlur={handleUserBlur} className={`${dropdownUserShow ? 'block' : 'hidden'} origin-top-right absolute w-56 p-2 mt-5 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content right-0`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <ul className="divide-y divide-gray-200" role="menu">
                                    <li onClick={handleLogout} className="inline-flex items-center space-x-3 cursor-pointer w-full px-2 py-2 transition-colors duration-150 hover:bg-gray-100" role="menuitem" id="menu-item-2">
                                        <IconSolid icon="ArrowLeftOnRectangleIcon" className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="text-sm font-medium text-gray-500 hover:text-gray-800">
                                            Cerrar sesión
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Header