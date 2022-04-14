import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLogout } from '../hooks/auth/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavbarContainer = styled.div`
  height: 34px;
  width: 100vw;
  background-color: #ccc;
  margin-top: 0px;
  padding: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

const AppTitle = styled.h1`
  font-size: 20px;
  margin-top: 0px;
`

const NavbarButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <NavbarContainer>
      <Link to='/'>
        <AppTitle>Goatpad</AppTitle>
      </Link>
      <NavbarButtonContainer>
        <Link to='/about'>
          <p>About</p>
        </Link>
        {!user ? (
          <>
            <Link to='/signup'>
              <p>Signup</p>
            </Link>
            <Link to='/login'>
              <p>Login</p>
            </Link>
          </>
        ) : (
          <>
            <Link to='/profile'>
              <p>Profile</p>
            </Link>
            <Link to='/'>
              <p onClick={logout}>Logout</p>
            </Link>
          </>
        )}
      </NavbarButtonContainer>
    </NavbarContainer>
  )
}

export default Navbar
