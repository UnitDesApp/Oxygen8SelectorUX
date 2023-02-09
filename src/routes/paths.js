// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

// ----------------------------------------------------------------------
const ROOT_PROJECTS = '/projects';
export const PATH_PROJECTS = {
  root: ROOT_PROJECTS,
}

const ROOT_PROJECT = '/project';
export const PATH_PROJECT = {
  root: ROOT_PROJECT,
  projectNew: `${ROOT_PROJECT}/new/`,
  dashboard: (id) => path(ROOT_PROJECT, `/dashboard/${id}`),
  projectEdit: (id) => path(ROOT_PROJECT, `/edit/${id}`),
  submittal: (id) => path(ROOT_PROJECT, `/submittal/${id}`),
  quote: (id) => path(ROOT_PROJECT, `/quote/${id}`)
};

// ----------------------------------------------------------------------
const ROOTS_UNIT = '/unit';
export const PATH_UNIT = {
  view: (projectId) => path(ROOTS_UNIT, `/view/${projectId}`),
  add: (projectId) => path(ROOTS_UNIT, `/add/${projectId}`),
  configure: (projectId) => path(ROOTS_UNIT, `/configure/${projectId}`),
  edit: (projectId, unitid) => path(ROOTS_UNIT, `/edit/${projectId}/${unitid}`),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};
