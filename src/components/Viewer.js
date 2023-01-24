import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Col, message, Row } from 'antd'
import { getPosts as postsApi } from '../utilities/apis/post'

const Viewer = () => {
  const { user } = useSelector(state => state.authReducer)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await postsApi({})
      setPosts(response.posts)
    } catch (error) {
      messageApi.open({
        type: 'error',
        duration: 5,
        content: error.message
      })
    }
  }

  useEffect(() => {
    if (!user) navigate('/login')

    getPosts()
  }, [])

  return (
    <Row className="dashboard" gutter={20}>
      {contextHolder}

      {posts.map((post) => {
        return (<Col key={post._id} span={8}>
          <Card key={post._id} title={post.title}>
            {post.description}
          </Card>
        </Col>)
      })}
    </Row>
  )
}

export default Viewer
