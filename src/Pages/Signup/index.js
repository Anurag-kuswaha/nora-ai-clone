
import { Grid, Input, PasswordInput, Button, Box } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import { useForm } from '@mantine/form';
import useStyles from './style';
import { titles } from './properties.js';
import { baseURL, getHeader, updateLoggedInData, appId } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
function Signup() {
    const { classes } = useStyles(useStyles)
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate: {
            name: (value) =>
                value == ''
                    ? 'Name is Required'
                    : null,
            lastName: (value) =>
                        value == ''
                            ? 'Name is Required'
                            : null,
            email: (value) =>
                value == ''
                    ? 'Email is Required'
                    : /^\S+@\S+$/.test(value)
                        ? null
                        : 'Invalid email',
            password: (value) =>
                value == ''
                && 'Password is Required'
        },
    }
    );
    const formSubmitHandler = async () => {
        let userId  = uuidv4().toString();
        let schema = 
        {
            "operationName": "registerHNUser",
            "variables": {
              "email":form.values.email,
              "firstName": form.values.name,
              "lastName": form.values.lastName,
              "profileData": {},
              "password":form.values.password,
              "timezone": "IST",
              "appId": appId,
              "userId": userId
            },
            "query": "mutation registerHNUser($firstName: String, $lastName: String, $profileData: JSON, $timezone: String, $email: String!, $appId: String!, $password: String, $userId: String) {\n  registerHNUser(\n    firstName: $firstName\n    lastName: $lastName\n    profileData: $profileData\n    timezone: $timezone\n    email: $email\n    appId: $appId\n    password: $password\n    userId: $userId\n  ) {\n    id\n    firstName\n    lastName\n    email\n    token\n    profileData\n    createdAt\n    __typename\n  }\n}"
          }      ;
        try {
            const response = await fetch(`${baseURL}/graphql`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            if (response.ok) {
                var result = await response.json();
                if(result.errors){
                    let msg  = result.errors[0].message;
                    console.log(result.errors[0]);
                    ShowNotification('failure', msg, '');
                    return;
                }
                let responsedata  = result.data.registerHNUser
                
                    updateLoggedInData(responsedata);
                    setTimeout(function () { navigate(`/dashboard`) }, 1000);
                    ShowNotification('success', 'Account Registered successfully', '');
               
            } else ShowNotification('failure', 'Some Error Occured', '')
        }
        catch (error) {
            ShowNotification('failure', 'Error fetching data from Backend', '')
        }
    }
    return (
        <Grid className={classes.wrapper}>
            <Grid.Col span={12} sm={6}>
                <Box className={classes.header}> Signup</Box>
                <Box className={classes.form}>
                    <form
                        className={classes.formContainer}
                        onSubmit={form.onSubmit(formSubmitHandler)}
                        name='signupForm' >

                        <Input
                            variant="default"
                            placeholder="Your First Name"
                            radius="xl"
                            size="md"
                            {...form.getInputProps('name')}
                        />
                         <Input
                            variant="default"
                            placeholder="Your LastName"
                            radius="xl"
                            mt="lg"
                            size="md"
                            {...form.getInputProps('lastName')}
                        />
                        <Input
                            icon={<IconAt />}
                            variant="default"
                            mt="lg"
                            placeholder="Your email"
                            radius="xl"
                            size="md"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput

                            placeholder="Password"
                            mt="lg"
                            size="md"
                            variant="default"
                            radius="xl"

                            {...form.getInputProps('password')}
                        />
                        <Button
                            type="submit"
                            mt="xl"
                            radius="xl"
                            ta="right"
                            size="lg"
                            variant="filled"
                            className={classes.actionButton}
                        >
                            {titles.signup}
                        </Button>
                    </form>
                </Box>


            </Grid.Col>
            <Grid.Col span={12} sm={6}>
                <Link to='/login'>
                    <Button
                        type="submit"
                        mt="xl"
                        mb="lg"
                        radius="xl"
                        ta="right"
                        size="lg"
                        variant="filled"
                        className={classes.actionButton}
                    >
                        {titles.login}
                    </Button>
                </Link>
                <FeatureCarousel />

            </Grid.Col>
        </Grid>


    );
}

export default Signup;
