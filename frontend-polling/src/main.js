import Vue from 'vue'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
let dmode = sessionStorage.getItem('d_theme_enabled')
/*eslint-disable*/
if (dmode){
  import ('vue-material/dist/theme/black-green-dark.css')
}else{
  import ('vue-material/dist/theme/black-green-light.css')
}
import { 
    MdCard,
    MdField,
    MdButton,
    MdAvatar,
    MdContent,
    MdApp,
    MdToolbar,
    MdIcon,
    MdDialog,
    MdDialogConfirm,
    MdProgress,
    MdDivider
  } from 'vue-material/dist/components'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdAvatar)
Vue.use(MdContent)
Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdDialog)
Vue.use(MdDialogConfirm)
Vue.use(MdProgress)
Vue.use(MdDivider)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
