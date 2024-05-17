import React, { useState } from 'react'

import ErrorView from '../Forms/ErrorView'

import { TStateAction } from '../../types'
import { classNames, IconOutline } from '../../utilities'

interface IPassword {
	name: string;
	label: string;
    required: boolean;
    placeholder: string;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<TStateAction>>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	error: string | null;
}

const Password: React.FC<IPassword> = (props) => {
    const [show, setShow] = useState<boolean>(false)

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
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-bold text-gray-600")}>
                    {props.label}
                </label>
            }

            <div className="relative">
                <input type={show ? 'text' : 'password'} id={props.name} name={props.name} value={props.value || ""} onChange={onChange} onKeyDown={props.onKeyDown || null} placeholder={props.placeholder || ""} autoComplete="off" className="py-2.5 block w-full text-sm rounded-md border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-gray-300" />
            
                <button type="button" onClick={() => setShow(!show)} className="absolute top-0 end-0 p-3">
                    {show ? (
                        <IconOutline icon="EyeIcon" className="flex-shrink-0 text-gray-500 size-5" aria-hidden="true" />
                    ) : (
                        <IconOutline icon="EyeSlashIcon" className="flex-shrink-0 text-gray-500 size-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Password