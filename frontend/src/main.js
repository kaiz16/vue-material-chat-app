import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import VEmojiPicker from 'v-emoji-picker';
Vue.use(VEmojiPicker);
Vue.use(VueMaterial)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
