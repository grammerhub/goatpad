import React from 'react'

import { useCollection } from '../../../hooks/collection/useCollection'

import { Stack } from '../../../components/styles/Stack.styled'

import Post from './Post'

const PostList = () => {
  const { documents: posts } = useCollection('posts')

  return (
    <Stack gutter='lg'>
      <h2>PostList</h2>
      {posts && posts.map((post) => <Post postData={post} key={post.id} />)}
    </Stack>
  )
}

export default PostList
