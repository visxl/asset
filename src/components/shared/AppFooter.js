import React from 'react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  return (
        <footer class="bg-gray-100 pl-72 ">
                <div class="grid grid-cols-3 px-4 py-6">
                <div className='w-80'>
                    <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase">Company</h2>
                    <ul class="text-gray-500  font-medium">
                        <li class="mb-4">
                            <Link to="#" class=" hover:underline">About</Link>
                        </li>
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Careers</Link>
                        </li>
                    </ul>
                </div>
                <div className='w-80'>
                    <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase">Help center</h2>
                    <ul class="text-gray-500 font-medium">
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Facebook</Link>
                        </li>
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className='w-80'>
                    <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase">Legal</h2>
                    <ul class="text-gray-500 font-medium">
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Privacy Policy</Link>
                        </li>
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Licensing</Link>
                        </li>
                        <li class="mb-4">
                            <Link to="#" class="hover:underline">Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="px-4 py-6 bg-gray-100 flex justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <Link to="#">Flowbite™</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default AppFooter