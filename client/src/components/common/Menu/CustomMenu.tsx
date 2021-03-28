import React, { useState } from 'react';
import {
  Menu,
  IconButton,
  IconButtonProps,
  PopoverOrigin,
  TooltipProps,
} from '@material-ui/core';
import { IFunction } from '../../../assets/ts/interfaces';
import BootstrapTooltip from '../BootstrapTooltip';

const ITEM_HEIGHT = 300;

interface MenuProps {
  children: React.ReactElement;
  buttonContent: React.ReactElement;
  menuName: string;
  overrideHeight?: number;
  overrideWidth?: number;
  onClick?: IFunction;
  onClose?: IFunction;
  iconBtnProps?: IconButtonProps;
  anchorOriginOverride?: Partial<PopoverOrigin>;
  transformOriginOverride?: Partial<PopoverOrigin>;
  otherPaperStyles?: React.CSSProperties;
  menuClose?: boolean;
  buttonTooltipText?: string;
  buttonTooltipProps?: Partial<TooltipProps>;
}

const CustomMenu = ({
  children,
  menuName,
  buttonContent,
  overrideWidth,
  overrideHeight,
  onClick,
  onClose,
  iconBtnProps,
  anchorOriginOverride,
  transformOriginOverride,
  otherPaperStyles,
  menuClose,
  buttonTooltipText = '',
  buttonTooltipProps,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (onClick) {
      onClick();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <BootstrapTooltip title={buttonTooltipText} {...buttonTooltipProps}>
        <IconButton
          aria-label='profile'
          aria-controls={`${menuName}-menu`}
          aria-haspopup='true'
          onClick={handleClick}
          {...iconBtnProps}
        >
          {buttonContent}
        </IconButton>
      </BootstrapTooltip>
      <Menu
        id={`${menuName}-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={menuClose ? false : open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: overrideHeight || ITEM_HEIGHT,
            width: overrideWidth || ITEM_HEIGHT,
            ...otherPaperStyles,
          },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          ...anchorOriginOverride,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          ...transformOriginOverride,
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default CustomMenu;
