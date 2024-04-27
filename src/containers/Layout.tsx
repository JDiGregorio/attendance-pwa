import React, { lazy, useContext, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { SidebarContext } from '../contexts/SidebarContext'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'

import ThemedSuspense from '../components/Navigation/AccessibleNavigationAnnouncer'

import routes from '../routes'

const Page404 = lazy(() => import('../pages/404'))

const Layout = () => {
	const { isSidebarOpen } = useContext(SidebarContext)

	return (
		<div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
			<Sidebar />

			<div className="flex flex-1 flex-col w-full">
				<Header />
				
				<Main>
					<Suspense fallback={<ThemedSuspense />}>
						<Routes>
							{routes.map((route, index) => (
								<Route key={index} path={route.path} element={<route.component />} />
							))}

							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</Main>
			</div>
		</div>
	)
}

export default Layout