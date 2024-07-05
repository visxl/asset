import React, { useState } from "react"
import { Button, Drawer } from "flowbite-react";


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () =>setIsOpen(false)
    
    return (
        <>
            <div className="flex min-h-[50vh] items-center justify-center">
                <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
            </div>

            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="Menu" titleIcon={() => <></>}/>
                <Drawer.Items>
                    <Sidebar aria-label='Sidebar with multi-level dropdown' className='[&>div]:bg-transparent [&>div]:p-0'>
                        <div className="flex h-full flex-col justify-between py-2">
                            <Sidebar.Items>
                                
                            </Sidebar.Items>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    )
}

