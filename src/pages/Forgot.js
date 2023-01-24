import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, message, Row } from 'antd'
import dayjs from 'dayjs'
import { login } from '../store/auth'
import { updatePassword as forgotApi } from '../utilities/apis/user'
import Layout from '../components/Layout'

const Forgot = () => {
  const params = new URLSearchParams(window.location.search)

  const validateExpiry = async () => {
    try {
      if (!params.has('e')) throw new Error('Ohh! seems like your link has been expired')
      const expiry = parseInt(params.get('e'))
      const current = dayjs().unix()

      if (expiry < current) throw new Error('Ohh! seems like your link has been expired')
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 10,
        content: error.message
      })
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    try {
      const response = await forgotApi({
        email: params.get('email'),
        password: values.password
      })
      if (!response.status) throw new Error(response.message)

      navigate('/login')
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    validateExpiry()
  }, [])

  return (
    <Layout
      header={false}
      footer={false}
    >
      {contextHolder}

      <main>
        <Row>
          <Col span={9}></Col>
          <Col span={6}>
            <Card className="card-login">
              <h1>SoftApps</h1>
              <h3>Update Password</h3>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
              >
                <Form.Item
                  name="password"
                  rules={[{
                    required: true,
                    message: 'Please input your password!'
                  }]}
                >
                  <Input.Password
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    htmlType="submit"
                    type="primary"
                  >Update</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Forgot
