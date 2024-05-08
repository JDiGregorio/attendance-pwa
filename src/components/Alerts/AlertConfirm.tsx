import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import { Transition } from '@headlessui/react'

import { IconSolid, IconOutline } from '../../utilities'

interface IAlertConfirm {
	title: string;
	description: string;
	btnTextAccept: string;
	btnTextCancel: string;
	onAccept: () => void;
}

const AlertConfirm = (props: IAlertConfirm) => {
	const root = ReactDOM.createRoot(document.getElementById("alert-container") as HTMLElement)

	const handleAccept = () => {
		props.onAccept()

		root.unmount()
	}

	const handleCancel = () => {
		root.unmount()
	}

	root.render(
		<>
			<div className="fixed z-50 inset-0 overflow-y-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end px-4 py-6 sm:items-start sm:p-6">
                    <div onClick={handleCancel} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity cursor-pointer" aria-hidden="true"></div>

                    <div className="z-50 flex w-full flex-col items-center space-y-4 sm:items-end">
                        <Transition show={true} as={Fragment} enter="transform ease-out duration-300 transition" enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enterTo="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <IconOutline icon="ExclamationTriangleIcon" className="h-10 w-10 text-yellow-500" />
                                        </div>

                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {props.title}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {props.description}
                                            </p>

                                            <div className="mt-4 flex">
                                                <button type="button" onClick={handleAccept} className="inline-flex items-center rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                                                    {props.btnTextAccept}
                                                </button>

                                                <button type="button" onClick={handleCancel} className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    {props.btnTextCancel}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="ml-4 flex flex-shrink-0">
                                            <button type="button" onClick={handleCancel} className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                                <span className="sr-only">Close</span>
                                                <IconSolid icon="XMarkIcon" className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
		</>
	)
}

export default AlertConfirm