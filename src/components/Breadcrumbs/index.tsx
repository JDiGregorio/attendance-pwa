import React from 'react'
import { Link } from 'react-router-dom'

import { IconSolid } from '../../utilities'

interface IBreadCrumb {
	links: TLink[];
}

type TLink = {
	path: string | null;
	name: string;
}

const BreadCrumb: React.FC<IBreadCrumb> = ({ links }) => {
	return (
		<div className="my-4 flex items-center space-x-2">
			{links[0].path && (
				<Link to={links[0].path} className="text-sm text-gray-400 font-semibold">
					{links[0].name}
				</Link>
			)}

			<IconSolid icon="ChevronRightIcon" className="h-3 w-3 text-gray-400" />

			{links[1].path ? (
                <Link to={links[1].path} className={`text-sm  font-semibold ${links.length > 2 ? 'text-gray-400' : 'text-gray-500'}`}>
                    {links[1].name}
                </Link>
            ) : (
                <h1 className="text-sm  font-semibold text-gray-500">
                    {links[1].name}
                </h1>
            )}

			{links.length > 2 ? (
                <>
                    <IconSolid icon="ChevronRightIcon" className="h-3 w-3 text-gray-400" />

                    <h1 className="text-sm text-gray-500 font-semibold">
                        {links[2].name}
                    </h1>
                </>
            ) : (null)}
		</div>
	)
}

export default BreadCrumb