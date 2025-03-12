import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import NavListDrawer from './NavListDrawer'


const Navbar = ({ auth }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AppBar  position='static'>
        <Toolbar>
          <IconButton color="inherit" size='large' onClick={() => setOpen(true)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant='h1'>Título</Typography>
          
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <NavListDrawer auth={auth}/>
      </Drawer>
    </>
  )
}

export default Navbar