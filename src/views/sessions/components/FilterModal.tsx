import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import ModalAction from '../../../components/Modals/ModalAction'
import Select2 from '../../../components/Fields/Select2'
import Date from '../../../components/Fields/Date'

import { TFilters, TData, TFunction, TComponent, TActivity } from '../../../types'
import * as constants from '../../../constants' 

import { IconSolid, transformCollection } from '../../../utilities'

interface IFilterModal {
    root: ReactDOM.Root;
    title: string;
    icon: string;
    instructions: string;
    textButton: string;
    filters: TFilters;
    data: TData;
    onAccept: (props: TFunction) => void;
    onClear: (props: TFunction) => void;
}

const FilterModal: React.FC<IFilterModal> = (props) => {
    const [filters, setFilters] = useState<TFilters>(props.filters)

    const handleAccept = () => {
		props.onAccept({
			filters: filters
		})

		props.root.unmount()
    }

    const handleCancel = () => {
        props.root.unmount()
    }

    const handleClear = () => {
        props.onClear({
            filters: constants.filters
        })

        props.root.unmount()
    }

    const components = filters.proyecto_id ? props.data.components.filter((component: TComponent) => component.proyectos.includes(filters.proyecto_id!)) : props.data.components
    const activities = filters.componente_id ? props.data.activities.filter((activity: TActivity) => activity.componente_id === filters.componente_id) : props.data.activities
        

    return (
        <div className="fixed z-40 inset-0 overflow-y-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
                <div onClick={handleCancel} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="w-full inline-table align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg lg:max-w-3xl">
                    <div className="bg-white py-4 px-6 divide-y space-y-3">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <IconSolid icon={props.icon} className="-ml-1 mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <h3 className="text-md leading-6 font-medium text-gray-500" id="modal-title">
                                    {props.title}
                                </h3>
                            </div>

                            <button type="button" onClick={handleCancel} className="align-middle bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                                <span className="sr-only">Close</span>
                                <IconSolid icon="XMarkIcon" className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="py-3 space-y-3">
                            <p className="text-[13px] text-gray-400">
                                {props.instructions}
                            </p>

                            <div className="z-50 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                                <div className="flex flex-col">
                                    <Select2
                                        name="proyecto_id"
                                        label="Proyecto"
                                        readonly={false}
                                        required={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={props.data.projects}
                                        value={filters.proyecto_id ? transformCollection(props.data.projects).find(project => project.value === filters.proyecto_id) : null}
                                        setAction={setFilters}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Select2
                                        name="componente_id"
                                        label="Componente"
                                        readonly={false}
                                        required={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={components}
                                        value={filters.componente_id ? transformCollection(components).find(component => component.value === filters.componente_id) : null}
                                        setAction={setFilters}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Select2
                                        name="actividad_tipo_id"
                                        label="Actividad"
                                        readonly={false}
                                        required={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={activities}
                                        value={filters.actividad_tipo_id ? transformCollection(activities).find(activity => activity.value === filters.actividad_tipo_id) : null}
                                        setAction={setFilters}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Select2
                                        name="comunidad_id"
                                        label="Comunidad"
                                        readonly={false}
                                        required={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isSearchable={true}
                                        placeholder="Seleccionar"
                                        emptyOptions="No se encuentran opciones"
                                        options={props.data.communities}
                                        value={filters.comunidad_id ? transformCollection(props.data.communities).find(community => community.value === filters.comunidad_id) : null}
                                        setAction={setFilters}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Date
                                        name="fecha"
                                        label="Fecha"
                                        readonly={false}
                                        required={false}
                                        value={filters.fecha}
                                        setAction={setFilters}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="py-3 flex justify-end space-x-3">
                            <button type="button" onClick={handleClear} className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-10">
                                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8809 10C14.2609 10 12.1309 12.13 12.1309 14.75C12.1309 15.64 12.3809 16.48 12.8209 17.2C13.6409 18.58 15.1509 19.5 16.8809 19.5C18.6109 19.5 20.1209 18.57 20.9409 17.2C21.3809 16.49 21.6309 15.64 21.6309 14.75C21.6309 12.13 19.5109 10 16.8809 10ZM18.6809 16.52C18.5309 16.67 18.3409 16.74 18.1509 16.74C17.9609 16.74 17.7709 16.67 17.6209 16.52L16.9009 15.8L16.1509 16.55C16.0009 16.7 15.8109 16.77 15.6209 16.77C15.4309 16.77 15.2409 16.7 15.0909 16.55C14.8009 16.26 14.8009 15.78 15.0909 15.49L15.8409 14.74L15.1209 14.01C14.8309 13.72 14.8309 13.24 15.1209 12.95C15.4109 12.66 15.8909 12.66 16.1809 12.95L16.9009 13.67L17.6009 12.97C17.8909 12.68 18.3709 12.68 18.6609 12.97C18.9509 13.26 18.9509 13.74 18.6609 14.03L17.9609 14.73L18.6809 15.46C18.9809 15.75 18.9809 16.23 18.6809 16.52Z" fill="#6b7280"/>
                                    <path d="M20.5799 4.02V6.24C20.5799 7.05 20.0799 8.06 19.5799 8.57L19.3999 8.73C19.2599 8.86 19.0499 8.89 18.8699 8.83C18.6699 8.76 18.4699 8.71 18.2699 8.66C17.8299 8.55 17.3599 8.5 16.8799 8.5C13.4299 8.5 10.6299 11.3 10.6299 14.75C10.6299 15.89 10.9399 17.01 11.5299 17.97C12.0299 18.81 12.7299 19.51 13.4899 19.98C13.7199 20.13 13.8099 20.45 13.6099 20.63C13.5399 20.69 13.4699 20.74 13.3999 20.79L11.9999 21.7C10.6999 22.51 8.90992 21.6 8.90992 19.98V14.63C8.90992 13.92 8.50992 13.01 8.10992 12.51L4.31992 8.47C3.81992 7.96 3.41992 7.05 3.41992 6.45V4.12C3.41992 2.91 4.31992 2 5.40992 2H18.5899C19.6799 2 20.5799 2.91 20.5799 4.02Z" fill="#6b7280" />
                                </svg>
                            </button>
                            
                            <button type="button" onClick={handleAccept} className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:w-auto sm:text-sm">
                                {props.textButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAction(FilterModal)