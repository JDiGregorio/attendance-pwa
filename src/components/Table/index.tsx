import React from 'react'
import { Link } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable, PaginationState } from '@tanstack/react-table'

import EmptyTable from './EmptyTable'
import { Button, PageButton } from './Button'

import { IconSolid } from '../../utilities'

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

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onPaginationChange: setPagination,
		state: {
			pagination
		}
	})

	let bgCount = 0
  
	return (
		<div className="mt-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="flex flex-col sm:flex-row sm:items-center text-xl font-bold text-gray-900">
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
												<th key={header.id} scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: `${header.getSize()}%` }}>
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
														<td key={cell.id} className="px-4 py-4 whitespace-nowrap" role="cell">
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

								<tfoot className="bg-gray-50">
									<tr>
										<td colSpan={props.columns.length} className="py-2 px-6">
											<div className="w-full flex justify-between sm:hidden">
												<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
													Anterior
												</Button>

												<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
													Siguiente
												</Button>
											</div>

											<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
												<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
													<PageButton className="rounded-l-md" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
														<span className="sr-only">First</span>
														<IconSolid icon="ChevronDoubleLeftIcon" className="h-4 w-4" aria-hidden="true" />
													</PageButton>

													<PageButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
														<span className="sr-only">
															Previous
														</span>
														<IconSolid icon="ChevronLeftIcon" className="h-4 w-4" aria-hidden="true" />
													</PageButton>
												</nav>

												{data.length > 0 && (
													<div className="text-sm text-gray-700">
														Página{' '}
														<span className="font-medium">
															{table.getState().pagination.pageIndex + 1} {' '}
														</span> 
														de{' '}
														<span className="font-medium">
															{table.getPageCount().toLocaleString()}
														</span>
													</div>
												)}

												<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
													<PageButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
														<span className="sr-only">
															Next
														</span>
														<IconSolid icon="ChevronRightIcon" className="h-4 w-4" aria-hidden="true" />
													</PageButton>

													<PageButton className="rounded-r-md" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
														<span className="sr-only">
															Last
														</span>
														<IconSolid icon="ChevronDoubleRightIcon" className="h-4 w-4" aria-hidden="true" />
													</PageButton>
												</nav>
											</div>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table