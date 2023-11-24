import React, { ComponentType } from 'react'
import moment from 'moment'

// import logo from '../../assets/img/logo.webp'

const withLayout = (WrappedComponent: ComponentType<any>) => { // add type ComponentType<?>
    return () => {
        return (
            <section className="">
                <div className="">
                    <div className="">
                        {/*<img src={logo} className="" alt="Dream Ferries" />*/}
                    </div>

                    <hr className="" />

                    <div className="">
                        <WrappedComponent />

                        <div className="">
                            <p className="">
                                attendance app ©{moment().format("Y")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withLayout