import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Table from '../../components/Table'
import AlertConfirm  from '../../components/Alerts/AlertConfirm'

import { TSession } from '../../types'

import { IconSolid, IconOutline } from '../../utilities'

import { deleteSession } from '../../redux/reducers/sessionSlice'

type Session = {
    id: number | string;
    nombre: string;
    fecha_sesion: string;
    estado: string;
    municipio: string;
    comunidad: string;
    actions?: string;
}

const columnHelper = createColumnHelper<Session>()

const SessionsList = () => {
    const session = useSelector((state: any) => state.session) // add type selector

    const dispatch =  useDispatch()

    const handleDelete = (sessionId: number | string) => {
        AlertConfirm({
			title: "Eliminar sesión",
			description: `¿Está seguro que quiere eliminar esta sesión? Esta acción es irreversible.`,
			btnTextAccept: "Continuar",
			btnTextCancel: "Cancelar",
			onAccept: () => {
                dispatch(deleteSession({
                    sessionId: sessionId
                }))

                toast.success('Sesión eliminada', {
                    description: 'La sesión ha sido eliminada de forma correcta.'
                })
            }
        })
    }

    const columns = [
        columnHelper.accessor(row => row.nombre, {
            id: 'nombre',
            header: () => (
                <span>
                    Sesión
                </span>
            ),
            cell: (info) => {
                const { nombre, fecha_sesion, estado, municipio, comunidad } = info.row.original
    
                return (
                    <div className="flex flex-col">                              
                        <p className="text-sm font-medium text-gray-500">
                            {nombre}
                        </p>
    
                        <p className="text-[10px] font-medium text-gray-400">
                            {`${comunidad}, ${municipio}, ${estado}`}
                        </p>

                        <p className="text-[10px] font-medium text-gray-400">
                            {moment(fecha_sesion, "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY')}
                        </p>
                    </div>
                )
            }
        }),
        columnHelper.accessor("actions", {
            id: 'actions',
            header: () => (
                <span>
                    Acciones
                </span>
            ),
            cell: (info) => {
                const { id } = info.row.original
                
                return (
                    <div className="flex justify-center items-center">
                        <Link to={`/sessions/${id}/edit`} className="px-2 py-1 align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300">
                            <IconSolid icon="PencilSquareIcon" className="w-4 h-4 text-gray-600" />
                        </Link>
    
                        <button onClick={() => handleDelete(id)} className="px-2 py-1 align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300">
                            <IconOutline icon="TrashIcon" className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                )
            }
        })
    ]
    
    let sessions = session.all.filter((session: TSession) => session.created === true)

    return (
        <div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: '/home', name: 'Inicio' },
                    { path: null, name: "Lista de sesiones" }
                ]}
            />

            <Table 
                title="Sesiones"
                canCreate={true}
                to="/sessions/create"
                state={{ fecha: null }}
                buttonText="Crear"
                columns={columns}
                data={sessions}
            />
        </div>
    )
}

export default SessionsList