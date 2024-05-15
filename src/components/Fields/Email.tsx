import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { TStateAction } from '../../types'
import { classNames } from '../../utilities'

interface IEmail {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
    placeholder: string;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<TStateAction>>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	error: string | null;
}

const Email: React.FC<IEmail> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: TStateAction) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="space-y-1">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-medium text-gray-700")}>
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
                <input type='email' id={props.name} name={props.name} value={props.value || ""} onChange={onChange} onKeyDown={props.onKeyDown || null} placeholder={props.placeholder || ""} autoComplete="off" className="py-2 pl-3 pr-10 block w-full text-sm rounded-md leading-5 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-orange-500" />
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Email