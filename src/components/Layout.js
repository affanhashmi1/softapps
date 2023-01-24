import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import '../style.css'
import * as authReducer from '../store/auth'

const Layout = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.authReducer)

  const onLogout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return

    dispatch(authReducer.logout())
  }

  useEffect(() => {
    if (!user && !['/', '/login', '/confirm', '/forgot'].includes(window.location.pathname)) navigate('/login')
  }, [user])

  const leftItems = [
    { label: 'SoftApps', key: 'index', disabled: true }
  ]
  const rightItems = {
    admin: [
      { label: <NavLink to="/users">Users</NavLink>, key: 'users' },
      { label: <NavLink to="/posts">Posts</NavLink>, key: 'posts' },
      { label: <NavLink onClick={onLogout}>Logout</NavLink>, key: 'logout' },
    ],
    creator: [
      { label: <NavLink to="/posts">Posts</NavLink>, key: 'posts' },
      { label: <NavLink onClick={onLogout}>Logout</NavLink>, key: 'logout' },
    ],
    viewer: [
      { label: <NavLink onClick={onLogout}>Logout</NavLink>, key: 'logout' },
    ],
  }

  return (
    <>
      {
        props.header && <header>
          <Menu items={leftItems} mode="horizontal" className="nav-left" />
          <Menu items={rightItems[props.role]} mode="horizontal" className="nav-right" />
        </header>
      }
      {props.children}
      {
        props.footer && <footer>
          SoftApps &copy; {new Date().getFullYear()}
        </footer>
      }
    </>
  )
}

export default Layout
