import React, { ReactNode } from 'react'

interface MainProps {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="h-full overflow-y-auto"> {/* flex flex-1 */}
            <div className="container grid py-4 px-6 mx-auto"> {/* flex w-full */}
				{children}
			</div>
        </main>
    )
}

export default Main