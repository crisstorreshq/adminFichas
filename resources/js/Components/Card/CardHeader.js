import React from 'react'
import { makeStyles } from '@mui/styles';
import ContentHead from './ContentHead';
import DropdownMenu from './DropdownMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

const useStyles = makeStyles(() => ({
  headerRoot: props => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1,
    padding: 24,
    '&.Cmt-separator': {
      ...props.separatorStyles,
      '& + .Cmt-card-content': {
        paddingTop: 24,
      },
    },
    '& + .Cmt-card-content': {
      paddingTop: 0,
    },
  }),
  actionMenuDefault: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    '& .Cmt-action-menu-hover': {
      top: '50%',
    },
  },
}));

const ActionsMenu = ({ actions, actionHandler, icon }) => {
  return (
    <DropdownMenu
      TriggerComponent={<IconButton size="small">{icon || <MoreVertIcon />}</IconButton>}
      items={actions}
      onItemClick={actionHandler}
    />
  );
};

const CardHeader = ({ 
  children, // hijo
  icon, // avatar - icono
  avatar, 
  title, //titulo - subtitulo
  subTitle, 
  actions, //acciones
  actionHandler, 
  actionHandleIcon 
}) => {
    const classes = useStyles();

    const contentHeadProps = {
      icon,
      avatar,
      title,
      subTitle,
    };

    return (
        <div
            className={classes.headerRoot}
        >
            {
              (icon || avatar || title || subTitle) && (
                <ContentHead {...contentHeadProps}/>
              )
            }

            {
              (actions || children) && (
                <div className={classes.actionMenuDefault}>
                  {children}
                  {actions.length > 0 && (
                    <div 
                      sx={{ marginLeft: '8px' }}
                      // className={menuRootClasses}
                    >
                      <ActionsMenu actions={actions} actionHandler={actionHandler} icon={actionHandleIcon} />
                    </div>
                  )}
                </div>
              )
            }
        </div>
    )
}

export default CardHeader