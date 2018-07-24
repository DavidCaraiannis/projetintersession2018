import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import ForgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/resetPassword';
import NoMatch from '../pages/noMatch';
import Project from '../pages/project';
import GanttPage from '../pages/gantt';

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {// TODO change false to true après connexion au back
        path: '/project',
        exact: true,
        auth: false,
        component: Project
    },
    {// TODO change false to true après connexion au back
        path: '/gantt',
        exact: true,
        auth: false,
        component: GanttPage
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    }
];

export default routes;
