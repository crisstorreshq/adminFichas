import { PersonAdd, Abc, AccessTimeFilledSharp } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const index = () => {

    const actions = [
        // { id: 0, name: 'Agregar', icon: <PersonAdd/>, url:'/add-ausen' },
        // { id: 1, name: 'Todos', icon: <Abc/>, url:'all' },
        // { id: 2, name: 'Reporte', icon: <AccessTimeFilledSharp/>, url:'report' }
    ]

    const renderItems = () => {
        if(!actions) 
        {
            return(<h5>-</h5>)
        }
        if(actions.length === 0)
        {
            return(<h4 className="my-4">-</h4>)
        }
        if(actions) 
        {
            return(renderMenu())
        }
    }

    const renderMenu = () => {
        return actions.map((data) => (
            <React.Fragment key={data.id}>
                <ListItem disablePadding>
                    <ListItemButton
                        component="a"
                        href={data.url}
                    >
                        <ListItemIcon>{data.icon}</ListItemIcon>
                        <ListItemText primary={data.name}/>
                    </ListItemButton>
                </ListItem>
            </React.Fragment>
            )
        )
    }
    return (
        <>
            { renderItems() }
        </>
    )
}

export default index