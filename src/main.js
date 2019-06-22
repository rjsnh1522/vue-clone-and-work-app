import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import Toasted from 'vue-toasted';
import router from './router'
import store from './store'

Vue.config.productionTip = false

require('./assets/vendor/fontawesome-free/css/all.min.css')
require('./assets/css/sb-admin-2.min.css')
require('./assets/vendor/jquery/jquery.min.js')
require('./assets/vendor/bootstrap/js/bootstrap.bundle.min.js')
require('./assets/vendor/jquery-easing/jquery.easing.min.js')

require('./assets/js/sb-admin-2.min.js')
// require('./assets/vendor/chart.js/Chart.min.js')
// require('./assets/js/demo/chart-area-demo.js')
// require('./assets/js/demo/chart-pie-demo.js')


Vue.use(VueAxios, axios)
Vue.use(Toasted,{
  iconPack: "material",
  theme: "outline",
  duration: 5000
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
