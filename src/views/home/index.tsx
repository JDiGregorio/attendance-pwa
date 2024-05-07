import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import FilterModal from './components/FilterModal'
import Badge from '../../components/Elements/Badge'
import Divider from '../../components/Elements/Divider'

import { TFunction, TSession, TGroupSessionObject, TGroupSession, TProject, TComponent, TActivity, TCommunity } from '../../types'

import { IconSolid, IconOutline, classNames, someFilter, getMonthName, getDayName } from '../../utilities'
import { filtered } from '../../filters/session.state.filter'

import { setFilters } from '../../redux/reducers/sessionSlice'

const SessionList = () => {
    const user = useSelector((state: any) => state.user) // add type selector
    const session = useSelector((state: any) => state.session) // add type selector
    const project = useSelector((state: any) => state.project) // add type selector
    const component = useSelector((state: any) => state.component) // add type selector
    const activity = useSelector((state: any) => state.activity) // add type selector
    const community = useSelector((state: any) => state.community) // add type selector

    //const [sessions, setSessions] = useState<TGroupSession[]>([])
    const [activeIndexes, setActiveIndexes] = useState<string[]>([])

    const dispatch =  useDispatch()

    useEffect(() => {
        const reduceSessions = session.all.reduce((accum: Set<string>, session: TSession) => {
            const sessionDate = new Date(session.fecha_sesion!)
    
            const month = sessionDate.getMonth() + 1
            const year = sessionDate.getFullYear()
            
            const monthKey = `${year}-${month}`
          
            accum.add(monthKey)

            return accum
        }, new Set<string>())

        setActiveIndexes(Array.from(reduceSessions))
    }, [])

    const handleViewFilters = () => {
        FilterModal({
            title: 'Aplicar filtros',
            icon: 'FunnelIcon',
            instructions: 'Utilice los filtros para una búsqueda más precisa.',
            textButton: 'Filtrar',
            filters: session.filters,
            data: {
                projects: project.all,
                components: component.all,
                activities: activity.all,
                communities: community.all
            },
            onAccept: (props: TFunction) => {
                dispatch(setFilters({
                    filters: props.filters
                }))
            },
            onClear: (props: TFunction) => {
                dispatch(setFilters({
                    filters: props.filters
                }))
            }
        })
    }

    const handleResetFilter = (name: string) => {
        let newFilters =  {
            ...session.filters,
            [name]: null
        }

        dispatch(setFilters({
            filters: newFilters
        }))
    }

    const toggleAccordion = (index: string) => {
        if (activeIndexes.includes(index)) {
            setActiveIndexes(activeIndexes.filter((i) => i !== index))
        } else {
            setActiveIndexes([...activeIndexes, index])
        }
    }

    const filteredSessions = filtered(session.all, session.filters)

    const reduceSessions = filteredSessions.reduce((accum: TGroupSessionObject, session: TSession) => {
        const sessionDate = new Date(session.fecha_sesion!)

        const month = sessionDate.getMonth() + 1
        const year = sessionDate.getFullYear()
        
        const monthKey = `${year}-${month}`
      
        if (!accum[monthKey]) {
            accum[monthKey] = {
                monthKey: monthKey,
                month: getMonthName(month),
                monthN: month,
                year: year,
                quantity: 0,
                sessions: []
            }
        }
      
        accum[monthKey].quantity++
        accum[monthKey].sessions.push(session)

        accum[monthKey].sessions.sort((a: TSession, b: TSession) => {
            const dateA = new Date(a.fecha_sesion!.replace(' ', 'T'))
            const dateB = new Date(b.fecha_sesion!.replace(' ', 'T'))

            return dateA.getTime() - dateB.getTime();
        })
      
        return accum
    }, {})

    const newSessions = Object.values(reduceSessions).sort((groupA, groupB) => {
        const monthA = groupA.monthN
        const monthB = groupB.monthN
    
        return monthA - monthB
    })

    return (
        <div className="py-4 px-6 relative space-y-3">
            <div className="flex flex-row justify-between items-end">
                <h1 className="m-0 text-2xl font-bold text-gray-900">
                    Sesiones
                </h1>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-dashed border-gray-200" />
                </div>

                <div className={classNames(someFilter(session.filters) ? "justify-between" : "justify-end", "relative flex items-center")}>
                    {someFilter(session.filters) && (
                        <span className="pr-3 text-base font-medium leading-6 text-gray-400">
                            Filtros
                        </span>
                    )}

                    <button type="button" onClick={handleViewFilters} className="pl-3 inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <IconSolid icon="FunnelIcon" className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {someFilter(session.filters) && (
                <>
                    <div className="flex flex-wrap gap-3">
                        <Badge canSee={session.filters.proyecto_id ? true : false} label="Proyecto" value={session.filters.proyecto_id ? project.all.find((item: TProject) => item.id === session.filters.proyecto_id ).nombre : ""} canReset={true} onClick={() => handleResetFilter("proyecto_id")} />
                    
                        <Badge canSee={session.filters.componente_id ? true : false} label="Componente" value={session.filters.componente_id ? component.all.find((item: TComponent) => item.id === session.filters.componente_id ).nombre : ""} canReset={true} onClick={() => handleResetFilter("componente_id")} />
                        
                        <Badge canSee={session.filters.actividad_tipo_id ? true : false} label="Actividad" value={session.filters.actividad_tipo_id ? activity.all.find((item: TActivity) => item.id === session.filters.actividad_tipo_id ).nombre : ""} canReset={true} onClick={() => handleResetFilter("actividad_tipo_id")} />
                        
                        <Badge canSee={session.filters.comunidad_id ? true : false} label="Comunidad" value={session.filters.comunidad_id ? community.all.find((item: TCommunity) => item.id === session.filters.comunidad_id ).nombre : ""} canReset={true} onClick={() => handleResetFilter("comunidad_id")} />
                    
                        <Badge canSee={session.filters.fecha ? true : false} label="Fecha" value={moment(session.filters.fecha, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY")} canReset={true} onClick={() => handleResetFilter("fecha")} />
                    </div>

                    <Divider classes="border-dashed border-gray-200" />
                </>
            )}

            {filteredSessions.length === 0 && (
                <div className="pt-10 flex flex-col justify-center items-center">
                    <IconSolid icon="CalendarIcon" className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />

                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                        Fecha sin sesiones
                    </h3>

                    {user.permissions.createSession && (
                        <>
                            <p className="mt-1 text-sm text-gray-500">
                                Comience creando una nueva sesión.
                            </p>

                            <div className="mt-6">
                                <Link to="/sessions/create" state={{ fecha: session.filters.fecha }} className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                                    <IconSolid icon="PlusIcon" className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    Nueva sesión
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {newSessions.map((group: TGroupSession, index: number) => (
                    <div key={index} className="relative space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-full flex items-center space-x-4">
                                <div className="w-8 h-8 flex justify-center items-center bg-gray-50 rounded-full shadow">
                                    <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                        <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                                    </svg>
                                </div>

                                <div className="flex flex-col cursor-pointer" onClick={() => toggleAccordion(group.monthKey)}>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        {`${group.month} de ${group.year}`} 
                                    </p>

                                    <p className="text-xs text-gray-400 font-medium">
                                        &bull; {group.quantity} {group.quantity > 1 ? "Sesiones" : "Sesión"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {activeIndexes.includes(group.monthKey) ? (
                            <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.sessions.map((session: TSession) => {
                                    const sessionDate = new Date(session.fecha_sesion!)                               
                                    const day = sessionDate.getDay()
                                    const date = sessionDate.getDate()

                                    return (
                                        <Link key={`${session.id}-${session.fecha_sesion}`} to={`/sessions/${session.id}`} className="py-2 px-2 w-full group bg-white border border-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 hover:border-gray-100 focus:outline-none">
                                            <div className="relative flex space-x-2">
                                                <div className="py-1.5 px-4 flex flex-col items-center rounded-lg shadow-inner border border-gray-100">
                                                    <p className="text-sm font-semibold text-center tracking-tight text-gray-400">
                                                        {getDayName(day + 1)}
                                                    </p>
                                                    <p className="text-2xl font-bold text-center text-gray-400">
                                                        {String(date).padStart(2, '0')}
                                                    </p>
                                                </div>

                                                <div className="self-center">
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-sm font-bold text-gray-500 group-hover:text-gray-600">
                                                            {session.nombre}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-0.5">
                                                        <div className="flex space-x-1">
                                                            <p className="truncate text-sm font-normal text-gray-400 text-wrap">
                                                                {`${session.comunidad}, ${session.municipio}, ${session.estado}`}
                                                            </p>
                                                        </div>

                                                        <div className="flex space-x-1">
                                                            <IconOutline icon="ClockIcon" className="-ml-0.5 h-3.5 w-3.5 flex-shrink-0 self-center text-gray-400" aria-hidden="true" />
                                                            
                                                            <p className="truncate text-xs font-medium text-gray-400">
                                                                {moment(session.fecha_sesion, "YYYY-MM-DD HH:mm:ss").format('HH:mm A')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {session.upload && (
                                                    <IconSolid icon="CloudArrowUpIcon" className="h-4 w-4 absolute top-0 right-0 flex-shrink-0 self-center text-gray-400" aria-hidden="true" />   
                                                )}
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex w-full justify-center items-center space-x-2 cursor-pointer" onClick={() => toggleAccordion(group.monthKey)}>
                                <p className="text-xs font-medium text-gray-400">
                                    Expandir                
                                </p>

                                <IconSolid icon="PlusIcon" className="h-3 w-3 text-gray-400" aria-hidden="true" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SessionList