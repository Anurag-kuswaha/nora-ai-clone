
import { Grid, Button, Box } from '@mantine/core';
import React, { lazy, useRef } from 'react';
import { Link } from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import useStyles from './style';
import { getUserType } from '../../Utils/const.js';
const Header = lazy(() => import('../../Components/LeftPanel/index.js'));
function AboutPage() {
    const { classes } = useStyles(useStyles);
    const userType = useRef(getUserType());
    return (
        <>
            {userType && userType.current == 'Host' && <Header />}
            <Grid className={classes.wrapper}>
                <Grid.Col span={12} sm={6}>
                    <Box className={classes.header}> About </Box>
                    <Box className={classes.text}> This is Clone app of <a href="https://norahealth.ai/" target="_blank" >Nora Health AI</a> </Box>
                    <Box className={classes.header2}> Designed by Anurag Kushwaha </Box>
                    <Link to="https://www.anuragkushwaha.me/" className={classes.text}><Box  >
                        About Me : My Name is Anurag Kushwaha, I am software Engineer with 3 years of industry experience
                    </Box> </Link>
                    <Grid className={classes.left}>
                        <Grid.Col span={12}>
                            <Link to={'https://www.anuragkushwaha.me/'}>
                                <Button
                                    type="submit"
                                    mt="xl"
                                    mb="lg"
                                    radius="xl"
                                    ta="right"
                                    size="lg"
                                    variant="filled"
                                    className={classes.actionButton}>
                                    About Me
                                </Button>
                            </Link>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Link to={'/dashboard'}>
                                <Button
                                    type="submit"
                                    mt="xl"
                                    mb="lg"
                                    radius="xl"
                                    ta="right"
                                    size="lg"
                                    variant="filled"
                                    className={classes.actionButton}>
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <FeatureCarousel />
                </Grid.Col>
            </Grid>
        </>
    );
}
export default AboutPage;
