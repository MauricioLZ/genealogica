import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import './LoginModal.css'
import { UserData } from '../data/UserData';

export class LoginModal extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            user: undefined,
            signUp: false,
            error: ''
        };

        this.modalRef = React.createRef();
        this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        
    }

    toggleLoginSignUp() 
    {
        this.setState({ signUp: !this.state.signUp });
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
        if (userForm['password'].value === userForm['confirmPassword'].value) 
        {
            const user = {
                username: userForm['email'].value,
                password: userForm['password'].value,
                facebookId: ''
            };

            const id = await UserData.addUser(user);
            this.setState({ 
                user: { id: id, username: user.username, password: '' }
            });
            this.props.toggle();
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
        this.setState({ 
            user: { ...dbUser, password: '' }
        });

        this.props.toggle();
    }
}