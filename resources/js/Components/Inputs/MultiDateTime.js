import React from 'react'

import { FieldArray } from 'formik'
import { Fab, Grid, Paper, Tooltip, Typography } from '@mui/material'
import { AddBox, Clear } from '@mui/icons-material'
import DateTimeWrap from '@/Components/Inputs/DateTimeWrap'

const MultiDateTime = ({titulo, id, valor}) => {
    return (
        <>
            <Grid item /*xs={6}*/ md={6}>
                <Grid container spacing={4}>
                    <Paper 
                        sx={{
                            width: "100%",
                            p: 2,
                            m: 4,
                            background: '#EEEEEE'
                        }}
                        elevation={3} 
                    >
                        <Typography variant="h6" gutterBottom>
                            {titulo}
                        </Typography>
                        <FieldArray name={id}>
                        {({ insert, remove, push }) => (
                            <Grid container spacing={3}>
                            { valor.length > 0 &&
                                valor.map((presta, index) => (
                                <Grid item /*xs={12} sm={6} md={6} lg={4} xl={3}*/ xs={3} key={index}>
                                    <Grid item>
                                        <DateTimeWrap
                                            id={id}
                                            label={titulo}
                                            name={`${id}.${index}`}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Tooltip title="Eliminar" aria-label="delete">
                                                <Fab 
                                                    color="secondary" 
                                                    onClick={() => remove(index)}
                                                    size='small'
                                                >
                                                    <Clear size='small'/> 
                                                </Fab>
                                            </Tooltip>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid item xs={12} >
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Tooltip title="Agregar" aria-label="add">
                                        <Fab color="primary" onClick={() => push('')} size='small'>
                                            <AddBox size='small'/>
                                        </Fab>
                                    </Tooltip>
                                </div>
                            </Grid>
                            </Grid>
                        )}
                        </FieldArray>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default MultiDateTime