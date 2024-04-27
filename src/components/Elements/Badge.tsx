import React from 'react'

import { IconSolid } from '../../utilities'

interface IBadge {
	canSee: boolean;
	label: string | null;
	value: string | null;
	canReset: boolean;
	onClick?: () => void;
}

const Badge: React.FC<IBadge> = ({ canSee, label, value, canReset, onClick }) => {
    return canSee ? (
		<div className="flex justify-between items-center pr-3.5 py-1 space-x-2 bg-white rounded-full shadow-sm border border-gray-300">
			<div className="ml-1 py-0.5 px-2 bg-gray-100 border border-gray-200 rounded-full">
				<p className="text-[11px] text-gray-500">
					{label}
				</p>
			</div>
			
			<p className="text-sm font-medium text-gray-400">
				{value}
			</p>

			{canReset && (
				<button type="button" onClick={onClick} className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
					<span className="sr-only">
						Remove
					</span>

					<IconSolid icon="XMarkIcon" className="h-3.5 w-3.5 text-gray-300 stroke-gray-700/50 group-hover:stroke-gray-700/75" />

					<span className="absolute -inset-1" />

					
				</button>
			)}

			
		</div>
	) : (null)
}

export default Badge