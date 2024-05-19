import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface ITime {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error?: string | null;
}

const Time: React.FC<ITime> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: value
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
				<input type="time" id={props.name} name={props.name} value={props.value || ""} onChange={onChange} className="p-2.5 block w-full bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-300 focus:outline-none focus:ring-gray-300" />
			) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Time