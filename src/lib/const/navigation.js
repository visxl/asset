import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineLogout,
	HiOutlineUser,
} from 'react-icons/hi';

const userId = localStorage.getItem('userId');
const icon = "mr-3 w-6 h-6";

// Sidebar Links
export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid className={icon} />
	},
	{
		key: 'user',
		label: 'Profile',
		path: `/users/profile/${userId}`,
		icon: <HiOutlineUser className={icon} />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers className={icon} />
	},
	{
		key: 'asset',
		label: 'Asset',
		path: '/asset',
		icon: <HiOutlineCube className={icon} />,
		child: {
			key: 'asset-under-250',
			label: 'Asset Under 250',
			path: '/asset/asset250',
			icon: <HiOutlineCube className={icon} />
		}
	},
	{
		key: 'customer',
		label: 'Customer',
		path: '/customer',
		icon: <HiOutlineUsers className={icon} />
	},
	{
		key: 'task',
		label: 'Task',
		path: '/task',
		icon: <HiOutlineDocumentText className={icon} />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation className={icon} />
	}
];

export const DASHBOARD_SIDEBAR_LINKS_ICON = [
	{
		key: 'dashboard',
		path: '/',
		icon: <HiOutlineViewGrid className={icon} />
	},
	{
		key: 'user',
		path: `/users/profile/${userId}`,
		icon: <HiOutlineUser className={icon} />
	},
	{
		key: 'users',
		path: '/users',
		icon: <HiOutlineUsers className={icon} />
	},
	{
		key: 'asset',
		path: '/asset',
		icon: <HiOutlineCube className={icon} />
	},
	{
		key: 'asset-under-250',
		path: '/asset250',
		icon: <HiOutlineCube className={icon} />
	},
	{
		key: 'customer',
		path: '/customer',
		icon: <HiOutlineUsers className={icon} />
	},
	{
		key: 'task',
		path: '/task',
		icon: <HiOutlineDocumentText className={icon} />
	},
	{
		key: 'messages',
		path: '/messages',
		icon: <HiOutlineAnnotation className={icon} />
	}
];

// Bottom Sidebar Links
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: `/users/setting/${userId}`,
		icon: <HiOutlineCog className={icon} />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle className={icon} />
	},
	{
		key: 'logout',
		label: 'Sign Out',
		path: '/login',
		icon: <HiOutlineLogout className={icon} />
	}
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS_ICON = [
	{
		key: 'settings',
		path: `/users/setting/${userId}`,
		icon: <HiOutlineCog className={icon} />
	},
	{
		key: 'support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle className={icon} />
	},
	{
		key: 'logout',
		path: '/login',
		icon: <HiOutlineLogout className={icon} />
	}
];

// Navbar Links
export const NAVBAR_LINK = [
	{ 
		key: 'dashboard',
		name: 'Dashboard', 
		href: '/', 
		current: true 
	},
	{ 
		key: 'team',
		name: 'Team', 
		href: '#', 
		current: false 
	},
	{ 
		key: 'projects',
		name: 'Projects', 
		href: '#', 
		current: false 
	},
	{ 
		key: 'calendar',
		name: 'Calendar', 
		href: '#', 
		current: false 
	}
];
