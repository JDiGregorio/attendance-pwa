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
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-medium text-gray-700 dark:text-gray-500")}>
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
				<input type="time" id={props.name} name={props.name} value={props.value || ""} onChange={onChange} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
			) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Time