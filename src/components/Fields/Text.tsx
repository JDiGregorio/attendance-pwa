import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface IText {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
    placeholder: string;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error: string | null;
}

const Text: React.FC<IText> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: value !== "" ? value : null
        }))
    }

    return (
        <div className="space-y-1 sm:col-span-3">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-bold text-gray-600")}>
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
                <input type='text' id={props.name} name={props.name} value={props.value || ""} onChange={onChange} placeholder={props.placeholder || ""} className="py-2 block w-full text-sm rounded-md leading-5 border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-gray-300" />
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Text