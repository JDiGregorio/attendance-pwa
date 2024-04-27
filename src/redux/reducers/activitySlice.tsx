import { createSlice } from '@reduxjs/toolkit'

import { TActivityState } from '../../types'

const initialState: TActivityState = {
	all: []
}

const activitySlice = createSlice({
	name: 'activity',
	initialState,
	reducers: {
		setActivities: (state, action) => {
			return {
				...state,
				all: action.payload.activities
			}
		},
		resetState: () => initialState
	}
})

export const { setActivities, resetState } = activitySlice.actions

export default activitySlice.reducer