import Index from 'views/Index.js';
import clientIndex from 'views/client/index';
import Profile from 'views/examples/Profile.js';
import Maps from 'views/examples/Maps.js';
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Tables from 'views/examples/Tables.js';
import Icons from 'views/examples/Icons.js';

var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/client',
  },
  {
    path: '/space',
    name: 'Espace client',
    icon: 'ni ni-circle-08 text-primary',
    component: clientIndex,
    layout: '/client',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'ni ni-planet text-blue',
    component: Icons,
    layout: '/client',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'ni ni-pin-3 text-orange',
    component: Maps,
    layout: '/client',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/client',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '/client',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
];
export default routes;
