import { Box, Text, Input, Button, Grid, Loader } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom'
import { useContext, lazy, useState } from 'react';
import { baseURL, getHeader, updateLoggedInData, appId } from '../../Utils/const.js';
import logoUrl from '../../assets/images/companyLogo.png'
import useStyles from './style';
import { getLoggedInUserDetails } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
import { SetQueryContext } from '../../App.js';
import { QueryContext } from '../../App.js';
const RightPannel = lazy(() => import('../../Components/RightPannel'));
function ChatWindow() {
    const { classes } = useStyles(useStyles);
    const navigate = useNavigate();
    const userDetails = getLoggedInUserDetails();
    const setInputQuery = useContext(SetQueryContext);
    const query = useContext(QueryContext);
    const [loading, setLoading] = useState(false);
    const createChatForm = async (query) => {
        setLoading(true);

        let schema =
        {
            "operationName": "createHealthInfoChat",
            "variables": {
                "type": "FREE_FORM",
                "query": query
            },
            "query": "mutation createHealthInfoChat($type: HealthInfoChatType!, $query: String!) {\n  createHealthInfoChat(type: $type, query: $query) {\n    id\n    startDate\n    startQuery\n    chats\n    __typename\n  }\n}"
        };
        try {
            const response = await fetch(`${baseURL}/graphql`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            var result = await response.json();
            if (response.ok) {
                setLoading(false);
                if (result.errors) {
                    let msg = result.errors[0].message;
                    console.log(result.errors[0]);
                    ShowNotification('failure', msg, '');
                    return;
                }

                let responsedata = result.data.createHealthInfoChat;
                let chatId =  responsedata.id

                setInputQuery(responsedata.startQuery);
                setTimeout(function () { navigate(`/chat/${chatId}`) }, 500);

            } else { ShowNotification('failure', result.msg, ''); setLoading(false); }
        }
        catch (error) {
            // ShowNotification('failure', error.message, '')
            setLoading(false);
        }
    }
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }


    const guestUserHandler = async () => {
        const newId = makeid(6);
        setLoading(true);
        let schema =
        {
            "operationName": "registerHNUser",
            "variables": {
                "email": `${newId}@noemail.com`,
                "firstName": "",
                "lastName": "",
                "profileData": {
                    "isGuest": true
                },
                "password": newId,
                "timezone": "IST",
                "appId": appId
            },
            "query": "mutation registerHNUser($firstName: String, $lastName: String, $profileData: JSON, $timezone: String, $email: String!, $appId: String!, $password: String, $userId: String) {\n  registerHNUser(\n    firstName: $firstName\n    lastName: $lastName\n    profileData: $profileData\n    timezone: $timezone\n    email: $email\n    appId: $appId\n    password: $password\n    userId: $userId\n  ) {\n    id\n    firstName\n    lastName\n    email\n    token\n    profileData\n    createdAt\n    __typename\n  }\n}"
        };
        try {
            const response = await fetch(`${baseURL}/graphql`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            var result = await response.json();
            if (response.ok) {
                if (result.errors) {
                    setLoading(false);
                    let msg = result.errors[0].message;
                    console.log(result.errors[0]);
                    ShowNotification('failure', msg, '');

                    return;
                }

                if (result.errors) {
                    let msg = result.errors[0].message;
                    console.log(result.errors[0]);
                    ShowNotification('failure', msg, '');
                    return;
                }
                let responsedata = result.data.registerHNUser

                updateLoggedInData(responsedata);
                createChatForm(query);

            } else { ShowNotification('failure', result.msg, ''); setLoading(false); }
        }
        catch (error) {
            ShowNotification('failure', error.message, '');
            setLoading(false);
        }
    }
    const handleChatBasedOnUser = async (query) => {
        console.log('userDetails is ', userDetails);
        if (!userDetails || Object.keys(userDetails).length == 0) {
            await guestUserHandler();
        }
        await createChatForm(query);
    }

    return (
        <Box className={classes.wrapper}>
            <Box>
                <Link to='/dashboard'>  <img className={classes.logo} width='250px' src={logoUrl} alt='nora logo' /> </Link>
            </Box>
            <Box >
                <Text className={classes.helpText}>{userDetails && Object.keys(userDetails).length > 0 && userDetails.firstName ? `Welcome ${userDetails.firstName},` : ''}  How can I help you today?</Text>
            </Box>
            {loading && <Loader className={classes.loader} variant="dots" color="primary.0" size="10rem" />}
            <Grid m={0}>
                <Grid.Col span={9} sm={10}>
                    <Input

                        placeholder="Describe your pain..."
                        onChange={(e) => setInputQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleChatBasedOnUser(query) }}

                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button variant="light" color="primary.0" className={classes.goButton} onClick={() => handleChatBasedOnUser(query)}>Go</Button>
                </Grid.Col>
            </Grid>
            <Text fz="xs">Nora does not provide medical advice, diagnosis, or treatment. <br />
                <Text td="underline">See additional information.</Text></Text>
            <Box>LOOKING FOR</Box>
            <Box className={classes.hotButton}>

                <Button variant="light" color="secondary.0" onClick={() => { handleChatBasedOnUser('Home care guide') }}>🏠 Home care guide</Button>
                <Button variant="light" color="secondary.0" onClick={() => handleChatBasedOnUser('Treatment options')}>👩🏻‍⚕️ Treatment options</Button>
                <Button variant="light" color="secondary.0" onClick={() => handleChatBasedOnUser('Your symptoms')}>🤒 Your symptoms</Button>
            </Box>
            <Box className={classes.mobileBottomPanel}>
                <RightPannel />
            </Box>

        </Box>
    );
}
export default ChatWindow;