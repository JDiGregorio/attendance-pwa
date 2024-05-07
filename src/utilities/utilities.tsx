import * as IconsSolid from '@heroicons/react/24/solid'
import * as IconsOutline from '@heroicons/react/24/outline'

import { TCollection, TNewCollection, TBeneficiary, TName } from '../types'

type IconProps = {
	icon: string;
	[key: string]: string | undefined;
}

export const IconSolid: React.FC<IconProps> = ({ icon, ...props }) => {
    // @ts-ignore
    const Icon = IconsSolid[icon]

    return (
        <Icon {...props} />
    )
}

export const IconOutline: React.FC<IconProps> = ({ icon, ...props }) => {
    // @ts-ignore
    const Icon = IconsOutline[icon]

    return (
        <Icon {...props} />
    )
}

export const classNames = (...classes: (string | undefined | null)[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const transformCollection = (collection: TCollection[]) => {
    return collection.reduce((accum: TNewCollection[], item: TCollection) => {
        return [
            ...accum,
            {
                value: item.id,
                label: item.nombre
            }
        ]
    }, [])
}

export const someFilter = (object: any): boolean => {  // add type
    for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
            return true
        }
    }

    return false
}

export const reorderList = (a: any, b: any): number => {
    if (a.primer_nombre < b.primer_nombre) {
        return -1
    }

    if (a.primer_nombre > b.primer_nombre) {
        return 1
    }

    return 0
}

export const pushName = (beneficiary: TBeneficiary, nombre: TName, fullname: string[]): void => {
    if (beneficiary[nombre]) {
        fullname.push(capitalize(beneficiary[nombre]!.trim()))
    }
}

export const capitalize = (word: string): string => {
    const words = word.split(" ")
    
    const capitalizedWord = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    
    return capitalizedWord.join(" ")
}

export const generateId = (): string => {
    const seed = new Uint32Array(4)
    const cryptoObj = window?.crypto || ((window as any).msCrypto as Crypto)
    return cryptoObj.getRandomValues(seed).join('-')
}

export const removeAccents = (sentence: string): string => {
    if (sentence === null) {
        return ""
    }

    return sentence.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const getDayName = (day: number): string => {
    const dayNames = ["Dom", "Lun", "Mar", "Miérc", "Juev", "Vier", "Sáb"]

    return dayNames[day - 1]
}

export const getMonthName = (month: number): string => {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    return monthNames[month - 1]
}