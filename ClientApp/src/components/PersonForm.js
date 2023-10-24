import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, FormText, Button } from 'reactstrap';
import './PersonForm.css'

export class PersonForm extends Component 
{
    constructor(props) 
    {
        super(props);
    }

    render()
    {
        return <Form className='personForm' onSubmit={this.props.registerPerson}>
            <FormGroup row>
                <Label for="name" sm={3}>Name</Label>
                <Col sm={9}>
                    <Input name="name" placeholder="Name" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="gender" sm={3}>Gender</Label>
                <Col sm={9}>
                    <Input id="gender" name="gender" type="select">
                        <option>Undefined</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="treePhoto" sm={3}>Photo</Label>
                <Col sm={9}>
                    <Input name="treePhoto" placeholder="Photo link" type="text"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="birth" sm={3}>Date of birth</Label>
                <Col sm={9}>
                    <Input name="birth" placeholder="Date of birth" type="date"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="death" sm={3}>Date of death</Label>
                <Col sm={9}>
                    <Input name="death" placeholder="Date of death" type="date"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="mother" sm={3}>Mother</Label>
                <Col sm={9}>
                    <Input id="mother" name="mother" type="select">
                        <option value={0}>Undefined</option>
                        { this.props.relationOptions.map(person => {
                            const optionName = this.personOptionName(person, this.props.relationOptions);
                            return <option key={person.id} value={person.id}>{optionName}</option>
                        })}
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="father" sm={3}>Father</Label>
                <Col sm={9}>
                    <Input id="father" name="father" type="select">
                        <option value={0}>Undefined</option>
                        { this.props.relationOptions.map(person => {
                            const optionName = this.personOptionName(person, this.props.relationOptions);
                            return <option key={person.id} value={person.id}>{optionName}</option>
                        })}
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="partner" sm={3}>Partner</Label>
                <Col sm={9}>
                    <Input id="partner" name="partner" type="select">
                        <option value={0}>Undefined</option>
                        { this.props.relationOptions.map(person => {
                            const optionName = this.personOptionName(person, this.props.relationOptions);
                            return <option key={person.id} value={person.id}>{optionName}</option>
                        })}
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup check row>
                <Col sm={{ offset: 8, size: 4 }}>
                    <Button color='primary' type='submit'>Confirm</Button>
                </Col>
            </FormGroup>
        </Form>;
    }

    personOptionName(person, people) 
    {
        if (people.find(p => p.name === person.name && p.id !== person.id))
            return person.name + " (" + person.birth + ")";
        else 
            return person.name;
    }
}