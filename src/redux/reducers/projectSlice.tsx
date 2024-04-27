import { createSlice } from '@reduxjs/toolkit'

import { TProjectState } from '../../types'

const initialState: TProjectState = {
	all: []
}

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setProjects: (state, action) => {
			return {
				...state,
				all: action.payload.projects
			}
		},
		resetState: () => initialState
	}
})

export const { setProjects, resetState } = projectSlice.actions

export default projectSlice.reducer