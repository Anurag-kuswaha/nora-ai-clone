import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({


navbar : {
  height: '10vh',
  width: '100%',
  padding: `0px`,
  margin:0,
  display: `flex`,
  flexDirection: `column`,
  borderRight: `rem(1px) solid ${theme.colors.primary[0]}`,
  backgroundColor: theme.colors.secondary[0]
},

navbarMain :{
  flex: 1
},
connectWithHP:{
  height:400,
  backgroundColor: theme.colors.background[0],
  justifyContent:"center",

}
,
header :{
  paddingBottom: 50,
  marginBottom: 50,
  borderBottom: `rem(1px) solid ${theme.colors.primary[0]}`
},

footer :{
  paddingTop: 'var(--mantine-spacing-md)',
  marginTop: 'var(--mantine-spacing-md)',
  borderTop: 'rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
}
,
link :{
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontSize: 20,
  color: theme.colors.primary[0],
  padding: 20,
  borderRadius: 30,
  fontWeight: 500,

  ':hover' : {
    backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))`,
    color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,

    linkIcon :{
      color: `light-dark(var(--mantine-color-black), var(--mantine-color-white))`,
    }
  }
,
  '&[data-active]': {
   
},
}

// linkIcon :{
//   color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2)),
//   margin-right: var(--mantine-spacing-sm),
//   width: rem(25px),
//   height: rem(25px),
// }

})
)