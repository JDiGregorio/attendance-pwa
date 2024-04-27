import React, { ReactNode } from 'react'

import Divider from '../Elements/Divider'

interface IFormSection {
	title: string;
	buttons: ReactNode | null;
	GroupForm: ReactNode;
}

const FormSection: React.FC<IFormSection> = (props) => {
    return (
        <div className="px-2 sm:px-4 py-4 flex flex-col space-y-2 bg-white shadow-md rounded-lg border border-gray-300">
            <div className="px-2 sm:px-4 flex justify-between items-center">
                {props.title && (
                    <h2 className="text-lg font-semibold text-gray-600">
                        {props.title}
                    </h2>
                )}

                {props.buttons && (
                    <div className={"flex items-center space-x-3"}>
                        {props.buttons}
                    </div>
                )}
            </div>

            <Divider classes="mx-2 sm:mx-4 border-dashed border-gray-300" />

            {props.GroupForm && (props.GroupForm)}
        </div>
    )
}

export default FormSection