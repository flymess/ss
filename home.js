/**
 * Created by tao on 2016/11/22.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './src/router'
import abstract from './src/views/abstract.vue'

const FastClick = require('fastclick')

FastClick.attach(document.body)

Vue.use(VueRouter)

var router = new VueRouter({
	routes: routes
})

router.start(abstract, '#app')