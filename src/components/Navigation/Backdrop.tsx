import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

const Backdrop = () => {
    return (
        <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
    )
}

export default Backdrop