import React, { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'

import { TCredentials } from '../../types'

import { persistUser, resetUserState } from '../../redux/reducers/userSlice'
import { resetApiState } from '../../redux/reducers/apiSlice'
import { resetProjectState } from '../../redux/reducers/projectSlice'
import { resetComponentState } from '../../redux/reducers/componentSlice'
import { resetActivityState } from '../../redux/reducers/activitySlice'
import { resetStateState } from '../../redux/reducers/stateSlice'
import { resetMunicipalityState } from '../../redux/reducers/municipalitySlice'
import { resetCommunityState } from '../../redux/reducers/communitySlice'
import { resetEventState } from '../../redux/reducers/eventSlice'
import { resetSessionState } from '../../redux/reducers/sessionSlice'
import { resetBeneficiaryTypeState } from '../../redux/reducers/beneficiaryTypeSlice'
import { resetBeneficiaryState } from '../../redux/reducers/beneficiarySlice'
import { resetReportState } from '../../redux/reducers/reportSlice'

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

		dispatch(resetUserState())
		dispatch(resetApiState())
		dispatch(resetProjectState())
		dispatch(resetComponentState())
		dispatch(resetActivityState())
		dispatch(resetStateState())
		dispatch(resetMunicipalityState())
		dispatch(resetCommunityState())
		dispatch(resetEventState())
		dispatch(resetSessionState())
		dispatch(resetBeneficiaryTypeState())
		dispatch(resetBeneficiaryState())
		dispatch(resetReportState())
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