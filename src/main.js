// element ui
import "@/plugins/element.js";
import 'element-ui/lib/theme-chalk/display.css';
import "@/assets/css/style.scss"
import VueDraggableResizable from 'vue-draggable-resizable'
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
//element-data-table
import {
  DataTables,
  DataTablesServer
} from 'vue-data-tables'

import App from './App.vue'
import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/en'
//router
import router from "@/router"
//store
import store from "@/store"
import vueMoment from 'vue-moment'

Vue.use(vueMoment);
Vue.use(DataTables);
Vue.use(DataTablesServer);

Vue.use(VueDraggableResizable)

// mock server
// import { makeServer } from "./server"

Vue.config.productionTip = false

Vue.use({
  locale
})


//mock server
// if (process.env.NODE_ENV === "development") {
//   makeServer()
// }


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// import jquery from "jquery";
// window.$ = $ = require('jquery');