import { useState } from 'react';
import { Group, Code, Button, Text } from '@mantine/core';
import { useStyles } from './style';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import upswingUrl from '../../assets/images/upswing.png'
import connectWithHPUrl from '../../assets/images/connect-with-hp.png'

const data = [
  { link: '', label: 'Home', icon: IconBellRinging },
  { link: '', label: 'Guide Tracker', icon: IconReceipt2 },
  { link: '', label: 'Converstation', icon: IconFingerprint },
];

const RightPannel = ({ }) => {
  const [active, setActive] = useState('Home');
  const { classes } = useStyles(useStyles);
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
       
     
        <Group  justify="center" className={classes.connectWithHP}>
          <Text fz="lg" fw="500" color='text.1'> Connect with a healthcare professional</Text>
          <Button color='primary.0'> Find a specialist</Button>
         
         <Link to='/dashboard'>  <img className={classes.logo} width='100%' src={connectWithHPUrl} alt='nora logo' /> </Link>
       </Group>
       <Group  display="contents" p={10}>
        Provided by
       </Group>
        <Group  justify="space-between" p={10}>
         <Link to='/dashboard'>  <img className={classes.logo} width='100%' src={upswingUrl} alt='nora logo' /> </Link>
       </Group>
      </div>

     
    </nav>
  );
}
export default RightPannel;