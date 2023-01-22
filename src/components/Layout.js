import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import '../style.css'

const leftItems = [
  { label: 'Phonics', key: 'index' }
]
const rightItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: <NavLink to="/dispatch">Dispatch</NavLink>, key: 'dispatch' },
  {
    label: 'Customer',
    key: 'customer',
    children: [{
      label: 'Create',
      key: 'create-customer'
    }, {
      label: 'List',
      key: 'read-customers'
    }]
  },
  {
    label: 'Product',
    key: 'product',
    children: [{
      label: 'Categories',
      key: 'read-categories'
    }, {
      label: 'Create',
      key: 'create-product'
    }, {
      label: 'List',
      key: 'read-products'
    }, {
      label: 'Deals',
      key: 'read-deals'
    }]
  },
  { label: 'Orders', key: 'orders' },
  { label: 'Drivers', key: 'drivers' },
  { label: 'Logout', key: 'logout' }
]

const Layout = (props) => {
  return (
    <>
      {
        props.header && <header>
          <Menu items={leftItems} mode="horizontal" className="nav-left" />
          <Menu items={rightItems} mode="horizontal" className="nav-right" />
        </header>
      }
      {props.children}
      {
        props.footer && <footer>
          Phonics &copy; {new Date().getFullYear()}
        </footer>
      }
    </>
  )
}

export default Layout
