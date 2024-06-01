
import { Grid, Box, Textarea, Button, Divider, Loader } from '@mantine/core';
import React, { useEffect, useState, useReducer, useRef, useContext , useMemo} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStyles from './style.js';
import { baseURL, getHeader, updateLoggedInData, getLoggedInUserDetails } from '../../../Utils/const.js';
import noraPicture from '../../../assets/images/noraPicture.webp'
import logoUrl from '../../../assets/images/companyLogo.png'
import ShowNotification from '../../../Utils/notification.js';
import { Parser } from "html-to-react";
import { QueryContext } from '../.././../App.js';
import { IconSend2 } from '@tabler/icons-react';
function HostPage({ meetingId }) {
    const { classes } = useStyles(useStyles);
    const navigate = useNavigate();
    const { chatId } = useParams();
    const htmlParser = new Parser();
    const initialQuery = useContext(QueryContext);
    const [query, setQuery] = useState(initialQuery);
    const scrollToRef = useRef( null );
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const userDetails = getLoggedInUserDetails();
    const userName = userDetails && Object.keys(userDetails).length > 0  && userDetails.firstName && userDetails.lastName? userDetails.firstName[0] +  userDetails.lastName[0]: 'YOU'
    const [chatDetails, setChatDetails] = useState([
        /**
         * byNora : true,
         * msg:
         */
    ]);
    const formatChatDetails = (chatDetailsNew) => {
        console.log('chatDetailsNew is', chatDetailsNew);
        let container = `<p>`
        chatDetailsNew = chatDetailsNew.split('\n');
        chatDetailsNew.forEach((text, index) => {
            console.log('text is ', text[0]);
            text = text.trim();
            if (text.length != 0) {
                if (text[0] == '*' && text[1] == '*') {
                    text = text.replaceAll('*', '');
                    container += `<br/><strong> ${text} </strong> `
                } else {
                    container += text;
                }
            }
        });
        container += '</p>'
        return container;

    }
    async function doCall() {
        let queryData = query;
        if(!queryData){
            return;
            // set
        }
        setLoading(true);
        let schema =
        {
            "query": queryData,
            "healthInfoChatId": chatId,
            "chatType": "FREE_FORM"
        };
        //{"query":"is MSK painful ?","healthInfoChatId":"3b5222fe-48c9-458b-969f-61e0ca121613","chatType":"FREE_FORM"}
        try {
            const response = await fetch(`${baseURL}/askAIDoctor`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            var result = await response.text();
            let formattedNoraMsg = formatChatDetails(result);
            let chatDetailsNew
            if(chatDetails.length ==0 ){
                chatDetailsNew= [ {
                    byNora: false,
                    msg: `<p> ${initialQuery || queryData}</p>`,
                }, { byNora: true, msg: formattedNoraMsg }];
            } else {
                chatDetailsNew= [...chatDetails,{ byNora: false, msg: `<p> ${queryData}</p>` } , { byNora: true, msg: formattedNoraMsg }];
            }
            console.log('prev ious msg', chatDetails);
           
            setLoading(false);
            //setChatDetails( (prev) => prev.push(chatDetailsNew)
            setChatDetails(chatDetailsNew);
            console.log(chatDetailsNew);
            setQuery('');
        }
        catch (error) {
            ShowNotification('failure', error.message, '')
        }
    }
    const fetchExistingChat = async() =>{
        setLoading(true);
        let schema =
        {
            "operationName": "getHealthInfoChat",
            "variables": {
              "id":chatId
            },
            "query": "query getHealthInfoChat($id: String!) {\n  getHealthInfoChat(id: $id) {\n    id\n    startDate\n    startQuery\n    chats\n    __typename\n  }\n}"
          };
        //{"query":"is MSK painful ?","healthInfoChatId":"3b5222fe-48c9-458b-969f-61e0ca121613","chatType":"FREE_FORM"}
        try {
            const response = await fetch(`${baseURL}/graphql`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            var result = (await response.json()).data.getHealthInfoChat;
            let existingChat = result.chats.map(  (val) =>{
                return {
                    byNora : val.author == 'USER'? false: true,
                    msg: formatChatDetails(val.message)
                }
                 
            })
           
            setLoading(false);
         
            setChatDetails(existingChat);
        }
        catch (error) {
            setLoading(false);
            ShowNotification('failure', `You don't have access to this chat`, '');
            setTimeout(  () => { navigate('/dashboard')}, 1000)
        }
    }
    useEffect(() => {
         (async function (){
            await fetchExistingChat()
            await doCall()
            
         })()
        


    }, [chatId]);
    const askAIDoctor = async () => {
        if(!query) return ;
        console.log('quer is ', query);
        setChatDetails(  (prev) => { return [...prev, {byNora: false,msg: `<p> ${query}</p>`,}]});
        if( scrollToRef.current ) {
            if(chatDetails.length > 2){
                scrollToRef.current.scrollIntoView({ behavior: "smooth"});
            }
        }
         doCall();
    }
    useEffect( () => {
        // If `scrollToRef` points to an element, then scroll it into view.
        if( scrollToRef.current ) {
            if(chatDetails.length > 2){
                scrollToRef.current.scrollIntoView({ behavior: "smooth"});
            }
        }
    }, [chatDetails]);
    // inputRef && inputRef.current && inputRef.current.addEventListener('keydown', (event) => {
    //     if (event.key === 'Enter') {
    //       event.preventDefault(); // prevent default behavior
    //       askAIDoctor();
    //     }
    //   });
    const Chat = chatDetails && chatDetails.length > 0 && chatDetails.map((item, key) => {
        return (
                <Grid.Col span={12} className={item.byNora ? classes.byNoraWrapper : classes.byUserWrapper} key={key+'hash'} ref={ key === chatDetails.length-1 ? scrollToRef : null }>
                    <Box className={item.byNora ? classes.byNoraImage : classes.byUserImage}>
                        {item.byNora ? <img src={noraPicture} width={40} /> : <p> {userName}</p>}
                    </Box>
                    <Box className={item.byNora ? classes.byNora : classes.byUser}>
                        {item.byNora && <h3>Nora </h3>}
                        {htmlParser.parse(item.msg)}
                    </Box>
                    <Divider my="sm" variant='dashed' />
                </Grid.Col>

          
        )
    })
    return (
        <Box className={classes.wrapper}>
           
            <Box className={classes.stickyTop}>   {initialQuery}</Box>
            <Grid className={classes.chatWindow}>
                <Box className={classes.helperText}>
                    <h2>  I’m here to assist you!</h2>
                    <p>

                        Ask your questions. Get instant answers.
                    </p>
                </Box>


                {useMemo ( () => Chat, [chatDetails])}
                { loading && <Loader className={classes.loader} variant="dots" color="primary.0" size="10rem" />}
            </Grid>

            <Grid className={classes.inputText}>
                <Grid.Col span={10} className={classes.textAreaWrapper}>

                    <Textarea ref={inputRef} onKeyDown={ (e) => { if(e.keyCode === 13)  askAIDoctor()}}

                        placeholder="Type your question..."
                        autosize
                        minRows={2}
                        maxRows={4}
                        onChange={(e) => { setQuery(e.target.value) }}
                        value={query}
                       
                    />
                </Grid.Col>
                <Grid.Col span={2} style={{display: 'flex'}}>
                    {loading ? <>
                        <IconSend2 stroke={2} onClick={askAIDoctor} disabled={loading ? 'true' : 'false'} className={classes.onlyMobile}/>
                        <Button color='secondary.0' onClick={askAIDoctor} disabled={loading ? 'true' : 'false'} className={classes.onlyDesktop}>
                            STOP</Button>
                    </> :
                        <>
                            <IconSend2 stroke={2} onClick={askAIDoctor} className={classes.onlyMobile}/>
                            <Button color='secondary.0' onClick={askAIDoctor} className={classes.onlyDesktop}> SEND</Button>
                        </>
                    }

                   
                </Grid.Col>
            </Grid>

        </Box>
    );
}

export default HostPage;
