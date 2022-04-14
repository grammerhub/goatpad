// get and subscribe to all documents in collection 'c'
import { useState, useEffect } from 'react'
import { db } from '../../config/firebase.ts'
import { collection, onSnapshot } from 'firebase/firestore'
import { usePostContext } from '../usePostContext'

export const useGetCollection = (c) => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = usePostContext()

  const getCollection = async () => {
    setError(null)
    setIsPending(true)

    try {
      const res = await collection(db, c)

      if (!res) {
        throw new Error('Could not get collection')
      }

      onSnapshot(res, async (snapshot) => {
        let results = []
        await snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        dispatch({ type: 'SET_COLLECTION', payload: results })
      })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, getCollection }
}
