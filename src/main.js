import Vue from "vue"
import ElementUI from "element-ui"
import App from "./App.vue"
import router from "./router"
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/app.css"

Vue.use(ElementUI,{
	size: "small",
	zIndex: 3000
})

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
