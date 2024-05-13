import React, { ReactNode } from 'react'

interface MainProps {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="h-full overflow-y-auto">
            <div className="container grid mx-auto">
				{children}
			</div>
        </main>
    )
}

export default Main