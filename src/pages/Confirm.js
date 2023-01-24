import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Col, Result, Row } from 'antd'
import dayjs from 'dayjs'
import { confirm as confirmApi } from '../utilities/apis/user'
import Layout from '../components/Layout'

const Confirm = () => {
  const [expired, setExpired] = useState(false)

  const getConfirmation = async () => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('e')) return setExpired(true)
    const expiry = parseInt(params.get('e'))
    const current = dayjs().unix()
  
    if (expiry < current) return setExpired(true)
  
    const response = await confirmApi({
      email: params.get('email')
    })
    console.log(response)
  }

  useEffect(() => {
    getConfirmation()
  }, [])

  return (
    <Layout
      header={false}
      footer={false}
    >
      <main>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Card className="card-login">
              <Result
                status={expired ? 'error' : 'success'}
                title={expired ? 'Link Expired' : 'Email Verified'}
                subTitle={expired ? 'Ohh! seems like your link has been expired' : 'Thank you for verifying your email, this prevent fraud email registrations'}
                extra={[
                  <NavLink key="login" to="/login">{expired ? 'Login again to receive an email' : 'Login to Continue'}</NavLink>
                ]}
              />
            </Card>
          </Col>
          <Col span={6}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Confirm
