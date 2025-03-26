import React, { useState, useEffect } from 'react'
import Routes from '@/Routes'
import { Avatar, Divider, List, Menu, MenuItem, Typography, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import api from '@/api'

const NavListDrawer = () => {

  const [anchorEl, setAnchorEl] = useState(null)
  const [dataUser, setDataUser] = useState(null) // null en vez de objeto vacío
  const open = Boolean(anchorEl)

  const onLogoutClick = async (e) => {
    e.preventDefault()
    try {
      await api.logout()
      // Limpias la cookie
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      window.location.replace('/')
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function stringToColor(string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        width: 56, 
        height: 56,
        my: 2,
        bgcolor: stringToColor(name),
        ml: 2,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      component: "a",
      onClick: handleClick,
    }
  }

  useEffect(() => {
    api.getAuth()
      .then(res => {
        const { Segu_Usr_Nombre, Segu_Usr_ApellidoPaterno, Segu_Usr_ApellidoMaterno } = res.data.usuarios
        setDataUser({
          name: `${Segu_Usr_Nombre} ${Segu_Usr_ApellidoPaterno} ${Segu_Usr_ApellidoMaterno}`,
          unidad: res.data.perfil.unidad.servicio
        })
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Box sx={{ width: 250 }}>
      {dataUser ? (
        <Avatar {...stringAvatar(dataUser.name)} />
      ) : (
        // Skeleton mientras se carga dataUser
        <Skeleton 
          variant="circular"
          width={56} 
          height={56}
          sx={{ m: 2 }} 
        />
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component="a" href='#profile' disabled>Profile</MenuItem>
        <MenuItem onClick={handleClose} component="a" href='#my-account' disabled>My account</MenuItem>
        <MenuItem onClick={onLogoutClick} component="a">Logout</MenuItem>
      </Menu>

      {/* Texto de usuario / unidad */}
      {dataUser ? (
        <>
          <Typography variant="button" display="block" gutterBottom ml={2}>
            {dataUser.name}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom ml={2}>
            {dataUser.unidad}
          </Typography>
        </>
      ) : (
        // Skeletons para texto
        <>
          <Skeleton variant="text" width={120} sx={{ ml: 2 }} />
          <Skeleton variant="text" width={80} sx={{ ml: 2 }} />
        </>
      )}

      <Divider/>
      <Typography variant="caption" display="block" gutterBottom ml={2} mt={2}> 
        Menú 
      </Typography>
      <nav>
        <List>
          <Routes/>
        </List>
      </nav>
    </Box>
  )
}

export default NavListDrawer
