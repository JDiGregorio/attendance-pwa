import { createSlice } from '@reduxjs/toolkit'

import { TUserState } from '../../types'

const initialState: TUserState = {
	isAuthenticated: false,
	email: null,
	token: null
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
				token: action.payload.token
			}
		},
		resetUser: () => initialState
	}
})

export const { persistUser, resetUser } = userSlice.actions

export default userSlice.reducer