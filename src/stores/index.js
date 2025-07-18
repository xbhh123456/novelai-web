import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export * from './modules/auth.js'
export * from './modules/background.js'
export * from './modules/style.js'

export default pinia
