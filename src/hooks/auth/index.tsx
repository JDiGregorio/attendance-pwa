import React, { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'

import { TCredentials } from '../../types'

import { persistUser } from '../../redux/reducers/userSlice'

interface IUserContext {
	login: ({ email, password }: TCredentials) => Promise<void>
	logout: () => void
}

const UserContext = createContext<IUserContext>({
	login: async ({ email, password }: TCredentials) => {},
	logout: () => {}
})

interface IUserProvider {
	children: ReactNode
}

export const UserProvider: React.FC<IUserProvider> = ({ children }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const login = async ({ email, password }: TCredentials) => {
		await axios.post('/api/pwa-login-app', {
			id: process.env.REACT_APP_CLIENT_ID,
        	secret: process.env.REACT_APP_CLIENT_SECRET,
       	 	email: email,
        	password: password
		}, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(response => {
			if (response.status === 200) {
				const data = response.data
				
				dispatch(persistUser({
					isAuthenticated: true,
					email: email,
					token: data.token.access_token,
					user: data.user,
					permissions: data.permissions,
					initialized: true
				}))

				navigate('/home')
			}
		})
		.catch(error => {
			if (error.response.status === 401) {
				toast.error(error.response.data.title, {
					description: error.response.data.message
				}) 
			} else {
				toast.error('Advertencia', {
					description: 'Error de autenticación desconocido, ponganse en contacto con el administrador del sistema.'
				}) 
			}
		})
	}

	const logout = () => {
		navigate('/')
	}

	const value = useMemo(() => ({
		login,
		logout

		// eslint-disable-next-line
	}), [])

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(UserContext)
}