import { TReport, TReportErrors } from '../types'

const validateForm = (values: TReport) => {
    const errors: TReportErrors = {}

    if (!values.nombre_actividad) {
        errors.nombre_actividad = 'Es necesario agregar el nombre de actividad.'
    }

    if (!values.fecha) {
        errors.fecha = 'Es necesario seleccionar la fecha de actividad.'
    }

    if (!values.proyecto_id) {
        errors.proyecto_id = 'Es necesario seleccionar el proyecto.'
    }

    if (!values.componente_id) {
        errors.componente_id = 'Es necesario seleccionar el componente.'
    }

    if (!values.actividad_tipo_id) {
        errors.actividad_tipo_id = 'Es necesario seleccionar el tipo de actividad.'
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