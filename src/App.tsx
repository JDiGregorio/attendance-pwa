import React, { lazy, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import setupAxios from './setupAxios'

import { ProtectRoutes } from './hooks/protectRoutes'
import { setIsOnline } from './redux/reducers/userSlice'
import { store } from './redux/store'

const Login = lazy(() => import('./views/auth'))
const Layout = lazy(() => import('./containers/Layout'))

setupAxios(store)

const App = () => {
	const user = useSelector((state: any) => state.user) // add type selector

	const dispatch =  useDispatch()

	useEffect(() => {
        const handleNetworkChange = (): void => {
            if (navigator.onLine) {
                dispatch(setIsOnline({ isOnline: true }))
            } else {
                dispatch(setIsOnline({ isOnline: false }))
            }
        }
    
        window.addEventListener("online", handleNetworkChange)
        window.addEventListener("offline", handleNetworkChange)
    
        return () => {
            window.removeEventListener("online", handleNetworkChange)
            window.removeEventListener("offline", handleNetworkChange)
        }

        // eslint-disable-next-line
    }, [])
	
	return (
		<Routes>
			<Route path='/' element={user.isAuthenticated ? <Navigate to="/sessions" replace={true} /> : <Login />} />

			<Route element={<ProtectRoutes store={store} />}>
				<Route path='/*' element={<Layout />} />
			</Route>
		</Routes>
	)
}

export default App