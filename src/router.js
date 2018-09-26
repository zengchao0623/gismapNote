import Vue from 'vue'
import Router from 'vue-router'
import openlayer from '@/views/ol/index.vue'

Vue.use(Router)

const vueRouter = new Router({
	routes: [
		{
			path: '/ol',
			name: 'ol',
			component: openlayer,
			meta: {
				title : "openlayers"
			}
		}
	]
})

vueRouter.beforeEach((to, from, next) => {
	if(to.meta.title){
		document.title = document.title + "-" + to.meta.title;
	}
	next();
})

export default vueRouter