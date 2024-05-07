import React from 'react'
import { Link } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import EmptyTable from './EmptyTable'

interface ITable {
	title: string;
	canCreate: boolean;
	to?: string;
	state?: any;
	buttonText?: string;
	columns: any;
	data: any;
}

const Table: React.FC<ITable> = (props) => {
	const { columns, data } = props

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	})

	let bgCount = 0

	/**
	 * Agregar paginación
	 */
  
	return (
		<div className="mt-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="flex flex-col sm:flex-row sm:items-center text-2xl font-bold text-gray-900">
                    {props.title}
                </h2>

				{props.canCreate && (
                    <Link to={props.to || ""} state={props.state} className="align-bottom inline-flex items-center justify-center cursor-pointer uppercase leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-300">
                        {props.buttonText}
                    </Link>
                )}
            </div>

			<div className="flex flex-col">
                <div className="-my-2 overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full">
                        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300">
							<table className="w-full divide-y divide-gray-200">
								<thead className="bg-gray-100">
									{table.getHeaderGroups().map(headerGroup => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map(header => (
												<th key={header.id} scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													<div className="flex items-center justify-between">
														{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
													</div>
												</th>
											))}
										</tr>
									))}
								</thead>

								<tbody className="bg-white divide-y divide-gray-200">
									{table.getRowModel().rows.length > 0 ? (
										table.getRowModel().rows.map(row => {
											bgCount += 1

											return (
												<tr key={row.id} className={(bgCount % 2) ? "bg-white" : "bg-gray-50"}>
													{row.getVisibleCells().map(cell => (
														<td key={cell.id} className="px-6 py-4 whitespace-nowrap" role="cell">
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</td>
													))}
												</tr>
											)
										})
									) : (
										<tr className="bg-white">
                                            <td colSpan={props.columns.length}>
                                                <EmptyTable
                                                    containerClass="px-6 py-8"
                                                    parrafClass="text-sm"
                                                    description="No hay datos para mostrar"
                                                />
                                            </td>
                                        </tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table