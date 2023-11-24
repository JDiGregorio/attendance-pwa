import React from 'react'

interface IMain {
    children: React.ReactNode;
}

const Main = ({ children }: IMain) => {
    return (
        <main className="">
            <div className="">
				{children}
			</div>
        </main>
    )
}

export default Main