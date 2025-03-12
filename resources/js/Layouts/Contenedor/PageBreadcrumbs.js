import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'

const PageBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => 
        item.isActive ? 
            <Typography key={index} sx={{ fontSize: "12px" }} color="textPrimary">
                {item.label}
            </Typography> 
            :
            <Typography component="a" key={index} sx={{ fontSize: "12px", display: 'block', color: 'inherit', }} href={item.link}>
                {item.label}
            </Typography>
        )}
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs