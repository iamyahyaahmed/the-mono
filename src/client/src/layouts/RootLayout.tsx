import { Outlet, NavLink } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white px-6 py-3 flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-medium text-sm' : 'text-gray-500 text-sm'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-medium text-sm' : 'text-gray-500 text-sm'
          }
        >
          Users
        </NavLink>
      </nav>

      {/* Child routes render here */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}