import { Box, Slide } from '@mui/material'
import React from 'react'
import PageBreadcrumbs from './PageBreadcrumbs'
import PageHeader from './PageHeader'

const PageContainer = ({ checked= true, heading, breadcrumbs, children }) => {
  return (
    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <Box sx={{ width: '100%' }}>
            {(heading || breadcrumbs) && (
                <PageHeader heading={heading} breadcrumbComponent={breadcrumbs && <PageBreadcrumbs items={breadcrumbs} />} />
            )}
            {children}
        </Box>
    </Slide>
  )
}

export default PageContainer