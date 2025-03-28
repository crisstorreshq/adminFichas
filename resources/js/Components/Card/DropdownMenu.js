import React, { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material';

const DropdownMenu = ({ TriggerComponent, items, onItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const openMenu = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, selectedIndex, event) => {
    event.stopPropagation();
    let updatedItem = { ...item };

    if (item.onClick && typeof item.onClick === 'function') {
      updatedItem = item.onClick(item);
    } else if (onItemClick && typeof onItemClick === 'function') {
      updatedItem = onItemClick(item);
    }

    if (updatedItem) {
      let hasChange = false;
      const newMenuItems = menuItems.map((item, index) => {
        if (selectedIndex === index) {
          hasChange = true;
          item = updatedItem;
        }
        return item;
      });

      if (hasChange) setMenuItems(newMenuItems);
    }

    closeMenu();
  }

  return (
    <>
      <div>
        <TriggerComponent.type {...TriggerComponent.props} onClick={openMenu} />
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} disabled={item.disabled} onClick={event => handleMenuItemClick({ ...item }, index, event)}>
              {item.icon}
              <div 
                sx={{
                  marginLeft: '2px'
                }}
              >{item.label}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  )
}

export default DropdownMenu