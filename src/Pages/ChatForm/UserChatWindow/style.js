import { createStyles} from '@mantine/core';
import chatBackground from '../../../assets/images/chatBackground.png'
const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    backgroundSize: 'cover',
    position: 'relative',
    margin: 0,
    padding: 0,
    background: `${theme.colors.background[1]} url("${chatBackground}") no-repeat fixed center !important`,
    overflowY:'hidden',
    [theme.fn.smallerThan('sm')]: {
      paddingTop:'100px',
      // marginBottom:40,
    },
  },
  chatWindow:{
    height: "85vh",
    width: "100%",
    backgroundSize: 'cover',
    position: 'relative',
    overflowY: 'scroll',
    padding: 0,
    margin: 0,
    marginTop:'30 px !important',
    

  },
  byNora:{
    backgroundColor: theme.colors.background[5],
    borderRadius: '5px 30px 30px 5px',
    alignItems: 'center',
    width:'80%',
    minHeight:100,
    'h3':{
      paddingLeft: 10,
      textAlign:'left',

    },
    'p':{
      textAlign: 'left',
      lineHeight:'1.7',
      fontWeight:'400',
      padding: 10,
      animationName: 'noraTextAnimation',
      animationDuration: '1s',
    },
    
    [theme.fn.smallerThan('sm')]: {
      width:'95%',
    },

  },
  byNoraWrapper:{
    paddingLeft: 60,
    position:'relative'
  },
  byUserWrapper :{
    display:'flex',
    justifyContent:'end',
    paddingRight: 60,
    position:'relative',
    alignItems: 'flex-start',
  },
  byNoraImage:{
    position: 'absolute',
    top: 6,
    left:10,
    'img':{
      borderRadius: '46%',
    }
    
  },
  byUserImage:{
    position: 'absolute',
    top: 0,
    right:10,
    'p':{
      padding:0,
      margin:0,
      justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
      width:40,
      height:40,
      borderRadius: '46%',
      backgroundColor:theme.colors.primary[0],
      color:'white'
    }
    
  },

  byUser :{
    borderRadius: '30px 5px 5px 30px',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'end',
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: theme.colors.background[5],
    width:'80%',
    'p':{
      textAlign: 'left',
      lineHeight:'1.7',
      fontWeight:'400',
      padding: 10
    },
    [theme.fn.smallerThan('sm')]: {
      width:'95%',
    },

  },
  inputText:{
    
    margin:0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position:'fixed',
     bottom:0,
     width:'85vw',
    minHeight:100,
    backgroundColor:'white',
    boxShadow:`rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px`
    ,
    '.mantine-Textarea-root':{
      paddingTop: 15,
      // width:'90%',
    },
    'textarea:focus':{
      border: `2px solid ${theme.colors.secondary[0]}`, 
   },
   
   [theme.fn.smallerThan('sm')]: {
     width: "100vw",
     'textarea':{
      width: "80vw",
   },
   'mantine-Textarea-wrapper':{
    width: "80vw",
   },
   '.mantine-Textarea-root' :{
    width: "80vw",
   }

  },

  },
  stickyTop:{
    paddingTop:0,
    minHeight:50,
    fontWeight:500,
    fontSize:20,
    color: theme.colors.primary[0]

  },
  helperText:{
    width:'100%',
    display:'block',
    justifyContent: 'center',
    alignItems:'center',


  },
  textAreaWrapper:{
    width:'70vw',

  },
  loader:{
    width: '10rem',
    marginBottom: 60,
    paddingLeft: 60,
    display: 'flow',
    justifyContent: 'center',
    maxWidth: 200,
    alignItems: 'center',
  },

  iconWrapper: {
    background: 'grey',
  },
  hostCamera: {
    border: '2px dashed white'
  },
  handRaised:{
    width:50,
    height:50,
    position:'absolute',
    top:'20%',
    right:'30%',
  },
  onlyMobile:{
    [theme.fn.largerThan('sm')]:{
      display: 'none',
    }
  },
  onlyDesktop:{
    [theme.fn.smallerThan('sm')]:{
      display: 'none',
    }
  }
}));
export default useStyles;