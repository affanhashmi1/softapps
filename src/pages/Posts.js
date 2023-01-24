import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Input, message, Modal, Row, Space, Table, Tag, Upload } from 'antd'
import { CheckOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import * as postReducer from '../store/post'
import * as postApis from '../utilities/apis/post'
import Layout from '../components/Layout'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Posts = () => {
  const tagColor = {
    pending: 'gold',
    approved: 'green'
  }

  const columns = [
    { title: 'Thumbnail', key: 'thumbnail', dataIndex: 'thumbnail' },
    { title: 'Title', key: 'title', dataIndex: 'title' },
    { title: 'Description', key: 'description', dataIndex: 'description' },
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
        user?.role === 'creator' &&
        <Space size="middle">
          <Button onClick={() => onEdit(record)} type="text">
            <EditOutlined />
          </Button>
          <Button danger onClick={() => onDelete(record)} type="text">
            <DeleteOutlined />
          </Button>
        </Space>
        ||
        user?.role === 'admin' &&
        <Space size="middle">
          <Button onClick={() => onApprove(record)} type="text">
            <CheckOutlined />
          </Button>
        </Space>
      )
    },
  ]

  const { user } = useSelector(state => state.authReducer)
  const { post, posts } = useSelector(state => state.postReducer)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [dataSource, setDataSource] = useState(posts)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const getPosts = async () => {
    try {
      const response = await postApis.getPosts({})
      if (!response.status) throw new Error(response.message)

      dispatch(postReducer.getPosts(response.posts))
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  const onApprove = async (record) => {
    try {
      if (!window.confirm('Are you sure you want to approve this post?')) return

      const response = await postApis.approvePost(record)
      if (!response.status) throw new Error(response.message)
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  const onEdit = (record) => {
    dispatch(postReducer.editPost(record))
  }

  const onDelete = async (record) => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const response = await postApis.deletePost(record._id)
      if (!response.status) throw new Error(response.message)

      dispatch(postReducer.deletePost(record._id))
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  const onFinish = async (values) => {
    try {
      if (values.id) {
        const response = await postApis.updatePost({
          ...values,
          user: user.id
        })
        if (!response.status) throw new Error(response.message)

        dispatch(postReducer.updatePost(response.post))
      } else {
        const response = await postApis.createPost({
          ...values,
          user: user.id
        })
        if (!response.status) throw new Error(response.message)

        dispatch(postReducer.createPost(response.post))
      }

      form.resetFields()
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

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (!open)
      form.resetFields()
  }, [open])

  useEffect(() => {
    if (!post) return

    setOpen(true)
    form.setFieldValue('id', post._id)
    form.setFieldValue('title', post.title)
    form.setFieldValue('description', post.description)
  }, [post])

  useEffect(() => {
    setDataSource(posts)
  }, [posts])

  return (
    <Layout
      header={true}
      footer={true}
      role={user?.role}
    >
      <Modal footer={false} open={open} title="Post" closable={true} onCancel={() => setOpen(false)}>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            hidden={true}
            name="id"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="id"
          >
            <Upload name="file"
              fileList={false}
              headers={{
                authorization: "authorization-text",
              }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            rules={[{
              required: true,
              message: 'Please input your title!'
            }]}
          >
            <Input
              placeholder="Title"
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{
              required: true,
              message: 'Please input your description!'
            }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Description"
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
      </Modal>

      {contextHolder}

      <main className="tabular">
        <Row justify="space-between" align="middle">
          <Col>
            <h1>Posts</h1>
          </Col>
          <Col>
            <Button onClick={() => setOpen(true)} type="primary">
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
        <Table bordered dataSource={dataSource} columns={columns} rowKey={record => record._id.toString()} />
      </main>
    </Layout >
  )
}

export default Posts
