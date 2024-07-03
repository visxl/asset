import {
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineLogout,

} from 'react-icons/hi';

const userId = localStorage.getItem('userId');
const icon = "mr-3 w-6 h-6";


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
