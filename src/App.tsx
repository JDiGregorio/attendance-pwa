import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import setupAxios from './setupAxios'

import { ProtectRoutes } from './hooks/protectRoutes'
import { store } from './redux/store'

const Login = lazy(() => import('./views/auth'))
const Layout = lazy(() => import('./containers/Layout'))

setupAxios(store)

const App = () => {
	const user = useSelector((state: any) => state.user) // add type selector

	return (
		<Routes>
			<Route path='/' element={user.isAuthenticated ? <Navigate to="/home" replace={true} /> : <Login />} />

			<Route element={<ProtectRoutes store={store} />}>
				<Route path='/*' element={<Layout />} />
			</Route>
		</Routes>
	)
}

export default App