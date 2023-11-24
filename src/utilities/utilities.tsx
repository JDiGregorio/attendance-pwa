import * as Icons from '@heroicons/react/24/solid'

type IconProps = {
	icon: string
	[key: string]: string | undefined
}

export const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
    // @ts-ignore
    const Icon = Icons[icon]

    return (
        <Icon {...props} />
    )
}