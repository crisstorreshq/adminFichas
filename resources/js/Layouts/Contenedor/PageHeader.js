import React from 'react'
import { Box, Typography } from '@mui/material'

const PageHeader = ({ heading, breadcrumbComponent, children }) => {
    return (
        <Box 
            sx={(theme => ({
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up('sm')]: {
                    alignItems: 'center',
                    flexDirection: 'row',
                },
            }))} 
            mb={{ xs: '10px', md: '12px', lg: '16px' }} 
        >
            <Typography 
                component="div" 
                variant="h1"
                sx={theme => ({
                    [theme.breakpoints.down('xs')]: {
                        marginBottom: 10,
                      },
                })}
            >
                { heading }
            </Typography>

            <Box ml={{ sm: 'auto' }}>
                {breadcrumbComponent}
            </Box>

            { children }
        </Box>
  )
}

export default PageHeader