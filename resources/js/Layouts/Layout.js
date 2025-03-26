import { Box } from '@mui/material'
import React from 'react'
import Navbar from './navbar'

const Layout = ({ children, auth }) => {

  return (
    <>
      <Navbar auth={auth}/>
      <Box 
        sx={theme => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '30px 15px',
          [theme.breakpoints.up('md')]: {
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          [theme.breakpoints.up('lg')]: {
            paddingLeft: "65px",
            paddingRight: "65px",
          },
          [theme.breakpoints.up('xl')]: {
            paddingLeft: "88px",
            paddingRight: "88px",
          },
          [theme.breakpoints.down('sm')]: {
            paddingTop: "20px",
            paddingBottom: "20px",
          },
        })}
      >
        { children }
      </Box>
    </>
  )
}

export default Layout