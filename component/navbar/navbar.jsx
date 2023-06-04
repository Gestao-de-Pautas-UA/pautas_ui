import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  zIndex: theme.zIndex.drawer + 1,
  paddingTop: theme.spacing(1),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavBar() {
  const {t, i18n} = useTranslation();
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#0EB4BD', height: '80px' }}>
        <Toolbar>
        <IconButton
          color={open ? "black" : "inherit"}
          aria-label="open drawer"
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, mx: 2, ...(open && close) }}
        >
        <MenuIcon />
        </IconButton>
          <img src="/logo.png" className="App-logo"  />
          <Typography sx={{fontSize: '1.75rem', fontWeight: '200', marginLeft: '60px'}} className='paco' >
            paco
          </Typography>
          <div style={{position:"fixed" , right:"30px" , display:"flex", justifyContent:"flex-end"}}>
            <Button sx={{color:"white" ,fontSize:"17px",
            '&:hover': {
            color: 'black', // Set the desired hover color here
          },
        }} onClick={() => {
          i18n.changeLanguage(t("languageOP"));
          }}>{t("language")}</Button>
        </div> 
        </Toolbar>        
      </AppBar>
      <Drawer
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#292929', 
            
            
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        color="#000"
        
        
      >
        <DrawerHeader style={{ background: '#0EB4BD' }}> 
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />  }
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
        
          {['Gestão de pautas'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{paddingLeft: '0px'}}>
                <ListItemIcon  sx={{minWidth: '3.5px', height: '18px', background: '#0EB4BD', marginRight: '20px', paddingBottom: '2px' }}>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography style={{ textAlign: 'left', color: '#FFFFFF', fontWeight: '600' }}>
                      {text}
                    </Typography>
                    
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}