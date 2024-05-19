import React from 'react'

import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface ITextArea {
	name: string;
	label?: string;
	readonly: boolean;
    required: boolean;
	rows: number;
    placeholder: string;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	styles: any;
	error: string | null;
}

const TextArea: React.FC<ITextArea> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="space-y-1 sm:col-span-6">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-bold text-gray-600")}>
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
				<textarea id={props.name} name={props.name} rows={props.rows} placeholder={props.placeholder} value={props.value || ""} onChange={onChange} className="py-1.5 block w-full rounded-md border border-gray-300 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-1 focus:border-gray-300 focus:outline-none focus:ring-gray-300" style={props.styles} />
			) : (
                <textarea id={props.name} name={props.name} defaultValue={props.value || ""} rows={props.rows} readOnly className="mt-1 block w-full rounded-md shadow-sm text-sm text-gray-500 bg-gray-50 border-gray-300 focus:border-gray-200 focus:ring-0" style={props.styles} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default TextArea