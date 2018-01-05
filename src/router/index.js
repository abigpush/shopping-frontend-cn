import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/Index.vue'
import abroad from '../pages/Abroad.vue'
import detail from '../pages/Detail.vue'
import cheap from '../pages/Cheap.vue'
import notFound from '../pages/NotFound.vue'
import us from '../pages/Us.vue'
import contactUs from '../pages/ContactUs.vue'
import aboutUs from '../pages/AboutUs.vue'
import disclaimer from '../pages/Disclaimer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: '/dist',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
        path: '/abroad',
        name: 'abroad',
        component: abroad
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/cheap',
      name: 'cheap',
      component: cheap
    },
    { path: '/us', component: us,
      children: [
        {
          path: '/',
          component: contactUs
        },
        {
          path: 'contactUs',
          component: contactUs
        },
        {
          path: 'aboutUs',
          component: aboutUs
        },
        {
          path: 'disclaimer',
          component: disclaimer
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
