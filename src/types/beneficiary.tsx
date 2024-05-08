export type TBeneficiaryState = {
	all: TBeneficiary[];
}

export type TName = "primer_nombre" | "segundo_nombre" | "primer_apellido" | "segundo_apellido"

export type TBeneficiary = {
	id: number | string | null;
	primer_nombre: string | null;
	segundo_nombre: string | null;
	primer_apellido: string | null;
	segundo_apellido: string | null;
	fecha_de_nacimiento: string | null;
	sexo: string | null;
	proyecto_id: number | null;
	codigo_de_beneficiario: string | null;
	codigo_beneficiario_hogar: string | null;
	beneficiario_tipo_id: number | null;
	estado_id: number | null;
	estado?: string;
	municipio_id: number | null;
	municipio?: string;
	comunidad_id: number | null;
	comunidad?: string;
	fullname?: string | null;
	checked?: boolean;
	created: boolean;
}

export type TBeneficiaryErrors = {
	primer_nombre?: string;
	primer_apellido?: string;
	fecha_de_nacimiento?: string;
	sexo?: string;
	proyecto_id?: string;
	codigo_de_beneficiario?: string;
	codigo_beneficiario_hogar?: string;
	beneficiario_tipo_id?: string;
	estado_id?: string;
	municipio_id?: string;
	comunidad_id?: string;
}