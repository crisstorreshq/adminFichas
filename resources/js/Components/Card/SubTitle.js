import { Typography } from '@mui/material';
import React, { isValidElement } from 'react'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    subTitleStyle: {
        marginBottom: 0,
        marginTop: 4,
        fontSize: 12,
        color: theme.palette.text.disabled,
        letterSpacing: 0.4,
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const SubTitle = ({ content }) => {
    const classes = useStyles();

    if (!content) return null;

    return isValidElement(content) ? content : <Typography className={ classes.subTitleStyle }>{content}</Typography>;
}

export default SubTitle