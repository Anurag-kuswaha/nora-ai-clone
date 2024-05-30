
import { Grid, Input, PasswordInput, Button, Box } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { Link , useNavigate} from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import { useForm } from '@mantine/form';
import useStyles from './style';
import { titles } from './properties.js';
import { baseURL, getHeader, updateLoggedInData,appId } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
function Login() {
    const { classes } = useStyles(useStyles);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
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
        const data  = form.validate();
        if(data.hasErrors) return;
        console.log('going to call');
        let schema = 
        {
            "operationName": "signInHNUser",
            "variables": {
              "email": form.values.email,
              "password": form.values.password,
              "appId":appId
            },
            "query": "mutation signInHNUser($email: String!, $password: String, $appId: String!) {\n  signInHNUser(email: $email, password: $password, appId: $appId) {\n    token\n    id\n    email\n    firstName\n    lastName\n    __typename\n  }\n}"
          } ;
        try {
            const response = await fetch(`${baseURL}/graphql`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(schema),
            });
            var result = await response.json();
            if (response.ok) {
                if(result.errors){
                    let msg  = result.errors[0].message;
                    console.log(result.errors[0]);
                    ShowNotification('failure', msg, '');
                    return;
                }
              
                let data = {
                    email: result.email,
                    name: result.name,
                    token: ''
                }
                let responsedata  = result.data.signInHNUser
                
                    updateLoggedInData(responsedata);
                    setTimeout(function () { navigate(`/dashboard`) }, 1000);
                    ShowNotification('success', 'Logged in successfully', '');
              
               
            } else ShowNotification('failure', result.msg, '')
        }
        catch (error) {
            ShowNotification('failure', error.message, '')
        }
    }
    return (
        <Grid className={classes.wrapper}>
            <Grid.Col span={12} sm={6}>
                <Box className={classes.header}> Login</Box>
                <Box className={classes.form}>
                    <form
                        className={classes.formContainer}
                        onSubmit={form.onSubmit(formSubmitHandler)}
                        name='loginForm' >
                        <Input
                            icon={<IconAt />}
                            variant="default"
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
                            onClick={ (e)=>{e.preventDefault(); formSubmitHandler()}}
                        >
                            {titles.login}
                        </Button>
                    </form>
                </Box>


            </Grid.Col>
            <Grid.Col span={12} sm={6}>
                <Link to='/signup'>
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
                        {titles.signup}
                    </Button>
                </Link>
                <FeatureCarousel />

            </Grid.Col>
        </Grid>


    );
}

export default Login;
