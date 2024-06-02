import { createStyles, rem } from '@mantine/core';
import chatBackground from '../../assets/images/chatBackground.png'

const useStyles = createStyles((theme) => ({
    wrapper:{
        display:'flex',
        height:'100vh',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignContent:'center',
        flexDirection: 'column',
        background: `${theme.colors.background[1]} url("${chatBackground}") no-repeat fixed center !important`,
        '>div':{
            paddingBottom:20
        },
        'input':{
            minHeight:46,
            backgroundColor:theme.colors.background[0],
            ':focus':{
               border: `2px solid ${theme.colors.secondary[0]}`, 
            }
        },
        [theme.fn.smallerThan('sm')]: {
           width:'100%',
           height:'100%',
            overflowY:'scroll',
            paddingTop: 50,
          },
          paddingLeft: 4,
          paddingRight: 4,
    },
    goButton:{
        minHeight:46,
        color:"white",
        ":hover":{
            backgroundColor: theme.colors.primary[0]
       },
      

    },
    hotButton: {
        display: 'flex',
        justifyContent: 'space-evenly',
        'button':{
          
            paddingLeft:5,
            paddingRight:5,
            color:"white",
            ":hover":{
                 backgroundColor: theme.colors.secondary[0]
            }
        },
        [theme.fn.smallerThan('sm')]: {
            flexDirection:'column',
            alignItems: 'center',
            'button':{
          
                marginTop:5,
                marginBottom:5,
                color:"white",
                ":hover":{
                     backgroundColor: theme.colors.secondary[0]
                },
                 minWidth:'30vh',
               
            },

        }
    },
    helpText:{
        fontSize:40,
        fontWeight:700,
        color: theme.colors.primary[0],
        [theme.fn.smallerThan('sm')]: {
          paddingLeft:4,
          paddingRight:4,
          fontSize: 35,
        }

    },
    mobileBottomPanel:{
        [theme.fn.largerThan('sm')]:{
            display:'none'
        },
        marginBottom:'40px !important',
    },
    loader:{
        position:'fixed',
        left:'40vw',
        width: '10rem',
        marginBottom: 60,
        paddingLeft: 60,
        display: 'flow',
        justifyContent: 'center',
        maxWidth: 200,
        alignItems: 'center',
        zIndex:1001,
        [theme.fn.smallerThan('sm')]:{
            left:'10vw',
        },
      },

}));
export default useStyles;