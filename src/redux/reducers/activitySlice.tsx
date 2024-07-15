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
		resetActivityState: () => initialState
	}
})

export const { setActivities, resetActivityState } = activitySlice.actions

export default activitySlice.reducer