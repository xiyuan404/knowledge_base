
import DefaultTheme from 'vitepress/theme'
import Tags from './components/Tags.vue'
import type { Theme } from 'vitepress'
// @ts-ignore
import { h, watch, onMounted } from 'vue'
import Layout from './Layout.vue'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
// import DateTime from './components/DateTime.vue'

import './rainbow.css'
import './custom.css'
import './overwrite.css'
import 'virtual:group-icons.css'

import '@shikijs/vitepress-twoslash/style.css'



export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout)
  },
  enhanceApp({ app, router }) {
    // app.component('datetime', DateTime)
    app.component('tags', Tags)
    app.use(TwoslashFloatingVue)

    if (typeof window === 'undefined')
      return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/tech_insight/'),
      { immediate: true },
    )
  },

} satisfies Theme


if (typeof window !== 'undefined') {

  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}



/** 
 * homepage rainbow aniamtion
 *  样式动态注入
*/


let homePageStyle: HTMLStyleElement | undefined



function updateHomePageStyle(value: boolean) {

  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root{
      animation: rainbow 12s linear infinite;
      --vp-c-text-1: var(--vp-c-brand-1);
    }


     img[src*="logo.svg"] {
      // color: var(--vp-c-success-3);
      // fill: url(#logo);
      animation: rainbow-svg 12s linear 1s infinite;
     }
    `
    document.body.appendChild(homePageStyle)
    // canvasInject()
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}