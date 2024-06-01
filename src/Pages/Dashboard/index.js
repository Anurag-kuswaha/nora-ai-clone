
import { Grid, Input, Text, PasswordInput, Button, Loader, Box } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import React, { useEffect, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import useStyles from './style';
import { titles } from './properties.js';
import { baseURL, getHeader, updateLoggedInData, getLoggedInUserDetails } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
import ChatWindow from '../../Components/ChatWindow'
const LeftPannel = lazy(() => import('../../Components/LeftPanel/index.js'));
const RightPannel = lazy(() => import('../../Components/RightPannel'));

function Dashboard() {
    const { classes } = useStyles(useStyles);
    const userDetails = getLoggedInUserDetails();
    const navigate = useNavigate();
    return (
        <>
            <Grid className={classes.wrapper}>
                <Grid.Col span={1} sm={2}  p={0}>
                    <LeftPannel activePage={'Home'}/>
                </Grid.Col>
                <Grid.Col span={12} sm={8} p={0}>
                    <ChatWindow />
                </Grid.Col>
                <Grid.Col span={12} sm={2} p={0} className={classes.RightPanel}>
                    <RightPannel />
                </Grid.Col>
            </Grid>
        </>

    );
}
export default Dashboard;
