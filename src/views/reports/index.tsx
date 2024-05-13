import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Table from '../../components/Table'
import AlertConfirm  from '../../components/Alerts/AlertConfirm'

import { IconSolid, IconOutline } from '../../utilities'

import { deleteReport } from '../../redux/reducers/reportSlice'

type Report = {
    id: string;
    nombre_actividad: string;
    fecha: string;
    actions?: string;
}

const columnHelper = createColumnHelper<Report>()

const ReportsList = () => {
    const report = useSelector((state: any) => state.report) // add type selector

    const dispatch =  useDispatch()

    const handleDelete = (reportId: string) => {
        AlertConfirm({
			title: "Eliminar reporte",
			description: `¿Está seguro que quiere eliminar este reporte? Esta acción es irreversible.`,
			btnTextAccept: "Continuar",
			btnTextCancel: "Cancelar",
			onAccept: () => {
                dispatch(deleteReport({
                    reportId: reportId
                }))

                toast.success('Reporte eliminado', {
                    description: 'El reporte ha sido eliminado de forma correcta.'
                })
            }
        })
    }

    const columns = [
        columnHelper.accessor(row => row.nombre_actividad, {
            id: 'nombre_actividad',
            header: () => (
                <span>
                    Actividad
                </span>
            ),
            cell: (info) => {
                const { nombre_actividad, fecha } = info.row.original
    
                return (
                    <div className="flex flex-col">                              
                        <p className="text-sm font-medium text-gray-500">
                            {nombre_actividad}
                        </p>
    
                        <p className="text-[10px] font-medium text-gray-400">
                            {fecha}
                        </p>
                    </div>
                )
            },
            size: 85
        }),
        columnHelper.accessor("actions", {
            id: 'actions',
            header: () => (
                <span className="w-full flex justify-center">
                    Acciones
                </span>
            ),
            cell: (info) => {
                const { id } = info.row.original
                
                return (
                    <div className="flex justify-center items-center">
                        <Link to={`/reports/${id}/edit`} className="px-2 py-1 align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300">
                            <IconSolid icon="PencilSquareIcon" className="w-4 h-4 text-gray-600" />
                        </Link>
    
                        <button onClick={() => handleDelete(id)} className="px-2 py-1 align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300">
                            <IconOutline icon="TrashIcon" className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                )
            },
            size: 15
        })
    ]

    return (
        <div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: '/home', name: 'Inicio' },
                    { path: null, name: "Lista de reportes" }
                ]}
            />

            <Table 
                title="Reportes de actividad"
                canCreate={true}
                to="/reports/create"
                buttonText="Crear"
                columns={columns}
                data={report.all}
            />
        </div>
    )
}

export default ReportsList