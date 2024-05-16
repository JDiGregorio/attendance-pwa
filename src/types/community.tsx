export type TCommunityState = {
	all: TCommunity[];
}

export type TCommunity = {
	id: number;
	nombre: string;
	estado_id: number;
	municipio_id: number;
	label: string;
}