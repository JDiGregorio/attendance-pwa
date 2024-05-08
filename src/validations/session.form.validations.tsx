import { TSession, TSessionErrors } from '../types'

const validateForm = (values: TSession) => {
    const errors: TSessionErrors  = {}

    if (!values.proyecto_id) {
        errors.proyecto_id = 'Es necesario seleccionar el proyecto.'
    }

    if (!values.componente_id) {
        errors.componente_id = 'Es necesario seleccionar el componente.'
    }

    if (!values.actividad_tipo_id) {
        errors.actividad_tipo_id = 'Es necesario seleccionar la actividad.'
    }

    if (!values.comunidad_id) {
        errors.comunidad_id = 'Es necesario seleccionar la comunidad.'
    }

    if (!values.evento_id) {
        errors.evento_id = 'Es necesario seleccionar el evento.'
    }

    if (!values.fecha_sesion || values.fecha_sesion === "") {
        errors.fecha_sesion = 'Es necesario agregar la fecha de la sesión.'
    }

    if (!values.hora_sesion || values.hora_sesion === "") {
        errors.hora_sesion = 'Es necesario agregar la hora de la sesión.'
    }

    return errors
}

export default validateForm