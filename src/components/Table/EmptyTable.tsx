import React from 'react'

import { classNames } from '../../utilities'

interface IEmptyTable {
	containerClass: string;
	parrafClass: string;
	description: string;
}

const EmptyTable: React.FC<IEmptyTable> = (props) => (
    <div className="relative card bg-white">
        <div className={classNames(props.containerClass, "flex flex-col justify-center items-center")}>
            <div className="text-center">
                <p className={classNames(props.parrafClass, "uppercase text-80 font-semibold text-gray-400")}>
                    {props.description}
                </p>
            </div>
        </div>

        <div className="overflow-hidden overflow-x-auto relative"></div>
    </div>
)

export default EmptyTable