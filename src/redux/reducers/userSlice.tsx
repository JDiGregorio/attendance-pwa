import { createSlice } from '@reduxjs/toolkit'

import { TUserState } from '../../types'

const initialState: TUserState = {
	isOnline: true,
	isAuthenticated: false,
	email: null,
	token: null,
	user: {},
	permissions: {},
	lastUpdateDate: null,
	hasUpdates: false,
	initialized: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		persistUser: (state, action) => {
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				email: action.payload.email,
				token: action.payload.token,
				user: action.payload.user,
				permissions: action.payload.permissions,
				initialized: action.payload.initialized
			}
		},
		setIsOnline: (state, action) => {
			return {
				...state,
				isOnline: action.payload.isOnline
			}
		},
		setLastUpdateDate: (state, action) => {
			return {
				...state,
				lastUpdateDate: action.payload.date
			}
		},
		setInitialized: (state, action) => {
			return {
				...state,
				initialized: action.payload.initialized
			}
		},
		logoutUser: (state, action) => {
			return {
				...initialState,
				hasUpdates: action.payload.hasUpdates
			}
		},
		resetUserState: () => initialState
	}
})

export const { persistUser, setIsOnline, setLastUpdateDate, setInitialized, logoutUser, resetUserState } = userSlice.actions

export default userSlice.reducer