import CAMINCO_LOGO from '../asset/Banner.jpg'
import { HiArrowLeft, HiBookOpen, HiBookmarkAlt, HiChartPie, HiCog, HiFolder, HiUser, HiUserCircle, HiUserGroup, HiUsers, HiViewList } from "react-icons/hi"
import { Sidebar } from "flowbite-react"

export default function AppSidebar() {
    const userId = localStorage.getItem('userId');
    
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items className="bg-white h-screen -mr-4 flex flex-col justify-between">
                <div>
                    <Sidebar.Logo>
                        <img src={CAMINCO_LOGO} alt="Logo" className='mt-5 w-52'/>
                    </Sidebar.Logo>
                    
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/" icon={HiChartPie}>Dashboard</Sidebar.Item>
                        <Sidebar.Item href={`/users/profile/${userId}`} icon={HiUser}>Profile</Sidebar.Item>
                        <Sidebar.Item href="/users" icon={HiUserGroup}>Users</Sidebar.Item>
                        
                        <Sidebar.Collapse icon={HiViewList} label="Asset">
                            <Sidebar.Item href="/asset" icon={HiBookmarkAlt}>Asset</Sidebar.Item>
                            <Sidebar.Item href="/asset250" icon={HiBookmarkAlt}>Asset Under 250</Sidebar.Item>
                            <Sidebar.Item href="/supplier" icon={HiUserCircle}>Supplier</Sidebar.Item>
                            <Sidebar.Item href="/request" icon={HiFolder}>Request</Sidebar.Item>
                        </Sidebar.Collapse>

                        <Sidebar.Item href="/customer" icon={HiUsers}>Customer</Sidebar.Item>
                        <Sidebar.Item href="/task" icon={HiBookOpen}>Task</Sidebar.Item>
                    </Sidebar.ItemGroup>
                </div>
                <div>
                    <Sidebar.ItemGroup className='mb-4'>
                        <Sidebar.Item href={`/users/setting/${userId}`} icon={HiCog}>Setting</Sidebar.Item>
                        <Sidebar.Item href="/login" icon={HiArrowLeft}>Logout</Sidebar.Item>
                    </Sidebar.ItemGroup>
                </div>
            </Sidebar.Items>
        </Sidebar>
    )
}

