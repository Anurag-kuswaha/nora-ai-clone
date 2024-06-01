import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({


  navbar: {
    height: rem(800),
    width: '100%',
    padding: `0px`,
    paddingTop: `40px`,
    display: `flex`,
    flexDirection: `column`,
    borderRight: `rem(1px) solid ${theme.colors.primary[0]}`,
    backgroundColor: 'rgb(29,94,109, 0.2)',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  navbarMain: {
    flex: 1
  },

  header: {
    padding: 10,
    paddingBottom: 50,
    marginBottom: 50,
    borderBottom: `rem(1px) solid ${theme.colors.primary[0]}`
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 0,
    marginTop: 0,
    borderTop: 'rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
  }
  ,
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: 20,
    color: theme.colors.secondary[0],
    padding: 20,

    fontWeight: 500,



    ':hover': {
      backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))`,
      color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,

      linkIcon: {
        color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,
      }
    }
    ,
  },
  linkActive: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: 20,
    color: theme.colors.secondary[0],
    backgroundColor: theme.colors.primary[0],
    padding: 20,
    fontWeight: 500,
  },
  mobileNavbar: {
    display:'block',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
   
  },
  mobileTopBar:{
    display:'flex',
    backgroundColor:'#E1F4F5',
    justifyContent: 'space-between',
    position:'fixed',
    top:'0px',
    left:0,
    padding:5,
    paddingTop:25,
    boxShadow:`rgba(0, 0, 0, 0.1) 0px 1px 1px 0px,rgba(0, 0, 0, 0.04) 0px 1px 1px 0px,rgba(0, 0, 0, 0.02) 0px 1px 2px 0px`,
    zIndex:1001,
    
  },
  mobileBottomBar:{
    display:'flex',
    backgroundColor:'#E1F4F5',
    justifyContent: 'space-between',
    position:'fixed',
    width:'100vw',
    bottom:0,
    left:0,
    padding:0,
    // paddingBottom:25,
    boxShadow:`rgba(0, 0, 0, 0.1) 0px 1px 1px 0px,rgba(0, 0, 0, 0.04) 0px 1px 1px 0px,rgba(0, 0, 0, 0.02) 0px 1px 2px 0px`
    ,
    zIndex:1001,
    'span':{
      display:'block',
      fontSize:14,
    },
    'a':{
      display: 'block',
      width:'33.33%',
      padding:10,

    },
  },
  backButton:{
    [theme.fn.largerThan('sm')]:{
        display: 'none',
    },
    'a':{
      textDecoration: 'none',
    },
    'div':{
      display: 'flex',
      fontSize:20,
      fontWeight:800,
      color: theme.colors.primary[0]
    }
   
  }
})
)