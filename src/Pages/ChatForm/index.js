

import { Grid, Input, Text, PasswordInput, Button, Loader, Box } from '@mantine/core';
 import React, { useEffect, useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom'
 import useStyles from './style';
import { baseURL, getHeader, updateLoggedInData, getLoggedInUserDetails } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
import UserChatWindow from './UserChatWindow'
const LeftPannel = lazy(() => import('../../Components/LeftPanel/index.js'));
function ChatForm() {
     const { classes } = useStyles(useStyles);
    const userDetails = getLoggedInUserDetails();
    const navigate = useNavigate();
    return (
        <>
            <Grid className={classes.wrapper}>
                <Grid.Col span={1} sm={2}  p={0}>
                    <LeftPannel activePage={'Converstation'} hideBottomOnMobile={true} showBackButton={true}/>
                </Grid.Col>
                <Grid.Col span={12} sm={10} p={0}>
                    <UserChatWindow />
                </Grid.Col>
               
            </Grid>
        </>

    );
}

export default ChatForm;
