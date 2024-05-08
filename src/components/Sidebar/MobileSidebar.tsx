import { useContext, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Backdrop from '../Navigation/Backdrop'
import SidebarContent from './SidebarContent'

import { SidebarContext } from '../../contexts/SidebarContext'
import { IconSolid } from '../../utilities'

const MobileSidebar = () => {
	const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext)

	return (
        <Transition.Root show={isSidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={toggleSidebar}>
                <Backdrop />

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-400 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                        <Dialog.Panel className="pb-4 relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-black to-gray-950">
                            <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-50" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button type="button" className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => toggleSidebar()}>
                                        <span className="sr-only">
                                            Cerrar sidebar
                                        </span>
                                        <IconSolid icon="XMarkIcon" className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>

                            <SidebarContent />
                        </Dialog.Panel>
                    </Transition.Child>

                    <div className="w-14 flex-shrink-0" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileSidebar