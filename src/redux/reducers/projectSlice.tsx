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
		resetProjectState: () => initialState
	}
})

export const { setProjects, resetProjectState } = projectSlice.actions

export default projectSlice.reducer