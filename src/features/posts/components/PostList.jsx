import React from 'react'
import { useCollection } from '../../../hooks/useCollection'

import { Stack } from '../../../components/styles/Stack.styled'

import Post from './Post'

const PostList = () => {
  const { documents } = useCollection('posts', null, ['timestamp', 'desc'])

  return (
    <Stack gutter='lg'>
      <h2>Posts List</h2>
      {documents && documents.map((post) => <Post postData={post} key={post.id} />)}
    </Stack>
  )
}

export default PostList
