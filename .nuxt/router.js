import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2fd7ee5b = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _82f9ff60 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _12155218 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _3c0fa714 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _bc0b8036 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _89a006d0 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _82fd0d0a = () => interopDefault(import('../pages/edit' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2fd7ee5b,
    children: [{
      path: "/",
      component: _82f9ff60,
      name: "home"
    }, {
      path: "/login",
      component: _12155218,
      name: "login"
    }, {
      path: "/register",
      component: _12155218,
      name: "register"
    }, {
      path: "/settings",
      component: _3c0fa714,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _bc0b8036,
      name: "article"
    }, {
      path: "/profile/:slug",
      component: _89a006d0,
      name: "profile"
    }, {
      path: "/edit/:slug?",
      component: _82fd0d0a,
      name: "edit"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
