import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import Admin from '../components/Admin'
import Creator from '../components/Creator'
import Viewer from '../components/Viewer'

const Dashboard = () => {
  const { user } = useSelector(state => state.authReducer)

  return (
    <Layout
      header={true}
      footer={true}
      role={user?.role}
    >
      <main>
        {user?.role === 'admin' && <Admin />}
        {user?.role === 'creator' && <Creator />}
        {user?.role === 'viewer' && <Viewer />}
      </main>
    </Layout>
  )
}

export default Dashboard
