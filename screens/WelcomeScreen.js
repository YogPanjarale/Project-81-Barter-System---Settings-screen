import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal
} from 'react-native';
import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../config'
// import { TextInput, } from 'react-native-paper';
// import { Icon } from 'react-native-elements'

import MyTextInput from '../components/MyTextInput'
import styles from "../Styles";

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_email: 'test@abc.com',
            input_password: '123456',
            isSignUp: false,
            // sign up stuff
            input_firstName: '',
            input_lastName: '',
            input_mobileNumber: '',
            input_address: '',
            input_userName: '',
            input_confirmPassword: '',
        };
    }
    LogIn = async (email, password) => {
        console.log(this.state, email, password);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                //this.props.navigation.navigate('Drawer')
                this.props.navigation.navigate('Home')
                 //alert('Logged In', response)
                 return response
            })
            .catch((error) => {
                var errorcode = error.code;
                var errormessege = error.message;
                console.log(error)
                return alert(errormessege)
            })
    }
    SignUp = async()=>{

        var email = this.state.input_email
        var password =this.state.input_password
        db.collection('users').add({
            firstName:this.state.input_firstName,
            lastName:this.state.input_lastName,
            Contact:this.state.input_mobileNumber,
            Address:this.state.input_address,
            userName:this.state.input_userName,
            email_id:this.state.input_email
        })
        firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(()=>{
                            console.log('Signed Up')
                            this.props.navigation.navigate('Home')
                        })
                        .catch((error)=>{
                            var errorType= error.code;
                            var errorMessage=error.message;
                            alert(errorMessage)
                        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isSignUp?null:
                <Image source={require('../assets/splashhome.svg')} style={styles.HomeImage} />
                }
                

                <Text style={styles.HomeHeading}>
                    Barter App
                  </Text>
                {this.state.isSignUp ? <this.SignUpModal /> : <this.LogInModal/>}
                <TouchableOpacity onPress={this.state.isSignUp?()=>{this.setState({isSignUp:false})}:()=>{this.setState({isSignUp:true})}}>
                    <Text style={styles.ModalText}>
                        {this.state.isSignUp?"Already Have an Account? LogIn ":" Don't Hane an Account? SignUp "}
                    </Text>
                </TouchableOpacity>
                    
            </View>
        );
    }

    /*
    1. FIRST Name
    2. Last Name
    3. Mobile Number
    4. Address
    5. UserName
    6. Password
    7. Confirm Password 
    */
    SignUpModal = () => (
        <Modal style={styles.Modal}
        animationType="slide"
        
        >
            <TextField
                id=" Input first name"
                label="First Name"
                defaultValue={this.state.input_firstName}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_firstName: value });
                }}
            />
            <TextField 
                id = "Input Last Name"
                label = "Last Name"
                defaultValue={this.state.input_lastName}
                onChange={event=>{
                    const { value}= event.target;
                    this.setState({ input_lastName:value})
                }}
            />
            <TextField 
                id = "Input Mobile"
                label = "Mobile Number"
                defaultValue={this.state.input_mobileNumber}
                onChange={event=>{
                    const { value}= event.target;
                    this.setState({ input_mobileNumber:value})
                }}
            />
            <TextField 
                id = "Input Address"
                label = "Address"
                defaultValue={this.state.input_address}
                onChange={event=>{
                    const { value}= event.target;
                    this.setState({ input_address:value})
                }}
                multiline
            />
            <TextField 
                id = "Input UserName"
                label = "UserName"
                defaultValue={this.state.input_userName}
                onChange={event=>{
                    const { value}= event.target;
                    this.setState({ input_userName:value})
                }}
            />
            <TextField
                id="email Input"
                label="Email"
                defaultValue={this.state.input_email}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_email: value });
                }}
            />
            <TextField
                id="password input"
                label="Password"
                defaultValue={this.state.input_password}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_password: value });
                }}
                type='password'
            />
              <TextField
                id="confirm password input"
                label="Confirm Password"
                defaultValue={this.state.input_confirmPassword}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_confirmPassword: value });
                }}
                error={this.state.input_confirmPassword!=this.state.input_password}
                helperText={this.state.input_confirmPassword!=this.state.input_password?"Passwords don't match":""}
                type='password'
            />
            <TouchableOpacity style={styles.button}
            disabled={this.state.input_confirmPassword!=this.state.input_password}
            onPress={this.SignUp}
            >
                <Text style={styles.buttonText}>
                    Sign Up
                    </Text>
            </TouchableOpacity>

        </Modal>
    )
    LogInModal = () => (
        <Modal 
        style={styles.Modal}
        animationType='slide'
        >

            <TextField
                id="email Input"
                label="Email"
                defaultValue={this.state.input_email}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_email: value });
                }}
            />
            <TextField
                id="password input"
                label="Password"
                defaultValue={this.state.input_password}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ input_password: value });
                }}
                type='password'
            />
            <View style={{ marginVertical: 10 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { this.LogIn(this.state.input_email, this.state.input_password) }}
                >
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default WelcomeScreen;
