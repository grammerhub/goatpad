import React from 'react'
import { usePostContext } from '../../../hooks/usePostContext'
import { useGetCollection } from '../../../hooks/collection/useGetCollection'

import { Stack } from '../../../components/styles/Stack.styled'

import Post from './Post'
import { useEffect } from 'react'

const PostList = () => {
  const { getCollection } = useGetCollection('posts')
  const { posts } = usePostContext()

  useEffect(() => {
    getCollection()
  })

  return (
    <Stack gutter='lg'>
      <h2>PostList</h2>
      {posts && posts.map((post) => <Post postData={post} key={post.id} />)}
    </Stack>
  )
}

export default PostList
