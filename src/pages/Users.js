import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, message, Row, Space, Table, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import * as userReducer from '../store/user'
import * as userApis from '../utilities/apis/user'
import Layout from '../components/Layout'

const Users = () => {
  const tagColor = {
    pending: 'gold',
    verified: 'green',
    ban: 'red'
  }

  const columns = [
    { title: 'Name', key: 'name', dataIndex: 'name' },
    { align: 'center', title: 'Role', key: 'role', dataIndex: 'role' },
    { title: 'Email', key: 'email', dataIndex: 'email' },
    {
      align: 'center',
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={tagColor[record.status]} key={record._id}>
          {record.status.toUpperCase()}
        </Tag>
      )
    },
    {
      align: 'center',
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => onDelete(record)} type="text">
            <DeleteOutlined />
          </Button>
        </Space>
      )
    },
  ];

  const { user: auth } = useSelector(state => state.authReducer)
  const { user, users } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [dataSource, setDataSource] = useState(users)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const getUsers = async () => {
    try {
      const response = await userApis.getUsers({})
      if (!response.status) throw new Error(response.message)

      dispatch(userReducer.getUsers(response.users))
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  const onDelete = async (record) => {
    try {
      if (!window.confirm('Are you sure you want to delete this user?')) return

      const response = await userApis.deleteUser(record._id)
      if (!response.status) throw new Error(response.message)

      dispatch(userReducer.deleteUser(record._id))
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (!open)
      form.resetFields()
  }, [open])

  useEffect(() => {
    if (!user) return

    setOpen(true)
    form.setFieldValue('id', user._id)
    form.setFieldValue('title', user.title)
    form.setFieldValue('description', user.description)
  }, [user])

  useEffect(() => {
    setDataSource(users)
  }, [users.length])

  return (
    <Layout
      header={true}
      footer={true}
      role={auth?.role}
    >
      {contextHolder}

      <main className="tabular">
        <Row justify="space-between" align="middle">
          <Col>
            <h1>Users</h1>
          </Col>
        </Row>
        <Table bordered dataSource={dataSource} columns={columns} rowKey={record => record._id.toString()} />
      </main>
    </Layout>
  )
}

export default Users
