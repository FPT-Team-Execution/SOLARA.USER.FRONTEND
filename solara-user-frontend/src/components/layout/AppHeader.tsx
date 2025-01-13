'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import HeaderButton from '../ui/HeaderButton'
import Link from 'next/link'
import { useAuth, UserButton } from '@clerk/nextjs'
import { HOME_ROUTE, LEARNING_TOPICS_ROUTE, MARKET_ROUTE, SIGNIN_ROUTE } from '@/constants/routes'
import Image from 'next/image'
import LearningProgress from './LearningProgress'

// const learnings = [
//   { name: 'Flashcard', description: 'Get a better understanding of your traffic', href: '/learning/flashcard', icon: ChartPieIcon },
//   { name: 'Ôn Tập', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Giả Lập', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
// ]
// const callsToAction = [
//   { name: 'Rủi ro', href: '#', icon: PlayCircleIcon },
// ]

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { isSignedIn } = useAuth();

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src="/logo.png"
              width={84}
              height={0}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">


          <HeaderButton pathIndex={1} href={HOME_ROUTE} className="text-sm/6 py-1 px-2 rounded font-semibold text-gray-900">
            Trang Chủ
          </HeaderButton>

          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              <HeaderButton href="/learning" className="text-sm/6 py-1 px-2 rounded font-semibold text-gray-900">
                Học Tập
              </HeaderButton>
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {learnings.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover> */}

          <HeaderButton pathIndex={1} isMultiPath={true} href={LEARNING_TOPICS_ROUTE} className="text-sm/6 py-1 px-2 rounded font-semibold text-gray-900">
            Học Tập
          </HeaderButton>

          <HeaderButton pathIndex={1} href={MARKET_ROUTE} className="text-sm/6 py-1 px-2 rounded font-semibold text-gray-900">
            Nhãn Hàng
          </HeaderButton>

        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">

          {
            isSignedIn ?
              (
                <>
                  <LearningProgress />
                  <UserButton />
                </>
              )
              :
              (

                <HeaderButton pathIndex={1} href={SIGNIN_ROUTE} className="text-sm/6 font-semibold py-1 px-2 rounded text-gray-900">
                  Đăng nhập <span aria-hidden="true">&rarr;</span>
                </HeaderButton>
              )
          }


        </div>

      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="/logo.png"
                width={84}
                height={0}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <HeaderButton
                  pathIndex={1}
                  href={HOME_ROUTE}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/6 font-semibold text-gray-900"
                >
                  Trang Chủ
                </HeaderButton>

                {/* <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/6 font-semibold text-gray-900 hover:bg-gray-50">

                    <HeaderButton pathIndex={1} href="/learning" className="text-sm/6 py-1 px-2 rounded font-semibold text-gray-900">
                      Học Tập
                    </HeaderButton>

                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...learnings, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure> */}

                <HeaderButton
                  pathIndex={1}
                  isMultiPath
                  href={LEARNING_TOPICS_ROUTE}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/6 font-semibold text-gray-900"
                >
                  Học Tập
                </HeaderButton>

                <HeaderButton
                  pathIndex={1}
                  href={MARKET_ROUTE}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/6 font-semibold text-gray-900"
                >
                  Nhãn Hàng
                </HeaderButton>

              </div>

              <div className="py-6">
                {
                  isSignedIn ?
                    (
                      <UserButton />
                    )
                    :
                    (

                      <HeaderButton
                        pathIndex={1}
                        href={SIGNIN_ROUTE}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Sign in
                      </HeaderButton>
                    )
                }
              </div>

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default AppHeader