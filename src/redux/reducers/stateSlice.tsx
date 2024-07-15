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
		resetStateState: () => initialState
	}
})

export const { setStates, resetStateState } = stateSlice.actions

export default stateSlice.reducer