// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('mdi:user-outline'),
  dashboard: getIcon('grommet-icons:projects'),
  download: getIcon('ic:outline-download'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Projects', path: '/projects', icon: ICONS.dashboard },
      { title: 'My Account', path: '/account', icon: ICONS.user },
      { title: 'Resources', path: '/resources', icon: ICONS.download },
    ],
  }
];

export default navConfig;
