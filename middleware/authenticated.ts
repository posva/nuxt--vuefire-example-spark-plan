/**
 * Middleware to redirect to login page if user is not authenticated.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  if (!user) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
