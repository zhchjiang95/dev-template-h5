import Home from '../views/Home.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/ErrorPage'),
    props: { newsletterPopup: false }
  }
]