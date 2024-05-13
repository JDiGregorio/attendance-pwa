import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'

import BreadCrumb from '../../components/Breadcrumbs'
import Table from '../../components/Table'
import AlertConfirm  from '../../components/Alerts/AlertConfirm'

import { TBeneficiary } from '../../types'

import { IconSolid, IconOutline } from '../../utilities'

import { deleteBeneficiary } from '../../redux/reducers/beneficiarySlice'
import { detachedBeneficiary } from '../../redux/reducers/sessionSlice'

type Beneficiary = {
    id: number | string;
    codigo_de_beneficiario: string;
    fullname: string;
    actions?: string;
}

const columnHelper = createColumnHelper<Beneficiary>()

const BeneficiariesList = () => {
    const beneficiary = useSelector((state: any) => state.beneficiary) // add type selector

    const dispatch =  useDispatch()

    const handleDelete = (beneficiaryId: number | string) => {
        AlertConfirm({
			title: "Eliminar beneficiario",
			description: `¿Está seguro que quiere eliminar este beneficiario? Esta acción es irreversible.`,
			btnTextAccept: "Continuar",
			btnTextCancel: "Cancelar",
			onAccept: () => {
				dispatch(deleteBeneficiary({
                    beneficiaryId: beneficiaryId
                }))
        
                dispatch(detachedBeneficiary({
                    beneficiaryId: beneficiaryId
                }))
        
                toast.success('Beneficiario eliminado', {
                    description: 'El beneficiario ha sido eliminado de forma correcta.'
                })
			}
		})
    }

    const columns = [
        columnHelper.accessor(row => row.fullname, {
            id: 'fullname',
            header: () => (
                <span>
                    Beneficiario
                </span>
            ),
            cell: (info) => {
                const { fullname, codigo_de_beneficiario } = info.row.original
    
                return (
                    <div className="flex flex-col">                           
                        <p className="text-sm font-medium text-gray-500">
                            {fullname}
                        </p>
    
                        <p className="text-[10px] font-medium text-gray-400">
                            {codigo_de_beneficiario}
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
                        <Link to={`/beneficiaries/${id}/edit`} className="px-2 py-1 align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300">
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
    
    let beneficiaries = beneficiary.all.filter((beneficiary: TBeneficiary) => beneficiary.created === true)

    return (
        <div className="py-4 px-6">
            <BreadCrumb
                links={[
                    { path: '/home', name: 'Inicio' },
                    { path: null, name: "Lista de beneficiarios" }
                ]}
            />

            <Table 
                title="Beneficiarios"
                canCreate={false}
                columns={columns}
                data={beneficiaries}
            />
        </div>
    )
}

export default BeneficiariesList