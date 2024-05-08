import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { TOption } from '../../types'
import { classNames } from '../../utilities'

interface ISelect {
	name: string;
	label: string;
	readonly: boolean;
	required: boolean;
	value: number | string | null;
	options: TOption[];
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error: string | null;
}

const Select: React.FC<ISelect> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: typeof value === "number" ? parseFloat(value) : value
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
                <select id={props.name} name={props.name} value={props.value || ''} onChange={onChange} className="mt-1 py-2 px-3 block w-full shadow-sm text-sm rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700">
					<option value="" hidden>
                        Seleccionar
                    </option>

					{props.options.map((option: TOption) => (
						<option key={option.id} value={option.id}>
							{option.label}
						</option>
					))}
				</select>
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Select