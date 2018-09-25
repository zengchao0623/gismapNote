import Vue from 'vue'
import Router from 'vue-router'
import OlPage from '@/views/ol/index.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/ol',
			name: 'ol',
			component: OlPage
		}
	]
})