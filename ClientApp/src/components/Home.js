import React, { Component } from 'react';
import './Home.css';
import FamilyTree from './Tree';
import { Button, Card } from 'reactstrap';
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
            formOpen: false
        };

        this.showPersonForm = this.showPersonForm.bind(this);
        this.hidePersonForm = this.hidePersonForm.bind(this);
        this.registerPerson = this.registerPerson.bind(this);
    }

    componentDidMount() 
    {
        this.populatePeopleData();
        this.setState({ loading: false, loggedIn: true });
    }

    showPersonForm()
    {
        this.setState({ formOpen: true });
    }

    hidePersonForm() 
    {
        this.setState({ formOpen: false });
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
            content = <Card className='firstPerson' onClick={this.showPersonForm}> 
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
                <Button className='addPersonBtn' color='primary' onClick={this.showPersonForm}>+</Button>
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

        return (
            <div>
                {contents}
                { this.state.formOpen && 
                    <PersonForm hideForm={this.hidePersonForm} relationOptions={this.state.people} registerPerson={this.registerPerson}></PersonForm>
                }
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
        
        let partner = this.state.people.find(p => p.id == person.pid);
        console.log(this.state.people);
        console.log(person.pid);
        if (partner !== null) 
        {
            partner.id = person.pid;
            partner.pid = id;
            await PersonData.updatePerson(partner);
        }

        this.setState({ formOpen: false });
    }
}
