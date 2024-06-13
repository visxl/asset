import { createContext, useState } from "react"
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS_ICON, DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_LINKS_ICON } from "../../lib/const/navigation"
import { Link } from "react-router-dom"
import { ChevronFirst, ChevronLast } from "lucide-react"
import CAMINCO_LOGO from '../asset/Banner.jpg'

const SidebarContext = createContext()

export default function AppSidebar() {
    const [expanded, setExpanded] = useState(true)
    // const [isOpen,setIsOpen] = useState('')

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    //   };

    return (
        <aside className="h-screen relative">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={CAMINCO_LOGO}
                        className={`overflow-hidden transition-all ${
                        expanded ? "w-44" : "w-0"
                        }`}
                        alt="Logo"
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className={`overflow-hidden transition-all flex-1 border-t`}>
                        {expanded ? (
                            DASHBOARD_SIDEBAR_LINKS.map((item) => (
                                <SidebarItem key={item.key} item={item}/> 
                            ))
                        ) : (
                            DASHBOARD_SIDEBAR_LINKS_ICON.map((item) => (
                                <SidebarItem key={item.key} item={item}/> 
                            ))
                        )}
                    </ul>
                    <ul className={`overflow-hidden transition-all flex flex-col border-t`}>
                        {expanded ? (
                            DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                                <SidebarItem key={item.key} item={item}/>
                              ))
                        ) : (
                            DASHBOARD_SIDEBAR_BOTTOM_LINKS_ICON.map((item) => (
                                <SidebarItem key={item.key} item={item}/>
                              ))
                        )}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    )
}

export function SidebarItem({ item }) {
    const [hovered, setHovered] = useState(false);

    return (
        <li
            className="flex items-center py-0.5 text-black"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link to={item.path} className="w-full h-10 pl-6 text-md flex items-center text-black hover:bg-gray-200">
                {item.icon}
                <span className={hovered ? "transition-all md:inline" : "overflow-hidden transition-all md:inline"}>{item.label}</span>
            </Link>
        </li>
    );
};
