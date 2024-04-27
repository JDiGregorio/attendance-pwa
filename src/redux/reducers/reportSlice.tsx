import { createSlice } from '@reduxjs/toolkit'

import { TReportState, TReport } from '../../types'

const initialState: TReportState = {
	all: []
}

const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		setReport: (state, action) => {
			return {
				...state,
				all: state.all.concat(action.payload.newReport)
			}
		},
		updateReport: (state, action) => {
			let newReports = state.all.map((report: TReport) => {
				if (report.id === action.payload.updateReport.id) {
					return { ...action.payload.updateReport }
				}

				return report
			})

			return {
				...state,
				all: newReports
			}
		},
		deleteReport: (state, action) => {
			return {
				...state,
				all: state.all.filter((report) => report.id !== action.payload.reportId)
			}
		},
		resetState: () => initialState
	}
})

export const { setReport, updateReport, deleteReport, resetState } = reportSlice.actions

export default reportSlice.reducer