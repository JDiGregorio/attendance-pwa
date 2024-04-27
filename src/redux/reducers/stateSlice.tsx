import { createSlice } from '@reduxjs/toolkit'

import { TStateState } from '../../types'

const initialState: TStateState = {
	all: []
}

const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		setStates: (state, action) => {
			return {
				...state,
				all: action.payload.states
			}
		},
		resetState: () => initialState
	}
})

export const { setStates, resetState } = stateSlice.actions

export default stateSlice.reducer