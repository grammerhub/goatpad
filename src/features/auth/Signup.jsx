import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from './formSchema'
import { useSignup } from '../../hooks/auth/useSignup'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      password2: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  const navigate = useNavigate()
  const { error, signup } = useSignup()

  async function handleSignUp({ displayName, email, password }) {
    await signup(email, password, displayName)

    navigate('/')
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          handleSignUp(data)
        })}
        className='signUpForm'
      >
        <div className='form-group'>
          <label htmlFor='displayName'>Username</label>
          <input type='text' name='displayName' {...register('displayName')} placeholder='Username' />
          <p>{errors.displayName?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' {...register('email')} placeholder='Email' />
          <p>{errors.email?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' {...register('password')} placeholder='Password' />
          <p>{errors.password?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='password' name='password2' {...register('password2')} placeholder='Confirm Password' />
          <p>{errors.password2?.message}</p>
        </div>
        <div className='form-group'>
          <button type='submit'>Register</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div>
        <p>Already have an account?</p>
        <Link to='/login'>Login!</Link>
      </div>
    </>
  )
}

export default Signup
