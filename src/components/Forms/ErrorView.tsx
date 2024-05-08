import React from 'react'

interface IErrorView {
	message: string | null;
}

const ErrorView: React.FC<IErrorView> = (props) => (
    <p className="mt-2 text-sm text-red-600">
        {props.message}
    </p>
)

export default ErrorView