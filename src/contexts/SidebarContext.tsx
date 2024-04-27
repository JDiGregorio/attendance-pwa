import React, { createContext, useState, useMemo } from 'react'

interface ISidebarContext {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

export const SidebarContext = createContext<ISidebarContext>({
    isSidebarOpen: false,
    closeSidebar: () => {},
    toggleSidebar: () => {}
})

interface ISidebarPovider {
    children: React.ReactNode
}

export const SidebarProvider = ({ children }: ISidebarPovider) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    const value = useMemo(() => ({
		isSidebarOpen,
		toggleSidebar,
		closeSidebar

        // eslint-disable-next-line
    }), [isSidebarOpen])

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}