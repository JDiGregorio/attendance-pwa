import React from 'react'

import SidebarContent from './SidebarContent'

const DesktopSidebar = () => {
    return (
        <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
            <div className="flex flex-grow flex-col h-full overflow-y-auto bg-gradient-to-b from-black to-gray-950">
                <SidebarContent />
            </div>
        </aside>
    )
}

export default DesktopSidebar