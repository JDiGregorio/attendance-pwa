import React, { ReactNode } from 'react'

interface MainProps {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="flex flex-1 overflow-y-auto">
            <div className="container w-full mx-auto">
				{children}
			</div>
        </main>
    )
}

export default Main