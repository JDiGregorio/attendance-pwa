import React from 'react'

interface IDivider {
	classes: string;
}

const Divider: React.FC<IDivider> = ({ classes }) => {
	return (
		<hr className={classes} />
	)
}


export default Divider