/* eslint-disable jsx-a11y/anchor-is-valid */
import { NAVBAR_LINK } from '../../lib/const/navigation'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppHeader() {
  return (
        <>
          <div className="w-full">
            <div className="relative flex h-16 items-center justify-start pl-5 pr-3 shadow-md">
                    {
                    NAVBAR_LINK.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(item.current ? 'bg-blue-700 text-white' : 'text-black hover:bg-gray-200 hover:text-black','rounded-md px-3 py-2 text-sm font-medium')}
                      >
                        {item.name}
                      </a>
                    ))}
            </div>
          </div>
        </>
      )}
