import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

generatedRoutes.push({
  path: '/:pathMatch(.*)*',
  redirect: { name: 'Home' }
})

export default setupLayouts(generatedRoutes)
