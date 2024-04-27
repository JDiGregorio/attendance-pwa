import React from 'react'
import ReactDOM from 'react-dom/client'

import { IconSolid } from '../../utilities'

interface IAlertModalConfirm {
	icon: string;
	iconClasses: string;
	title: string;
	description: string;
	btnTextAccept: string;
	btnTextCancel: string;
	onAccept: () => void;
}

export const AlertModalConfirm = (props: IAlertModalConfirm) => {
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
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
					<div onClick={handleCancel} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-500 dark:bg-opacity-75"></div>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

					<div className="max-w-md w-full inline-table align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
						<div className="bg-white py-4 px-6 dark:bg-gray-700 dark:divide-gray-500">
							<div className="flex justify-end">
								<button onClick={handleCancel} className="align-middle bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-700">
									<span className="sr-only">Close</span>
									<IconSolid icon="XMarkIcon" className="h-6 w-6 text-gray-500 dark:text-gray-400" />
								</button>
							</div>

							<div className="py-4 space-y-12">
								<div className="flex flex-col justify-center items-center space-y-6">
									<IconSolid icon={props.icon} className={props.iconClasses} />

									<h1 className="text-lg font-medium text-gray-700 uppercase dark:text-gray-200">
										{props.title}
									</h1>

									<p className="text-sm font-normal text-gray-400 text-center dark:text-gray-400">
										{props.description}
									</p>
								</div>						

								<div className="flex justify-center space-x-3">
									<button onClick={handleCancel} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 uppercase">
										{props.btnTextCancel}
									</button>

									<button onClick={handleAccept} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 uppercase">
										{props.btnTextAccept}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}