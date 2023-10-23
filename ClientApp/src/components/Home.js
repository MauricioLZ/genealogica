import React, { Component } from 'react';
import './Home.css';
import FamilyTree from './Tree';

export class Home extends Component 
{
    static displayName = Home.name;

    constructor(props) 
    {
        super(props);
        this.state = { people: [], loading: true };
    }

    componentDidMount() 
    {
        this.populatePeopleData();
        this.registerPerson();
    }

    static renderPeople(people) 
    {
        people.forEach(person => {
            person.birth = person.birth.split('T')[0];
            person.death = person.death.split('T')[0];
        });

        return (
            <div>
                { people.length > 0 && 
                    <FamilyTree nodes={[
                        { id: people[0].id, pids: people[0].pid, name: people[0].name, gender: people[0].gender, img: people[0].img, birth: people[0].birth, death: people[0].death },
                        ...people]} />
                }
            </div>);
    }

    render() 
    {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderPeople(this.state.people);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populatePeopleData() 
    {
        const response = await fetch('person', { method: 'GET'});
        const data = await response.json();
        this.setState({ people: data, loading: false });

        // await window.FB.api('/me?fields=picture', response => 
        // {    
        //     let peopleAlt = this.state.people;
            
        //     for (let i = 0; i < peopleAlt.length; i++) 
        //     {
        //         peopleAlt[i].photoLink = response.picture.data.url;
        //     }
        //     this.setState({ people: peopleAlt });
        // });
    }

    async registerPerson() 
    {
        const person = {
            name: 'Rita Laudron Gutierres',
            gender: 'Female',
            img: '',
            birth: '2001-07-10',
            death: '0001-01-01',
            pid: 0,
            mid: 11,
            fid: 12
        };

        // const response = await fetch('person', { 
        //     method: 'POST', 
        //     body: JSON.stringify(person),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // });
        // console.log(response);
    }
}
