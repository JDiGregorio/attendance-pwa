import { createSlice } from '@reduxjs/toolkit'

import { TUserState } from '../../types'

const initialState: TUserState = {
	isOnline: true,
	isAuthenticated: false,
	email: null,
	token: null,
	user: {},
	permissions: {}
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
				permissions: action.payload.permissions
			}
		},
		setIsOnline: (state, action) => {
			return {
				...state,
				isOnline: action.payload.isOnline
			}
		},
		resetState: () => initialState
	}
})

export const { persistUser, setIsOnline, resetState } = userSlice.actions

export default userSlice.reducer