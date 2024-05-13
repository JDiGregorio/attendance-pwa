import React from 'react'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { classNames, IconSolid } from '../../utilities'

interface INumber {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
    placeholder: string;
	value: number;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error: string | null;
}

const Number: React.FC<INumber> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: value !== "" ? parseFloat(value) : 0
        }))
    }

	const handleDecrement = (name: string) => {
		let counter = props.value

		if (counter > 0) {
			counter = counter - 1
		}

		props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: counter
        }))
	}

	const handleIncrement = (name: string) => {
		props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [name]: (props.value + 1)
        }))
	}

    return (
        <div className="space-y-1 sm:col-span-3">
            {props.label &&
                <label htmlFor={props.name} className={classNames(props.required ? "required" : null, "block text-sm font-medium text-gray-700")}>
                    {props.label}
                </label>
            }

            {props.readonly === false ? (
                <div className="py-2 px-3 w-full bg-white border border-gray-300 rounded-lg">
					<div className="w-full flex justify-between items-center gap-x-3" data-hs-input-number="">
						<input type="text" id={props.name} name={props.name} value={props.value || 0} onChange={onChange} placeholder={props.placeholder} className="p-0 bg-transparent border-0 text-gray-800 focus:ring-0" data-hs-input-number-input />

						<div className="flex justify-end items-center gap-x-1.5">
							<button type="button" onClick={() => handleDecrement(props.name)} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-input-number-decrement>
								<IconSolid icon="MinusIcon" className="flex-shrink-0 size-3.5" aria-hidden="true" />
							</button>

							<button type="button" onClick={() => handleIncrement(props.name)} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-input-number-increment>
								<IconSolid icon="PlusIcon" className="flex-shrink-0 size-3.5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
            ) : (
                <ReadOnly name={props.name} value={props.value} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Number