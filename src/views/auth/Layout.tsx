import React, { ComponentType } from 'react'
import moment from 'moment'

import logoLight from '../../assets/img/logo-light.png'

const withLayout = <P extends {}> (WrappedComponent: ComponentType<P>) => {
    const Layout: React.FC<P> = (props) => {
        return (
            <section className="flex min-h-screen">
               <div className="overflow-hidden mx-0 my-0 py-2 px-6 flex flex-1 landscape:flex-row justify-center items-center bg-white landscape:space-y-0 landscape:space-x-16 portrait:flex-col portrait:space-y-10 portrait:space-x-0">
                    <div className="w-full lg:w-4/5 max-w-sm flex justify-center">
                        <img src={logoLight} className="object-scale-down max-h-72" alt="LOGO" />
                    </div>

                    <hr className="my-6" />

                    <div className="w-full space-y-6 lg:w-4/5 max-w-sm">
                        <WrappedComponent {...props} />

                        <div className="relative flex justify-center">
                            <p className="px-2 text-xs bg-white text-gray-500 font-medium uppercase">
                                asistencia cde ©{moment().format("Y")}
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