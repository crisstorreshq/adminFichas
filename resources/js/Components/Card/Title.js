import React, { isValidElement } from 'react'
import { Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    titleStyle: {
        position: 'relative',
    },
}));

const Title = ({ content }) => {
    const classes = useStyles();

    if (!content) return null;

    return isValidElement(content) ? content : <Typography className={ classes.titleStyle }>{content}</Typography>;
}

export default Title




