import { createSlice } from '@reduxjs/toolkit'

import { TComponentState } from '../../types'

const initialState: TComponentState = {
	all: []
}

const componentSlice = createSlice({
	name: 'component',
	initialState,
	reducers: {
		setComponents: (state, action) => {
			return {
				...state,
				all: action.payload.components
			}
		},
		resetState: () => initialState
	}
})

export const { setComponents, resetState } = componentSlice.actions

export default componentSlice.reducer