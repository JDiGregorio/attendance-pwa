import React, { ReactNode } from 'react'

import { classNames } from '../../utilities'

interface IForm {
	HeaderForm?: ReactNode;
	title: string;
	buttons: ReactNode | null;
	onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	buttonText: string;
	BodyForm: ReactNode;
	FooterForm?: ReactNode;
}

const Form: React.FC<IForm> = (props) => {
    return (
        <>
            {props.HeaderForm ? (
                props.HeaderForm
            ): (
                <div className="flex justify-between items-center mb-8">
                    <h2 className="flex flex-col sm:flex-row sm:items-center text-xl font-bold text-gray-900">
                        {props.title}
                    </h2>

                    <div className={classNames(props.buttons ? "items-center space-x-3" : null, "flex")}>
                        {props.buttons && (props.buttons)}

                        <button onClick={props.onSubmit} className="w-auto inline-flex items-center space-x-3 rounded-md py-2.5 px-3.5 text-sm font-semibold shadow-sm bg-green-600 text-white border border-transparent active:bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-300">
                            {props.buttonText}
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {props.BodyForm && (props.BodyForm)}
            </div>


            {props.FooterForm ?? (props.FooterForm)}
        </>   
    )
}

export default Form