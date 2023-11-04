import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import './PersonForm.css'

export class PersonForm extends Component 
{
    constructor(props) 
    {
        super(props);
        this.emptyPerson = {name: '', gender: 'Undefined', img: '', birth: '0001-01-01', death: '0001-01-01', mid: 0, fid: 0, pid: 0};
        this.state = { person: this.emptyPerson };
        
        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        this.setState({ 
            person: (this.props.selectedPerson === null) ? this.emptyPerson : this.props.selectedPerson
        });
    }

    changeValue(e) 
    {
        const target = e.target;
        if (target.name === 'name') this.setState({ person: { ...this.state.person, name: target.value }});
        else if (target.name === 'gender') this.setState({ person: { ...this.state.person, gender: target.value }});
        else if (target.name === 'treePhoto') this.setState({ person: { ...this.state.person, img: target.value }});
        else if (target.name === 'birth') this.setState({ person: { ...this.state.person, birth: target.value }});
        else if (target.name === 'death') this.setState({ person: { ...this.state.person, death: target.value }});
        else if (target.name === 'mother') this.setState({ person: { ...this.state.person, mid: parseInt(target.value) }});
        else if (target.name === 'father') this.setState({ person: { ...this.state.person, fid: parseInt(target.value) }});
        else if (target.name === 'partner') this.setState({ person: { ...this.state.person, pid: parseInt(target.value) }});
    }

    onSubmit(event) 
    {
        event.preventDefault(); 

        if (this.state.person.id != undefined && this.state.person.id > 0) 
        {
            this.props.updatePerson(event);
        }
        else 
        {
            this.props.registerPerson(event);
        }
    }

    render()
    {
        return <Form className='personForm' onSubmit={this.onSubmit}>
            <FormGroup row>
                <Label for="name" sm={3}>Name</Label>
                <Col sm={9}>
                    <Input name="name" placeholder="Name" type="text" value={this.state.person.name} onChange={this.changeValue}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="gender" sm={3}>Gender</Label>
                <Col sm={9}>
                    <Input id="gender" name="gender" type="select"  value={this.state.person.gender} onChange={this.changeValue}>
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
                    <Input name="treePhoto" placeholder="Photo link" type="text"  value={this.state.person.img} onChange={this.changeValue}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="birth" sm={3}>Date of birth</Label>
                <Col sm={9}>
                    <Input name="birth" placeholder="Date of birth" type="date"  value={this.state.person.birth} onChange={this.changeValue}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="death" sm={3}>Date of death</Label>
                <Col sm={9}>
                    <Input name="death" placeholder="Date of death" type="date" value={this.state.person.death} onChange={this.changeValue}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="mother" sm={3}>Mother</Label>
                <Col sm={9}>
                    <Input id="mother" name="mother" type="select" value={this.state.person.mid} onChange={this.changeValue}>
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
                    <Input id="father" name="father" type="select" value={this.state.person.fid} onChange={this.changeValue}>
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
                    <Input id="partner" name="partner" type="select" value={this.state.person.pid} onChange={this.changeValue}>
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