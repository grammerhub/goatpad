import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './formSchema'

import { useLogin } from '../../hooks/auth/useLogin'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const navigate = useNavigate()
  const { error, login } = useLogin()

  async function handleLogin({ email, password }) {
    await login(email, password)

    navigate('/')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          handleLogin(data)
        })}
        className='loginForm'
      >
        <div className='form-group'>
          <input type='email' name='email' {...register('email')} placeholder='Email' />
          <p>{errors.email?.message}</p>
        </div>
        <div className='form-group'>
          <input type='password' name='password' {...register('password')} placeholder='Password' />
          <p>{errors.password?.message}</p>
        </div>
        <div className='form-group'>
          <button type='submit'>Login</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div>
        <p>Don&apos;t have an account yet?</p>
        <Link to='/signup'>Sign Up!</Link>
      </div>
    </>
  )
}

export default Login
