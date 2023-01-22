import { AutoComplete, Button, Card, Col, Empty, Form, List, Input, Modal, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.authReducer)
  const [visible, setVisible] = useState(false)
  const [customers, setCustomers] = useState([])
  const [options, setOptions] = useState([])
  const [orders, setOrders] = useState([])
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleOk = () => {
    sessionStorage.setItem('customer', JSON.stringify(form.getFieldsValue()))
    setVisible(false)
    navigate(`/order`)
  }
  const onSearch = async (searchText) => {
    try {
      if (searchText.length < 3) return

      const query = new URLSearchParams()
      query.append('mobile', searchText)
      const response = []
      if (!response.status) throw new Error(response.message)
      if (response.customers && response.customers.length === 0) throw new Error(response.message)

      setCustomers(response.customers)
      setOptions(response.customers.map((customer) => ({
        label: customer.mobile,
        value: customer.mobile
      })))
    } catch (error) {
      form.resetFields(['address'])
      setCustomers([])
      setOptions([])
    }
  }
  const onSelect = (data) => {
    const index = customers.findIndex(option => option.mobile === data)
    if (index === -1) return

    form.setFieldsValue({
      address: customers[index].address
    })
  }

  const handleContinue = () => {
    sessionStorage.setItem('customer', JSON.stringify(form.getFieldsValue()))
    navigate(`/order`)
  }

  useEffect(() => {
    if (!user) navigate('/')
  }, [])

  return (
    <Layout
      header={true}
      footer={true}
    >
      <Modal
        centered={true}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
        open={visible}
        title="Find or Create Customer"
      >
      </Modal>

      <main>
        <Row className="dashboard" gutter={20}>
          <Col span={4}></Col>
          <Col span={8}>
            <Card title="Find or Create Customer">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Mobile #"
                  name="mobile"
                >
                  <AutoComplete
                    options={options}
                    onSelect={onSelect}
                    onSearch={onSearch}
                  />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <List
              bordered={true}
              dataSource={orders}
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Type mobile # for customer order history" /> }}
              renderItem={(item) => (
                <List.Item>
                  <p>{item.ship_datetime}</p>
                  <p>{item.customer.mobile}</p>
                  <p>{item.customer.address}</p>
                </List.Item>
              )}
              size="large"
            />

            <Button
              onClick={handleContinue}
              size="large"
              type="primary"
            >Continue</Button>
          </Col>
          <Col span={4}></Col>
        </Row>
      </main>
    </Layout>
  )
}

export default Dashboard
