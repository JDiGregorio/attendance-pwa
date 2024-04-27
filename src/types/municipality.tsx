export type TMunicipalityState = {
	all: TMunicipality[];
}

export type TMunicipality = {
	id: number;
	nombre: string;
	estado_id: number;
}