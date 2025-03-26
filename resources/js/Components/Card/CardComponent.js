import React from 'react'
import { Card } from '@mui/material'

const CardComponent = ({ children }) => {
  return (
    <Card
        sx={{
            position: 'relative',
            '& .Cmt-card-content': {
                position: 'relative',
                zIndex: 1,
            },
            marginTop: '10px',
            marginBottom: '30px'
        }}
    >
        { children }
    </Card>
  )
}

export default CardComponent