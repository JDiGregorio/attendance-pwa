import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

interface IEmail {
	name: string;
	label: string;
	readonly: boolean;
    placeholder: string;
	value: string | null;
	setAction: React.Dispatch<React.SetStateAction<any>>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	error: string | null;
}

const Email = (props: IEmail) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="">
            {props.label &&
                <label htmlFor={props.name} className="">
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
                <input type="email" id={props.name} name={props.name} value={props.value || ""} onChange={onChange} onKeyDown={props.onKeyDown || null} placeholder={props.placeholder || ""} className="" />
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Email