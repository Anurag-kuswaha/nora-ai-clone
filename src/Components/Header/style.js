import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({


navbar : {
  height: rem(800),
  width: '100%',
  padding: `0px`,
  paddingTop: `40px`,
  display: `flex`,
  flexDirection: `column`,
  borderRight: `rem(1px) solid ${theme.colors.primary[0]}`,
  backgroundColor: 'rgb(29,94,109, 0.2)'
},

navbarMain :{
  flex: 1
},

header :{
  padding:10,
  paddingBottom: 50,
  marginBottom: 50,
  borderBottom: `rem(1px) solid ${theme.colors.primary[0]}`
},

footer :{
position :'absolute',
 bottom:0,
  paddingTop:0,
  marginTop: 0,
  borderTop: 'rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
}
,
link :{
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontSize: 20,
  color: theme.colors.secondary[0],
  padding: 20,
 
  fontWeight: 500,
 


  ':hover' : {
    backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))`,
    color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,

    linkIcon :{
      color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,
    }
  }
,
},
linkActive :{
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontSize: 20,
  color: theme.colors.secondary[0],
  backgroundColor: theme.colors.primary[0],
  padding: 20,
  fontWeight: 500,
}

// linkIcon :{
//   color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2)),
//   margin-right: var(--mantine-spacing-sm),
//   width: rem(25px),
//   height: rem(25px),
// }

})
)