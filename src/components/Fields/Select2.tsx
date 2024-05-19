import React from 'react'
import Select from 'react-select'

import ReadOnly from './ReadOnly'
import ErrorView from '../Forms/ErrorView'

import { classNames } from '../../utilities'

interface ISelect2 {
	name: string;
	label: string;
	readonly: boolean;
    required: boolean;
	isDisabled: boolean;
	isLoading: boolean;
	isClearable: boolean;
	isSearchable: boolean;
	options: any;
	emptyOptions: string;
    placeholder: string;
	value: any;
	setAction: React.Dispatch<React.SetStateAction<any>>; // add type
	error?: string | null;
}

const Select2: React.FC<ISelect2> = (props) => {
    const onChange = (selected: any) => {
        props.setAction((prevState: any) => ({ // add type
            ...prevState,
            [props.name]: selected.value
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
                <Select                
                    inputId={props.name}
                    name={props.name}
                    className="basic-single text-sm"
                    classNamePrefix="select"
                    isDisabled={props.isDisabled}
                    isLoading={props.isLoading}
                    isClearable={props.isClearable}
                    isSearchable={props.isSearchable}  
                    placeholder={props.placeholder}
                    noOptionsMessage={({ inputValue }) => props.emptyOptions}
                    options={props.options}
                    value={props.value}
                    onChange={onChange}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#d1d5db'
                        }
                    })}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            borderRadius: 6
                        })
                    }}
                />
            ) : (
                <ReadOnly name={props.name} value={props.value || '-'} />
            )}

            {props.error && <ErrorView message={props.error} />}
        </div>
    )
}

export default Select2