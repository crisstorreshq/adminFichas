import React from 'react'
import CardContentMUI from '@mui/material/CardContent'

const CardContent = ({ children }) => {
  return (
    <CardContentMUI
        sx={{
            paddingTop: 0,
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
        }}
    >
        { children }
    </CardContentMUI>
  )
}

export default CardContent