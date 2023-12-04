import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import RegisterSuccess from '../pages/auth/RegisterSuccess';
import AdminPanel from '../pages/AdminPanel';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: 'register-success', element: <RegisterSuccess /> },
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'email-verification', element: <EmailVerification /> },
        { path: 'email-verification/:token', element: <EmailVerification /> },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/auth/login" replace /> },
        {
          path: '/login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { path: 'projects', element: <Projects /> },
            { path: 'project/:projectId/:pageId', element: <Project /> },
            { path: 'account', element: <Account /> },
            { path: 'account/:tab', element: <Account /> },
            { path: 'admin-panel/edit/user/:userId', element: <UserEdit /> },
            { path: 'admin-panel/edit/customer/:customerId', element: <CustomerEdit /> },
            { path: 'resources', element: <Resources /> },
            { path: 'unit/add/:projectId/', element: <UnitAdd /> },
            { path: 'unit/edit/:projectId/:unitId', element: <UnitEdit /> },
            { path: 'admin-panel', element: <AdminPanel /> },
            { path: 'admin-panel/:tab', element: <AdminPanel /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
const EmailVerification = Loadable(lazy(() => import('../pages/auth/EmailVerification')));
// const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));

// Projects
const Projects = Loadable(lazy(() => import('../pages/Projects')));
const Project = Loadable(lazy(() => import('../pages/Project')));
// Unit
const UnitAdd = Loadable(lazy(() => import('../pages/UnitAdd')));
const UnitEdit = Loadable(lazy(() => import('../pages/UnitEdit')));
// MyAccount
const Account = Loadable(lazy(() => import('../pages/Account')));
const UserEdit = Loadable(lazy(() => import('../pages/account/UserEdit')));
const CustomerEdit = Loadable(lazy(() => import('../pages/account/CustomerEdit')));

// Resource
const Resources = Loadable(lazy(() => import('../pages/Resources')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
