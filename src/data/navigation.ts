export interface MenuItem {
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Profile',
    path: '/profile',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

