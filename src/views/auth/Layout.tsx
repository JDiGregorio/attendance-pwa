import React, { useContext, ComponentType } from 'react'
import { WindmillContext } from '@windmill/react-ui'
import moment from 'moment'

import logoLight from '../../assets/img/logo-light.png'
import logoDark from '../../assets/img/logo-dark.png'

const withLayout = <P extends {}> (WrappedComponent: ComponentType<P>) => {
    const Layout: React.FC<P> = (props) => {
        const { mode } = useContext(WindmillContext)

        return (
            <section className="flex min-h-screen">
               <div className="overflow-hidden mx-0 my-0 py-2 px-6 flex flex-1 landscape:flex-row justify-center items-center bg-white landscape:space-y-0 landscape:space-x-16 portrait:flex-col portrait:space-y-10 portrait:space-x-0 dark:bg-gray-800">
                    <div className="w-full lg:w-4/5 max-w-sm flex justify-center">
                        <img src={mode === "light" ? logoLight : logoDark} className="object-scale-down max-h-72" alt="LOGO" />
                    </div>

                    <hr className="my-6" />

                    <div className="w-full lg:w-4/5 max-w-sm">
                        <WrappedComponent {...props} />

                        <div className="mt-6 relative flex justify-center">
                            <p className="px-2 text-sm bg-white text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-600">
                                attendance ©{moment().format("Y")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return Layout
}

export default withLayout