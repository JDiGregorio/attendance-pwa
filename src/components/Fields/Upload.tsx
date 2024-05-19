import React from 'react'

import ErrorView from '../Forms/ErrorView'

import { Attached } from '../../types'

import { classNames, IconOutline } from '../../utilities'

interface IUpload {
	name: string;
	label: string;
    required: boolean;
    files: Array<Attached>;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onDelete: (name: string) => void;
    accept: string;
	error: string | null;
}

const Upload: React.FC<IUpload> = (props) => {
    return (
        <div className="space-y-1 sm:col-span-6">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-bold text-gray-600")}>
                    {props.label}
                </label>
            }

            {props.files.length > 0 ? (
                <div id={props.name} className="py-1.5 px-2 w-full flex justify-between rounded-md border border-gray-300">
                    <span className="text-sm text-gray-500 font-medium">
                        {props.files[0].name}
                    </span>

                    <button onClick={() => props.onDelete(props.name)} className="cursor-pointer">
                        <IconOutline icon="XCircleIcon" className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                </div>
            ) : (
                <input type='file' id={props.name} name={props.name} onChange={props.onChange} accept={props.accept} className="block w-full mt-1 p-1 border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-gray-300 text-sm rounded-md" />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Upload