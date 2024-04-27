import React, { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'

const ModalAction = <P extends {}> (WrappedComponent: ComponentType<P>) => (props: any) => { // add type
    const root = createRoot(document.getElementById('modal-container') as HTMLElement)

    root.render(
        <WrappedComponent {...props} root={root} />
    )
}

export default ModalAction