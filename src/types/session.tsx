import { TActivity, TBeneficiary, TCommunity, TComponent, TProject } from './index'

export type TSessionState = {
	all: TSession[];
	filters: TFilters;
}

export type TGroupSessionObject = {
	[monthKey: string]: {
		monthKey: string;
		month: string;
		monthN: number;
		year: number;
		quantity: number;
		sessions: TSession[];
	}
}

export type TGroupSession = {
	monthKey: string;
	month: string;
	monthN: number;
	year: number;
	quantity: number;
	sessions: TSession[];
}

export type TSession = {
	id: number | string | null;
	proyecto_id: number | null;
	componente_id: number | null;
	actividad_tipo_id: number | null;
	evento_id: number | null;
	nombre: string | null;
	fecha_sesion: string | null;
	hora_sesion: string | null;
	responsable: string | null;
	abierta: boolean | number;
	comentario: string | null;
	estado_id: number | null;
	estado: string | null;
	municipio_id: number | null;
	municipio: string | null;
	comunidad_id: number | null;
	comunidad: string | null;
	qty_preregistro: number;
	attendances: TAttendance[];
	beneficiarios: TBeneficiary[];
	created: boolean;
	attached: boolean;
	upload: boolean;
}

export type TAttendance = {
	evento_sesion_id: number | string;
	beneficiario_id: number | string;
	estado_asistencia: boolean;
	attached?: boolean;
}

export type TFilters = {
	proyecto_id: number | null;
	componente_id: number | null;
	actividad_tipo_id: number | null;
	comunidad_id: number | null;
	fecha: string | null;
}

export type TData = {
	projects: TProject[];
    components: TComponent[];
    activities: TActivity[];
    communities: TCommunity[];
}

export type TFunction = {
	filters?: TFilters;
	beneficiaries?: TBeneficiary[];
}

export type TSessionErrors = {
	proyecto_id?: string;
	componente_id?: string;
	actividad_tipo_id?: string;
	comunidad_id?: string;
	evento_id?: string;
	fecha_sesion?: string;
	hora_sesion?: string;
}