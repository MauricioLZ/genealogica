import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import './LoginModal.css'
import { UserData } from '../data/UserData';
import { validate } from 'react-email-validator'
import Cookies from 'js-cookie'

export class LoginModal extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            user: undefined,
            signUp: false,
            success: '',
            error: ''
        };

        this.modalRef = React.createRef();
        this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        this.setState({ 
            signUp: false,
            error: ''
        });
    }

    toggleLoginSignUp() 
    {
        this.setState({ 
            signUp: !this.state.signUp,
            error: ''
        });
    }

    onSubmit(event) 
    {
        event.preventDefault();
        const user = event.target;

        if (this.state.signUp) 
        {
            this.registerUser(user);
        }
        else 
        {
            this.loginUser(user);
        }
    }

    render()
    {
        return <Modal ref={this.modalRef} isOpen={this.props.isOpen} toggle={this.props.toggle} centered={this.props.centered} backdrop={this.props.backdrop}>
            <ModalHeader close={this.props.closeBtn}>
                { this.state.signUp && <p>Sign up</p> }
                { !this.state.signUp && <p>Log in</p> }
            </ModalHeader>
            <ModalBody>       
                <Form className='loginForm' onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input name="email" placeholder="Email" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input name="password" placeholder="Password" type="password"/>
                        </Col>
                    </FormGroup>
                    { this.state.signUp && 
                        <FormGroup row>
                            <Label for="confirmPassword" sm={3}>Confirm password</Label>
                            <Col sm={9}>
                                <Input name="confirmPassword" placeholder="Confirm password" type="password"/>
                            </Col>
                        </FormGroup>
                    }
                    <FormGroup row>
                        <Label className='success' sm={{ offset: 3, size: 9 }}>{this.state.success}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='error' sm={{ offset: 3, size: 9 }}>{this.state.error}</Label>
                    </FormGroup>
                    <FormGroup check row>
                        <Row>
                            { this.state.signUp && 
                                <Col sm={{ offset: 0, size: 8 }}> 
                                    <a className='loginToggle' onClick={this.toggleLoginSignUp}>Already registered? Log in</a> 
                                </Col>
                            }
                            { !this.state.signUp && 
                                <Col sm={{ offset: 0, size: 8 }}> 
                                    <a className='loginToggle' onClick={this.toggleLoginSignUp}>Not registered? Sign up</a> 
                                </Col>
                            }
                            <Col sm={{ size: 4 }}>
                                <Button color='primary' type='submit'>Confirm</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>;
    }

    async registerUser(userForm)
    {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const validEmail = regex.test(userForm['email'].value) && validate(userForm['email'].value);

        if (!validEmail) 
        {
            this.setState({ error: "Invalid email" });
        }
        else if (userForm['password'].value.length < 6) 
        {
            this.setState({ error: "Password must be 6 or more characters" });
        }
        else if (userForm['password'].value === userForm['confirmPassword'].value) 
        {
            const user = {
                username: userForm['email'].value,
                password: userForm['password'].value,
                facebookId: ''
            };

            const id = await UserData.addUser(user);
            if (id > 0) 
            {
                this.setState({ 
                    user: { id: id, username: user.username, password: '' }
                });
                
                this.props.toggle();
                //this.setState({ success: "A validation email has been sent to you" });
            }
            else 
            {
                this.setState({ error: "Email already registered" });
            }
        }
        else 
        {
            this.setState({ error: "Passwords don't match" });
        }
    }

    async loginUser(userForm)
    {
        const user = {
            username: userForm['email'].value,
            password: userForm['password'].value
        };

        const dbUser = await UserData.login(user.username, user.password, 'Email');

        if (dbUser.id > 0) 
        {
            Cookies.set('userSession', dbUser.id, { expires: 30 });
            this.props.setUser(dbUser);

            this.setState({ 
                user: { ...dbUser, password: '' }
            });
    
            this.props.toggle();
            this.props.populatePeopleData();
        }
        else if (dbUser.id === 0) 
        {
            this.setState({ error: 'Email and password don\'t match' });
        }
        else 
        {
            this.setState({ error: 'Invalid email' });
        }
    }
}