import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, message, Row } from 'antd'
import { login } from '../store/auth'
import { login as loginApi } from '../utilities/apis/user'
import Layout from '../components/Layout'

const Forgot = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    try {
      const response = await loginApi(values)
      if (!response.status) throw new Error(response.message)

      dispatch(login(response))
      navigate('/dashboard')
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
    console.log('a');
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
              <h3>Login</h3>
              <Form
                initialValues={{
                  email: 'affanhashmi1@yahoo.com',
                  password: '123'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
              >
                <Form.Item
                  name="email"
                  rules={[{
                    required: true,
                    message: 'Please input your email!'
                  }]}
                >
                  <Input
                    placeholder="Email"
                  />
                </Form.Item>

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
                  >Submit</Button>
                </Form.Item>
              </Form>

              <a href="/">Don't have an account? Register now!</a>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Forgot
