import React, { Component } from 'react';
import './Home.css';
import FamilyTree from './Tree';
import { Button, Card, Modal, ModalBody, ModalHeader, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { login } from './FacebookLogin';
import { PersonForm } from './PersonForm';
import { PersonData } from '../data/PersonData';

export class Home extends Component 
{
    static displayName = Home.name;

    constructor(props) 
    {
        super(props);
        this.state = { 
            people: [], 
            loading: true, 
            loggedIn: false,
            formOpen: false,
            popoverOpen: false
        };

        this.togglePersonForm = this.togglePersonForm.bind(this);
        this.togglePopover = this.togglePopover.bind(this);
        this.registerPerson = this.registerPerson.bind(this);
    }

    componentDidMount() 
    {
        this.populatePeopleData();
        this.setState({ loading: false, loggedIn: true });
    }
    
    togglePersonForm()
    {
        this.setState({ formOpen: !this.state.formOpen });
    }
    
    togglePopover()
    {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    renderPeople(people) 
    {
        people.forEach(person => {
            person.birth = person.birth.split('T')[0];
            person.death = person.death.split('T')[0];
        });

        let content;
        if (people.length === 0)
        { 
            content = <Card className='firstPerson' onClick={this.togglePersonForm}> 
                <div>
                    <h3 className='firstPersonTitle'>Create Person</h3>
                    <h6 className='firstPersonSubtitle'>Create your tree by adding the family members</h6>
                </div>
            </Card>;
        }
        else
        {
            content = <div>
                <FamilyTree nodes={[
                    { id: people[0].id, pids: people[0].pid, name: people[0].name, gender: people[0].gender, img: people[0].img, birth: people[0].birth, death: people[0].death },
                    ...people]}
                />
                <Button id='addBtn' className='addBtn' color='primary' type='button'>+</Button>
                <Popover isOpen={this.state.popoverOpen} placement='left' target="addBtn" toggle={this.togglePopover}>
                    <PopoverBody>
                        <Button className='newPersonBtn' color='primary' outline type='button' onClick={() => {this.togglePersonForm(); this.togglePopover();}}>New person</Button>
                        <Button className='linkPersonBtn' color='primary' outline type='button' onClick={() => {this.togglePopover();}}>Link person</Button>
                    </PopoverBody>
                </Popover>
            </div>;
        }

        return content;
    }

    renderLogInPrompt() 
    {
        return <div className='loginMsg' onClick={login}>
            <h1>LOG IN</h1>
            <h3>to get started</h3>
        </div>;
    }

    render() 
    {
        let contents;
        
        if (this.state.loading) 
        {
            <p><em>Loading...</em></p>
        }
        else if (!this.state.loggedIn) 
        {
            contents = this.renderLogInPrompt();
        }
        else 
        {
            contents = this.renderPeople(this.state.people);
        }

        const closeBtn = <Button onClick={this.togglePersonForm} outline>X</Button>;

        return (
            <div>
                {contents}
                <Modal isOpen={this.state.formOpen} toggle={this.togglePersonForm} centered={true} backdrop={true}>
                    <ModalHeader close={closeBtn}>Add person</ModalHeader>
                    <ModalBody>
                        <PersonForm toggleForm={this.togglePersonForm} relationOptions={this.state.people} registerPerson={this.registerPerson}></PersonForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    async populatePeopleData() 
    {
        const data = await PersonData.getFamily();
        this.setState({ people: data, loading: false });
    }

    async registerPerson(event)
    {
        event.preventDefault();

        const person = {
            name: event.target['name'].value,
            gender: event.target['gender'].value,
            img: event.target['treePhoto'].value,
            birth: event.target['birth'].value,
            death: event.target['death'].value,
            mid: event.target['mother'].value,
            fid: event.target['father'].value,
            pid: event.target['partner'].value
        };

        const id = await PersonData.addPerson(person);
        
        if (person.pid !== 0) 
        {
            let partner = this.state.people.find(p => p.id == person.pid);
    
            if (partner !== null) 
            {
                partner.id = person.pid;
                partner.pid = id;
                await PersonData.updatePerson(partner);
            }
        }

        this.setState({ formOpen: false });
    }
}
