import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
;

Vue.config.productionTip = false

import global_ from './utils/Global.js'
Vue.prototype.GLOBAL = global_
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value;
    //document.title = el.innerText
    //el.remove()
  }
})
Vue.component('icon', Icon);
Vue.use(Toast, {
  defaultType: 'center',
  duration: 1500,
});
Vue.filter('uppercase', function(value) {
  if (!value) { return ''}
  value = value.toString()
  return value.toUpperCase() ;
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
