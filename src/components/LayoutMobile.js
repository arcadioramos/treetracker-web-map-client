import Box from '@mui/material/Box';
import { makeStyles } from 'models/makeStyles';
import dynamic from 'next/dynamic';
import React from 'react';

import Navbar from './Navbar';
import log from 'loglevel';
import Drawer from './Drawer';

const App = dynamic(() => import('./App'), { ssr: false });

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
  },
  left: {
    width: '50%',
    height: '100%',
    zIndex: 999,
    background: theme.palette.background.default,
    overflowY: 'auto',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  right: {
    width: '50%',
    zIndex: 998,
    background: 'gray',
    [theme.breakpoints.down('sm')]: {
      width: '0%',
    },
  },
  behind: {},
  above: {},
}));

export default function Layout({ children }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Navbar />
      <Box sx={{ position: 'relative', width: 1, height: 1 }}>
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1 }}
        >
          <App />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          <Drawer>{children}</Drawer>
        </Box>
      </Box>
    </Box>
  );
}
