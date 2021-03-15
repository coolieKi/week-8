import Home from './components/PageContent.vue'
import Order from './Order.vue'
import Modify from './Modify.vue'
import Dashboard from './components/Dashboard.vue'

export default [
  { path: '/', component: Home },
  { path: '/orders', component: Order },
  { path: '/modify', component: Modify, name: 'modify', props: true},
  { path: '/dashboard', component: Dashboard}
]