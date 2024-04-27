import { createSlice } from '@reduxjs/toolkit'

import { TEventState } from '../../types'

const initialState: TEventState = {
	all: []
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setEvents: (state, action) => {
			return {
				...state,
				all: action.payload.events
			}
		},
		resetState: () => initialState
	}
})

export const { setEvents, resetState } = eventSlice.actions

export default eventSlice.reducer