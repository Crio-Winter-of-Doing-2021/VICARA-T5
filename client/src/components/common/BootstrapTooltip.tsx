import React from 'react';
import { Tooltip, TooltipProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const BootstrapTooltip = (props: TooltipProps) => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
};

export default BootstrapTooltip;
