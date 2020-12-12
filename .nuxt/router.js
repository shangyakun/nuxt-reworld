import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _39d46327 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _166e381c = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _90ddd868 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _8e7bce40 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _50e736ce = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _1e7bbd68 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _166cb147 = () => interopDefault(import('../pages/edit' /* webpackChunkName: "" */))

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
    component: _39d46327,
    children: [{
      path: "/",
      component: _166e381c,
      name: "home"
    }, {
      path: "/login",
      component: _90ddd868,
      name: "login"
    }, {
      path: "/register",
      component: _90ddd868,
      name: "register"
    }, {
      path: "/settings",
      component: _8e7bce40,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _50e736ce,
      name: "article"
    }, {
      path: "/profile/:slug",
      component: _1e7bbd68,
      name: "profile"
    }, {
      path: "/edit/:slug?",
      component: _166cb147,
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
