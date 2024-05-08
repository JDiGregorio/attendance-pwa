import React, { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'

import { TCredentials } from '../../types'

import { persistUser, setLastUpdateDate } from '../../redux/reducers/userSlice'
import { setProjects } from '../../redux/reducers/projectSlice'
import { setComponents } from '../../redux/reducers/componentSlice'
import { setActivities } from '../../redux/reducers/activitySlice'
import { setStates } from '../../redux/reducers/stateSlice'
import { setMunicipalities } from '../../redux/reducers/municipalitySlice'
import { setCommunities } from '../../redux/reducers/communitySlice'
import { setEvents } from '../../redux/reducers/eventSlice'
import { setSessions } from '../../redux/reducers/sessionSlice'
import { setBeneficiaryTypes } from '../../redux/reducers/beneficiaryTypeSlice'
import { setBeneficiaries } from '../../redux/reducers/beneficiarySlice'

interface IUserContext {
	login: ({ email, password, hasUpdates }: TCredentials) => Promise<void>
	logout: () => void
}

const UserContext = createContext<IUserContext>({
	login: async ({ email, password, hasUpdates }: TCredentials) => {},
	logout: () => {}
})

interface IUserProvider {
	children: ReactNode
}

export const UserProvider: React.FC<IUserProvider> = ({ children }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const login = async ({ email, password, hasUpdates }: TCredentials) => {
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
					permissions: data.permissions
				}))

				if (!hasUpdates) {
					dispatch(setProjects({ projects: data.data.proyectos }))
					dispatch(setComponents({ components: data.data.componentes }))
					dispatch(setActivities({ activities: data.data.actividades }))
					dispatch(setStates({ states: data.data.estados }))
					dispatch(setMunicipalities({ municipalities: data.data.municipios }))
					dispatch(setCommunities({ communities: data.data.comunidades }))
					dispatch(setEvents({ events: data.data.eventos }))
					dispatch(setSessions({ sessions: data.data.sesiones }))
					dispatch(setBeneficiaryTypes({ beneficiaryTypes: data.data.beneficiarioTipos }))
					dispatch(setBeneficiaries({ beneficiaries: data.data.beneficiarios }))

					dispatch(setLastUpdateDate({ date:  new Date() }))
				}
				
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