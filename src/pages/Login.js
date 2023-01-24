import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, message, Row } from 'antd'
import { login } from '../store/auth'
import * as userApis from '../utilities/apis/user'
import Layout from '../components/Layout'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    try {
      const response = await userApis.login(values)
      if (!response.status) throw new Error(response.message)

      dispatch(login(response))
      navigate('/dashboard')
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onForgot = async () => {
    try {
      const email = form.getFieldValue('email')
      if (!email) throw new Error('Enter email then click forgot password')

      const response = await userApis.forgot({ email })
      if (!response.status) throw new Error(response.message)

      messageApi.open({
        type: 'success',
        duration: 5,
        content: 'We have sent you a link to update your password'
      })
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

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
                form={form}
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

              <div>
                <Button onClick={onForgot} type="text">Forgot Password</Button>
              </div>

              <div>
                <NavLink to="/">Don't have an account? Register now!</NavLink>
              </div>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Login
