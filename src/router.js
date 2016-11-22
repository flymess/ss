/**
 * Created by tao on 2016/11/22.
 */
import home from './views/home/home.vue'
	const routes = [
		{
			path: '/',
			name: 'home',
			component: home
		},
		{
			path: '/user',
			name: 'user',
			component: function (resolve) {
				require(['./views/user/user.vue'], resolve)
			}
		}
	]

 module.exports = routes


