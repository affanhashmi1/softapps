import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, message, Row, Select } from 'antd'
import { createUser } from '../store/user'
import * as userApis from '../utilities/apis/user'
import { roleOptions } from '../utilities/enumerations/constants'
import Layout from '../components/Layout'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    try {
      console.log(values)
      const response = await userApis.createUser(values)
      console.log(response)
      if (!response.status) throw new Error(response.message)

      dispatch(createUser(response.user))
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

  const handleChange = (value) => {
    console.log('selected: ', value)
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
              <h3>Register</h3>
              <Form
                initialValues={{
                  name: 'Rehan',
                  role: 'viewer',
                  email: 'affanhashmi1@yahoo.com',
                  password: '123'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
              >
                <Form.Item
                  name="name"
                  rules={[{
                    required: true,
                    message: 'Please input your name!'
                  }]}
                >
                  <Input
                    placeholder="Name"
                  />
                </Form.Item>

                <Form.Item
                  name="role"
                  rules={[{
                    required: true,
                    message: 'Please select your role!'
                  }]}
                >
                  <Select
                    defaultValue="viewer"
                    onChange={handleChange}
                    options={roleOptions}
                  />
                </Form.Item>

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

              <a href="/login">Already have an account? Login now!</a>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Login
