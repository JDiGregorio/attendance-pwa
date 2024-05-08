export type TReportState = {
	all: TReport[];
}

export type TReport = {
	id: string | null;
	nombre_actividad: string | null;
	fecha: string  | null;
	proyecto_id: number | null;
	componente_id: number | null;
	actividad_tipo_id: number | null;
	estado_id: number | null;
	municipio_id: number | null;
	comunidad_id: number | null;
	asistentes_hombres: number;
	asistentes_mujeres: number;
	asistentes_ninos: number;
	asistentes_ninas: number;
	cde_ponentes_hombres: number;
    cde_ponentes_mujeres: number;
	archivo_evidencia_asistencia: string | null;
	notas: string | null;
}

export type TReportErrors = {
	nombre_actividad?: string;
	fecha?: string;
	proyecto_id?: string;
	componente_id?: string;
	actividad_tipo_id?: string;
	estado_id?: string;
	municipio_id?: string;
	comunidad_id?: string;
}