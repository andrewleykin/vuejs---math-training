import Vue from 'vue'
import App from './App.vue'

import AppStartScreen from './components/startScreen.vue'
import AppMessage from './components/message.vue'
import AppQuestion from './components/question.vue'
import AppResultScreen from './components/resultScreen.vue'

Vue.component('AppStartScreen', AppStartScreen);
Vue.component('AppMessage', AppMessage);
Vue.component('AppQuestion', AppQuestion);
Vue.component('AppResultScreen', AppResultScreen);

new Vue({
  el: '#app',
  render: h => h(App)
})
