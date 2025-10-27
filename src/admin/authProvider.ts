import { AuthProvider } from 'react-admin'

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    // Since we're already authenticated via NextAuth, just resolve
    return Promise.resolve()
  },

  logout: () => {
    // Don't handle logout here - let NextAuth handle it
    return Promise.resolve()
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject()
    }
    return Promise.resolve()
  },

  checkAuth: () => {
    // Always resolve since we handle auth at the NextAuth level
    return Promise.resolve()
  },

  getPermissions: () => {
    // Return admin permissions since we're already verified at the page level
    return Promise.resolve('ADMIN')
  },

  getIdentity: () => {
    // Get user info from session or return a default identity
    return Promise.resolve({
      id: 'admin',
      fullName: 'Admin User',
      avatar: '',
    })
  },
}

export { authProvider }