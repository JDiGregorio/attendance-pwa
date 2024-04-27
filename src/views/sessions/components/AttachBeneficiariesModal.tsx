import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import ModalAction from '../../../components/Modals/ModalAction'

import { TBeneficiary, TFunction } from '../../../types'

import { IconSolid, IconOutline, classNames, removeAccents } from '../../../utilities'

interface IAttachBeneficiariesModal {
    root: ReactDOM.Root;
    title: string;
    icon: string;
    instructions: string;
    beneficiaries: TBeneficiary[];
    textAcceptButton: string;
    textCancelButton: string;
    textCreateButton: string;
    onAccept: (props: TFunction) => void;
    onRedirect: () => void;
}

const AttachBeneficiariesModal: React.FC<IAttachBeneficiariesModal> = (props) => {
    const [beneficiaries, setBeneficiaries] = useState<TBeneficiary[]>(props.beneficiaries)
    const [search, setSearch] = useState<string | null>(null)

	const handleAccept = () => {
        let checkedBeneficiaries = beneficiaries.filter((beneficiary: TBeneficiary) => beneficiary.checked === true)

		props.onAccept({ 
            beneficiaries: checkedBeneficiaries
        })

		props.root.unmount()
    }

	const handleCancel = () => {
        props.root.unmount()
    }

    const handleRedirect = () => {
        props.onRedirect()

        props.root.unmount()
    }

    const handleItemClick = (beneficiaryId: number | string, checked: boolean) => {
        let newSessions = [ ...beneficiaries ].map((beneficiary: TBeneficiary) => {
            // eslint-disable-next-line
            if (beneficiary.id == beneficiaryId) {
                let beneficiaryCopy = { ...beneficiary }

                beneficiaryCopy.checked = !checked

                return beneficiaryCopy
            }

            return beneficiary
        })

        setBeneficiaries(newSessions)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        setSearch(value !== "" ? value : null)
    }

    const handleSearch = () => {
        if (!search) {
            return beneficiaries
        }
      
        const sentence = removeAccents(search).toLowerCase().trim()

        return beneficiaries.filter(beneficiary => {
            if (removeAccents(beneficiary.codigo_de_beneficiario!).toLowerCase().includes(sentence)) {
                return true
            }
          
            if (removeAccents(beneficiary.fullname!).toLowerCase().includes(sentence)) {
                return true
            }

            return false
        })
    }

    let leakedBeneficiaries = handleSearch()
    let countChecked = beneficiaries.filter((beneficiary: TBeneficiary) => beneficiary.checked === true).length

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
                            <p className="text-[13px] text-gray-400 leading-tight">
                                {props.instructions}
                            </p>

                            <div className="z-50 h-[400px] flex flex-col space-y-4">
                                <input type="search" name="search" value={search || ""} onChange={onChange} placeholder="Buscar..." className="py-1.5 pl-3 block w-full text-sm rounded-md leading-5 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-orange-500 dark:text-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700" />

                                <div className="relative h-full overflow-y-auto border-y border-gray-200 divide-y divide-gray-200" role="listitem">
                                    {leakedBeneficiaries.length > 0 ? (
                                        leakedBeneficiaries.map((beneficiary: TBeneficiary) => (
                                            <div key={beneficiary.id} onClick={() => handleItemClick(beneficiary.id!, beneficiary.checked!)} className="flex justify-between items-center py-2 px-2 cursor-pointer">
                                                <div className="flex flex-col">                              
                                                    <p className="text-sm font-medium text-gray-500">
                                                        {beneficiary.fullname}
                                                    </p>

                                                    <p className="text-[10px] font-medium text-gray-400">
                                                        {beneficiary.codigo_de_beneficiario}
                                                    </p>
                                                </div>

                                                <div className="ml-3 flex h-6 items-center">
                                                    {beneficiary.checked ? (
                                                        <IconSolid icon="CheckCircleIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-300" aria-hidden="true" />
                                                    ) : (
                                                        <IconOutline icon="XCircleIcon" className="h-5 w-5 flex-shrink-0 self-center text-gray-300" aria-hidden="true" />
                                                    )}              
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="relative card bg-white">
                                            <div className={classNames("px-6 py-8 flex flex-col justify-center items-center")}>
                                                <div className="text-center">
                                                    <p className={classNames("uppercase text-80 text-xs font-semibold text-gray-400")}>
                                                        No hay beneficiarios para mostrar
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="overflow-hidden overflow-x-auto relative"></div>
                                        </div>
                                    )} 
                                </div>
                            </div>
                        </div>

                        <div className="py-3 flex justify-between">
                            <button type="button" onClick={handleRedirect} className="px-2 py-2 inline-flex justify-center items-center space-x-2 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                <IconSolid icon="UserPlusIcon" className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                <span className="hidden lg:block text-xs sm:text-base font-medium text-gray-400">
                                    {props.textCreateButton}
                                </span>
                            </button>

                            <div className="flex space-x-1">
                                <button type="button" onClick={handleCancel} className="px-6 py-2 inline-flex justify-center bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                    <span className="text-xs sm:text-base font-semibold text-gray-900">
                                        {props.textCancelButton}
                                    </span>
                                </button>

                                {countChecked > 0 && (
                                    <button type="button" onClick={handleAccept} className="px-6 py-2 inline-flex justify-center bg-orange-600 rounded-md shadow-sm border border-transparent hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:w-auto">
                                        <span className="text-xs sm:text-base font-medium text-white">
                                            {props.textAcceptButton}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default ModalAction(AttachBeneficiariesModal)