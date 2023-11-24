import React from 'react'
import { Icon } from '../utilities'

const Page404 = () => {
	return (
		<div className="">
			<Icon icon="NoSymbolIcon" className="" aria-hidden="true" />
			
			<h1 className="">
				404
			</h1>
			
			<p className="">
				Page not found. Check the address or{' '}
				<a className="" href="../index.html">
					go back
				</a>
				.
			</p>
		</div>
	)
}

export default Page404