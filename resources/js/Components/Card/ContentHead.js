import React, { isValidElement } from 'react'
import { makeStyles } from '@mui/styles';
import Title from './Title';
import SubTitle from './SubTitle';

const useStyles = makeStyles(() => ({
    headRoot: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 15,
    },
    headerContent: {
      flex: 1,
    },
}));

const ContentHead = ({ avatar, icon, title, subTitle }) => {
    const classes = useStyles();
    return (
        <div
            className={classes.headRoot}
        >
            {
                avatar && isValidElement(avatar) ? 
                (
                    <div className={ classes.avatar }>{ avatar }</div>
                ) : (
                    icon && <div className={ classes.avatar }>{ icon }</div>
                )
            }
            <div className={classes.headerContent}>
                {
                    title && <Title content={ title }/>
                }

                {
                    subTitle && <SubTitle content={ subTitle }/>
                }
            </div>
        </div>
    )
}

export default ContentHead