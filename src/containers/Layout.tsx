import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../components/Header'
import Main from './Main'

import ThemedSuspense from '../components/Navigation/AccessibleNavigationAnnouncer'

import routes from '../routes'

const Page404 = lazy(() => import('../pages/404'))

const Layout = () => {
	return (
		<div className="mx-0 my-0 flex min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
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