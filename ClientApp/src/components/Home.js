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
    }

    static renderPeople(people) 
    {
        return (
            <div>
                { people.length > 0 && 
                    <FamilyTree nodes={[
                        { id: people[0].id, pids: people[0].pid, name: people[0].name, gender: people[0].gender, img: people[0].img, dateOfBirth: people[0].dateOfBirth, dateOfDeath: people[0].dateOfDeath },
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
        const response = await fetch('person');
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
}
