import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'

import ThemedSuspense from '../components/Navigation/AccessibleNavigationAnnouncer'

import routes from '../routes'

const Page404 = lazy(() => import('../pages/404'))

const Layout = () => {
	const user = useSelector((state: any) => state.user) // add type selector

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
			<Sidebar />

			<div className="flex flex-1 flex-col w-full">
				<Header />
				
				<Main>
					<Suspense fallback={<ThemedSuspense />}>
						<Routes>
							{routes(user.permissions).map((route, index) => (
								<Route key={index} path={route.path} element={route.canSee ? (<route.component />) : (<Navigate to="/home" />)} />
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