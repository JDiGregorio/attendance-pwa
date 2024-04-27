export type TEventState = {
    all: TEvent[];
}

export type TEvent = {
	id: number;
	nombre: string;
	proyecto_id: number;
	componente_id: number;
	actividad_tipo_id: number;
	comunidad_id: number;
}