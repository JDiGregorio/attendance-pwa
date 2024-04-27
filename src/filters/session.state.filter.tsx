import moment from 'moment'
import { TSession, TFilters } from '../types'

const filterByIdParam = (session: TSession, key: string, value: string | number | null): boolean => {
	// @ts-ignore
	return !value || session[key] === value;
}

const filterByDate = (session: TSession, key: string, value: string | number | null): boolean => {
	let date = moment(session.fecha_sesion, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")
	let current = moment(value, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY")

	return !value || date === current;
}

interface FilterFunctions {
	[key: string]: (session: TSession, key: string, value: string | number | null) => boolean;
}

const filterFunctions: FilterFunctions = {
	proyecto_id: filterByIdParam,
	componente_id: filterByIdParam,
	actividad_tipo_id: filterByIdParam,
	comunidad_id: filterByIdParam,
	fecha: filterByDate
}
  
export const filtered = (sessions: TSession[], filters: TFilters) => {
	return sessions.filter((session: TSession) => {
		return Object.entries(filters).every(([filterName, filterValue]) => {
			const filterFunction = filterFunctions[filterName];
			return !filterFunction || filterFunction(session, filterName, filterValue)
		})
	})
}