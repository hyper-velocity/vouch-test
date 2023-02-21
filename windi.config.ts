import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: {
    prefix: 'wnd'
  },
  theme: {
    extend: {
      colors: {
        primary: '#357AE3',
        negative: '#E91E63',
        warning: '#F8C080',
        positive: '#21BA45',

        mild: 'var(--q-mild)',
        shadow: 'var(--q-shadow)'
      }
    }
  },
  shortcuts: {
  },
  plugins: [
    require('windicss/plugin/line-clamp')
  ]
})
