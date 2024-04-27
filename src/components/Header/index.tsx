import React, { useContext, useState, useEffect } from 'react'
import { WindmillContext } from '@windmill/react-ui'
import { useSelector, useDispatch } from 'react-redux'

import { AlertModalConfirm } from '../Alerts'

import { SidebarContext } from '../../contexts/SidebarContext'
import { IconSolid, classNames } from '../../utilities'

import { useAuth } from '../../hooks/auth'

import { resetState } from '../../redux/reducers/userSlice'

const Header = () => {
    const { mode, toggleMode } = useContext(WindmillContext)
    const { toggleSidebar } = useContext(SidebarContext)

    const user = useSelector((state: any) => state.user) // add type selector

    const [dropdownUserShow, setDropdownUserShow] = useState<boolean>(false)

    const { logout } = useAuth()
    const dispatch = useDispatch()

    let dropdown = React.useRef<HTMLDivElement>(null)

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

    const handleLogout = () => {
        dispatch(resetState())
        logout()
    }

    const synchronize = () => {
        AlertModalConfirm({
            icon: 'ArrowPathIcon',
            iconClasses: 'h-20 w-20 text-green-500 dark:text-gray-400',
            title: '¿Estas seguro?',
            description: '¿Realmente desea sincronizar los datos de asistencia? Este proceso no se puede deshacer. ¿Desea continuar con la sincronización?',
            btnTextAccept: 'Continuar',
            btnTextCancel: 'Cancelar',
            onAccept: () => {
                console.log("sincronizando")
            }
        })
    }

    return (
        <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
            <div className="flex items-center justify-between lg:justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple" onClick={toggleSidebar} aria-label="Menu">
                    <IconSolid icon="Bars3Icon" className="w-6 h-6 text-gray-500" aria-hidden="true" />
                </button>

                {/*<div className="flex space-x-3">
                    <div className="group relative flex justify-center">
                        <button className="rounded-md focus:outline-none focus:shadow-outline-gray" aria-label="Internet mode">
                            {user.isOnline ? (
                                <IconSolid icon="SignalIcon" className="w-5 h-5 text-gray-500 dark:text-gray-100" aria-hidden="true" />
                            ) : (
                                <IconSolid icon="SignalSlashIcon" className="w-5 h-5 text-gray-500 dark:text-gray-100" aria-hidden="true" />
                            )}
                        </button>

                        <p className="absolute flex justify-center items-center space-x-3 w-72 top-14 left-1 p-2 scale-0 bg-white rounded-md shadow-md border border-gray-200  group-hover:scale-100 dark:bg-gray-700 dark:border-gray-500">
                            {user.isOnline ? (
                                <IconSolid icon="WifiIcon" className="w-6 h-6 text-gray-500 dark:text-gray-100" aria-hidden="true" />
                            ) : (
                                <IconSolid icon="NoSymbolIcon" className="w-6 h-6 text-gray-500 dark:text-gray-100" aria-hidden="true" />
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
                            <button onClick={synchronize} className="rounded-md focus:outline-none focus:shadow-outline-gray" aria-label="Toggle refresh data">
                                <IconSolid icon="ArrowPathIcon" className="w-6 h-6 text-gray-400 dark:text-yellow-600" aria-hidden="true" />
                            </button>
                        </li>
                    )}

                    <li className="flex">
                        <button onClick={toggleMode} className="rounded-md focus:outline-none focus:shadow-outline-gray" aria-label="Toggle color mode">
                            {mode === "dark" ? (
                                <IconSolid icon="SunIcon" className="w-5 h-5 text-gray-400 dark:text-yellow-600" aria-hidden="true" />
                            ) : (
                                <IconSolid icon="MoonIcon" className="w-5 h-5 text-gray-600" aria-hidden="true" />
                            )}
                        </button>
                    </li>

                    {user.isOnline && (
                        <li className="relative rounded-full">
                            <button onClick={() => visibleUserDropdown()} className={classNames(user.user.shortname.length === 1 ? "px-3" : "px-2", "flex py-1.5 max-w-xs items-center rounded-full shadow-2xl bg-orange-600 active:bg-orange-700 hover:bg-orange-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2")} aria-label="Account" aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>  
                                <h1 className="text-md text-white font-semibold">
                                    {user.user.shortname}
                                </h1>
                            </button>
                            
                            <div tabIndex={2} ref={dropdown} onBlur={handleUserBlur} className={`${dropdownUserShow ? 'block' : 'hidden'} origin-top-right absolute w-56 p-2 mt-5 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 right-0`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <ul className="divide-y divide-gray-200" role="menu">
                                    <li onClick={handleLogout} className="inline-flex items-center space-x-3 cursor-pointer w-full px-2 py-2 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" id="menu-item-2">
                                        <IconSolid icon="ArrowLeftOnRectangleIcon" className="w-5 h-5 text-gray-400 dark:text-gray-400" aria-hidden="true" />
                                        <span className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
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