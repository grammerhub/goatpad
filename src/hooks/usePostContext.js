import { PostContext } from '../stores/PostContext'
import { useContext } from 'react'

export const usePostContext = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error('usePostContext must be used within an PostContextProvider')
  }

  return context
}
