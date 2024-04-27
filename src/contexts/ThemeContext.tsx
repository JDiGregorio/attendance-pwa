import React, { useRef, useEffect, useState, createContext, useMemo, useLayoutEffect } from 'react'

const usePrevious = (theme: string) => {
    const ref = useRef<string>("")

    useEffect(() => {
        ref.current = theme
    })

    return ref.current
}

const useStorageTheme = (key: string): [string, React.Dispatch<React.SetStateAction<string | boolean>>] => {
    const userPreference = !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

    const [theme, setTheme] = useState(localStorage.getItem(key) || userPreference)

    useEffect(() => {
        localStorage.setItem(key, theme.toString())
    }, [theme, key])

    return [theme.toString(), setTheme]
}

interface IThemeContext {
	theme: string | React.Dispatch<React.SetStateAction<string | boolean>>
	toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext>({
	theme: "",
	toggleTheme: () => {}
})

interface IThemeProvider {
	children: React.ReactNode
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
    const [theme, setTheme] = useStorageTheme("theme")

    const oldTheme = usePrevious(theme)

    useLayoutEffect(() => {
        document.documentElement.classList.remove(`theme-${oldTheme}`)
        document.documentElement.classList.add(`theme-${theme}`)
    }, [theme, oldTheme])

    const toggleTheme = () => {
        if (theme === "light") {
			setTheme("dark")
		} else {
			setTheme("light")
		}
    }

    const value = useMemo(() => ({
		theme,
		toggleTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
    )
}