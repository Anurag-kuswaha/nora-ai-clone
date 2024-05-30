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
    },
    goButton:{
        minHeight:46,
        color:"white",
        ":hover":{
            backgroundColor: theme.colors.primary[0]
       }

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
        }
    },
    helpText:{
        fontSize:40,
        fontWeight:700,
        color: theme.colors.primary[0]

    }

}));
export default useStyles;