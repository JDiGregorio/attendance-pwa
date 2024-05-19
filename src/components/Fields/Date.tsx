import React from 'react'
import moment from 'moment'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface IDate {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error?: string | null;
}

const Date: React.FC<IDate> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: moment(value, "YYYY-MM-DD").format("DD/MM/YYYY")
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
                <input type='date' id={props.name} name={props.name} value={props.value ? moment(props.value, "DD/MM/YYYY").format("YYYY-MM-DD") : "" || ""} onChange={onChange} className="py-2 pl-3 block w-full text-sm rounded-md leading-5 border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-gray-300" />
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Date