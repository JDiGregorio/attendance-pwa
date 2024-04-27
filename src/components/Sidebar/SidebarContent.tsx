import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { SidebarContext } from '../../contexts/SidebarContext'

import logoDark from '../../assets/img/logo-dark.png'

import routes from '../../routes/sidebar'
import { IconSolid, classNames } from '../../utilities'

const SidebarContent = () => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)

    return (
        <>
            <div className="flex flex-shrink-0 justify-center items-center bg-orange-600">
                <img className="h-16" src={logoDark}  alt="LOGO ATTENDANCE" />
            </div>

            <div className={classNames(isSidebarOpen ? 'h-0 flex-1 overflow-y-auto' : 'flex flex-grow flex-col', 'mt-5')}>
                <nav className={classNames(isSidebarOpen ? 'px-2' : 'flex-1 px-2 pb-4', 'space-y-4')}>
                    {routes().map((route, index) => route.canSee ? (
                        <NavLink key={index} to={route.path} onClick={closeSidebar} className="space-y-3">
                            {({ isActive }) => (
                                <span className={classNames(isActive ? 'bg-gray-900 text-gray-400 ' : 'text-white hover:bg-gray-900 hover:text-gray-400', `group flex items-center px-2 py-2 ${isSidebarOpen ? 'text-base' : 'text-sm'} font-medium rounded-md`)}>
                                    <IconSolid icon={route.icon} className={classNames(isActive ? 'text-gray-400' : 'text-white group-hover:text-gray-400', `${isSidebarOpen ? 'mr-4' : 'mr-3'} flex-shrink-0 h-6 w-6`)} aria-hidden="true" />
                                    {route.name}
                                </span>
                            )}
                        </NavLink>
                    ) : (null))}
                </nav>
            </div>
        </>
    )
}

export default SidebarContent