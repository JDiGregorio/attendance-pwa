import React from 'react'

import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface IUpload {
	name: string;
	label: string;
    required: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	error: string | null;
}

const Upload: React.FC<IUpload> = (props) => {
    return (
        <div className="space-y-1 sm:col-span-3">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-medium text-gray-700")}>
                    {props.label}
                </label>
            }

            <input type='file' id={props.name} name={props.name} onChange={props.onChange} className="block max-w-lg w-full mt-1 p-1 border border-gray-300 focus:ring-gray-300 focus:border-gray-300 text-sm rounded-md" />


            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Upload