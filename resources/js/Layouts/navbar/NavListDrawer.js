import React, { useState } from 'react'
import Routes from '@/Routes'
import { Avatar, Divider, List, Menu, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import api from '@/api'

const NavListDrawer = ({ auth }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    
    const {Segu_Usr_Nombre, Segu_Usr_ApellidoPaterno, Segu_Usr_ApellidoMaterno} = auth.user.nombre

    const dataUser = {
        name: `${Segu_Usr_Nombre} ${Segu_Usr_ApellidoPaterno} ${Segu_Usr_ApellidoMaterno}`,
        prof: "Desarrollador",
        unidad: auth.user.unidad.servicio
    }

    const onLogoutClick = (e) => {
        e.preventDefault()
        api.logout()
            .then(response => {
                window.location.reload();
                window.location.href = '/login';
            })
            .catch(error => {
                window.location.reload();
                window.location.href = '/login';
            })
            .then(response => {
                window.location.reload();
                window.location.href = '/login';
            })
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    function stringAvatar(name) {
        return {
            sx: {
                    width: 56, 
                    height: 56,
                    my: 2,
                    bgcolor: stringToColor(name),
                    ml: 2
                },
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]
            }`,
            component: "a",
            onClick: handleClick,
        };
    }

    return (
        <Box sx={{ width: 250 }}>
            <Avatar {...stringAvatar(dataUser.name)} />

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

            <Typography variant="button" display="block" gutterBottom ml={2}>{dataUser.name}</Typography>
            <Typography variant="overline" display="block" gutterBottom ml={2}>{dataUser.unidad}</Typography>
            <Divider/>
            <Typography variant="caption" display="block" gutterBottom ml={2} mt={2}> Menú </Typography>
            <nav>
                <List >
                    <Routes auth={auth}/>
                </List>
            </nav>
        </Box>
    )
}

export default NavListDrawer