import React from 'react'

const ErrorView = (props: any) => (
    <div>
        <p className="">
            {props.message}
        </p>
    </div>
)

export default ErrorView