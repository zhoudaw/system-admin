import router from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 获取token
  const isToken = getToken()
  if (isToken) {
    // 如果已登录，请重定向到主页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        console.log(1)
        next()
      } else {
        try {

          // 注意：角色必须是对象数组！ 例如：['admin']或，['developer'，'editor']
          const roles = await store.dispatch('user/getInfo')
          console.log('zzz')

          // 根据角色生成可访问的路线图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // hack方法，以确保addRoutes是完整的
          router.addRoutes(accessRoutes)
          // 设置replace：true，因此导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并进入登录页面重新登录
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
