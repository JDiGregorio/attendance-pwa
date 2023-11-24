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
	children: React.ReactNode
}

export const UserProvider = ({ children }: IUserProvider) => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const login = async ({ email, password }: TCredentials) => {
		await axios.post('/api/login-app', {
			id: process.env.REACT_APP_CLIENT_ID,
        	secret: process.env.REACT_APP_CLIENT_SECRET,
       	 	email: email,
        	password: password
		})
		.then(response => {
			if (response.status === 200) {
				const data = response.data
				
				dispatch(persistUser({
					isAuthenticated: true,
					email: email,
					token: data.token.access_token
				}))
				
				navigate('/home')
			}
		})
		.catch(error => {
			toast.error('Advertencia', {
                description: 'Error de autenticación.'
            }) 
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