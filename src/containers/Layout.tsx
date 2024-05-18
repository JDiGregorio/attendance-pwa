import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AlertModalSynchronizing from '../components/Alerts/AlertModalSynchronizing'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'

import Spinner from '../components/Navigation/Spinner'

import routes from '../routes'

const Page404 = lazy(() => import('../pages/404'))

const Layout = () => {
	const user = useSelector((state: any) => state.user) // add type selector
	const api = useSelector((state: any) => state.api) // add type selector

	return (
		<div className="flex h-screen bg-gray-50 overflow-hidden">
			<Sidebar />

			<div className="flex flex-col flex-1 w-full">
				<Header />
				
				<Main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							{routes(user.permissions).map((route, index) => (
								<Route key={index} path={route.path} element={route.canSee ? (<route.component />) : (<Navigate to="/home" />)} />
							))}

							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</Main>
			</div>
			
			<AlertModalSynchronizing
				loading={api.loading}
				title="Sincronizando..."
				description="Estamos sincronizando los datos necesarios con el servidor. Este proceso tomará unos segundos."
			/>
		</div>
	)
}

export default Layout