import { TBeneficiary, TBeneficiaryErrors } from '../types'

const validateForm = (values: TBeneficiary) => {
    const errors: TBeneficiaryErrors = {}

    if (!values.primer_nombre) {
        errors.primer_nombre = 'Es necesario agregar el primer nombre.'
    }

    if (!values.primer_apellido) {
        errors.primer_apellido = 'Es necesario agregar el primer apellido.'
    }

    if (!values.fecha_de_nacimiento) {
        errors.fecha_de_nacimiento = 'Es necesario agregar la fecha de nacimiento.'
    }

    if (!values.sexo) {
        errors.sexo = 'Es necesario seleccionar el sexo.'
    }

    if (!values.proyecto_id) {
        errors.proyecto_id = 'Es necesario seleccionar el proyecto.'
    }

    if (!values.codigo_de_beneficiario) {
        errors.codigo_de_beneficiario = 'Es necesario agregar el código de beneficiario.'
    }

    if (!values.codigo_beneficiario_hogar) {
        errors.codigo_beneficiario_hogar = 'Es necesario agregar el código de hogar.'
    }

    if (!values.beneficiario_tipo_id) {
        errors.beneficiario_tipo_id = 'Es necesario seleccionar el tipo de beneficiario.'
    }

    if (!values.estado_id) {
        errors.estado_id = 'Es necesario seleccionar el estado.'
    }

    if (!values.municipio_id) {
        errors.municipio_id = 'Es necesario seleccionar el municipio.'
    }

    if (!values.comunidad_id) {
        errors.comunidad_id = 'Es necesario seleccionar la comunidad.'
    }

    return errors
}

export default validateForm