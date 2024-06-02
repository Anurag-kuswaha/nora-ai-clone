import { useState, lazy } from 'react';
import { Group, Grid, Divider, Button, Box } from '@mantine/core';
import { useStyles } from './style.js';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import logoUrl from '../../assets/images/companyLogo.png'
import searchIcon from '../../assets/images/searchIcon.svg';
import guideTracker from '../../assets/images/guideTracker.svg'
import conversation from '../../assets/images/conversation.svg'
import settingsUrl from '../../assets/images/settings.svg'
import { getLoggedInUserDetails, handleLogOut } from '../../Utils/const.js';
import { IconArrowLeft } from '@tabler/icons-react';
const data = [
  { link: '/dashboard', label: 'Home', icon: searchIcon, active: true },
  { link: '/dashboard', label: 'Guide Tracker', icon: guideTracker, active: false },
  { link: '/list', label: 'Converstation', icon: conversation, active: false },
];

const LeftPanel = ({ activePage, hideBottomOnMobile, showBackButton }) => {
  const [active, setActive] = useState(activePage);
  const { classes } = useStyles(useStyles);
  const userDetails = getLoggedInUserDetails();
  const navigate = useNavigate();
  console.log('active is ', active);
  const links = data.map((item) => (

    <a
      className={item.label === active ? classes.linkActive : classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {

        setActive(item.label);
        navigate(item.link)
      }}
    >
      <img src={item.icon} style={{ paddingRight: '13px' }} />
      <span>{item.label}</span>
      {/* <Divider my="sm" color='primary.0'/> */}
    </a>


  ));

  return (
    <>

      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">

            <Link to='/dashboard'>  <img className={classes.logo} width='100%' src={logoUrl} alt='nora logo' /> </Link>
          </Group>
          {links}
          <Box>
            {
              !userDetails || Object.keys(userDetails).length == 0 || !userDetails.firstName ?
                <Link to="/signup"><Button mt="xl" color="secondary.0"> Sign up!, it's free</Button> </Link> : <></>
            }
          </Box>
        </div>


        <div className={classes.footer}>
          <Link to={ userDetails && Object.keys(userDetails).length > 0 && userDetails.firstName ? '/about':'/login'} className={classes.link} >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span style={{ paddingLeft: '13px' }}>Settings</span>
          </Link>
          {
            userDetails && Object.keys(userDetails).length > 0 && userDetails.firstName && <a href="#" className={classes.link} onClick={(event) => { handleLogOut(); setTimeout(function () { navigate(`/`) }, 1000) }}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span style={{ paddingLeft: '13px' }}>Logout</span>
            </a>
          }
        </div>
      </nav>
      {/*  mobile version */}
      <Box className={classes.mobileNavbar}>
        {/*  Top Bar */}
        <Grid className={classes.mobileTopBar}>
        {showBackButton && <Grid.Col span={3} className={classes.backButton}>
            <Link to={'/dashboard'} >
              <Box> <IconArrowLeft stroke={2} />Back</Box> </Link>
          </Grid.Col> }
          <Grid.Col span={6} >
            <Link to='/dashboard' style={{ paddingLeft: '10px' }}>  <img className={classes.logo} width='100%' src={logoUrl} alt='nora logo' /> </Link>
          </Grid.Col>
          <Grid.Col span={2}>
          <Link to={ userDetails && Object.keys(userDetails).length > 0 && userDetails.firstName ? '/about':'/login'} >
              <img src={settingsUrl} ></img>
          </Link>
          </Grid.Col>

        </Grid>
        {/*  Bottom Bar */}
        { hideBottomOnMobile === true ? <></>: <Box className={classes.mobileBottomBar}>

          {links}
        </Box>}


      </Box>
    </>
  );
}
export default LeftPanel;