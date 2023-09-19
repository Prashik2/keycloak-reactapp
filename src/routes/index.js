import React, { Suspense } from 'react'
import { Router, View } from 'react-navi'
import { useKeycloak } from '@react-keycloak/web'
import { mount, route, lazy, map, redirect } from 'navi'

import HomePage from '../pages/Home'
import DashboardPage from '../pages/Dashboard'

import { withAuthentication } from './utils'

// Define your routes
const routes = mount({
  '/dashboard': withAuthentication(
    route({
      title: 'Home',
      view: <DashboardPage />,
    })
  ),
  '/login': map(async (request, context) =>
    context.isAuthenticated
      ? redirect(
          // Redirect to the value of the URL's `redirectTo` parameter. If no
          // redirectTo is specified, default to `/home`.
          request.params.redirectTo
            ? decodeURIComponent(request.params.redirectTo)
            : '/dashboard'
        )
      : lazy(() => import('../pages/Login'))
  ),
  '/': redirect('/login'),
})

export const AppRouter = () => {
  const [keycloak, initialized] = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router
      routes={routes}
      context={{ isAuthenticated: keycloak.authenticated }}
    >
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  )
}
