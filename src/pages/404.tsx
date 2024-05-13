import React from 'react'
import { Link } from 'react-router-dom'

import { IconOutline, IconSolid } from '../utilities'

const Page404 = () => {
	return (
		<div className="h-full flex flex-col items-center">
			<IconSolid icon="NoSymbolIcon" className="h-32 w-32 mt-8 text-red-300" aria-hidden="true" />
			
			<div className="px-6 flex flex-col items-center space-y-4">
				<h1 className="text-6xl font-semibold text-gray-700">
					404
				</h1>
				
				<p className="text-md text-gray-400 font-normal">
					Página no encontrada.
				</p>

				<p className="text-sm text-gray-500 font-normal text-center">
					Puedes volver a la página anterior o visitar la página de inicio.
				</p>

				<Link to="/home" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 rounded-md bg-orange-600 shadow-sm cursor-pointer hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
					<IconOutline icon="HomeIcon" className="h-5 w-5 text-white" aria-hidden="true" />
					<span className="text-xs font-semibold text-white uppercase">
						ir al inicio
					</span>
				</Link>
			</div>
		</div>
	)
}

export default Page404