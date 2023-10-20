import React, { Component } from 'react';
import { Person } from './Person';
import ReactCanvas from './ReactCanvas';
import './Home.css';

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

    static drawLines(context, people) 
    {
        const links = [];

        for (let i = 0; i < people.length; i++) 
        {
            const person = people[i];

            if (person.partnersById != null) 
            {
                for (let j = 0; j < person.partnersById.length; j++) 
                {
                    if (!links.includes(person.partnersById[j] + '-' + person.id)) 
                    {
                        context.moveTo(0, 0);
                        context.lineTo(350, 120);
                        links.push(person.id + '-' + person.partnersById[j]);
                    }
                }
            }

            if (person.childrenById != null) 
            {
                for (let j = 0; j < person.childrenById.length; j++) 
                {
                    context.moveTo(0, 0);
                    context.lineTo(350, 120);
                    links.push(person.id + '-' + person.partnersById[j]);
                }
            }
        }
    }

    static renderPeople(people) 
    {
        let generations = [];

        for (let i = 0; i < people.length; i++) 
        {
            const gen = people[i].generation;

            if (!generations.includes(gen)) 
            {
                generations.push(gen);
            }
        }

        return (
            <div className='tree'>
                <ReactCanvas className='treeCanvas' drawLines={this.drawLines} people={people}></ReactCanvas>
                { generations.map (gen => {
                    return <div key={gen} className='generation'>
                        { people.filter(p => p.generation === gen).map(person => {
                            //person.photoLink = ;
                            return <Person key={person.id} data={person}></Person>
                        })}
                    </div>
                })}
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

        await window.FB.api('/me?fields=picture', response => 
        {    
            let peopleAlt = this.state.people;
            
            for (let i = 0; i < peopleAlt.length; i++) 
            {
                peopleAlt[i].photoLink = response.picture.data.url;
            }
            this.setState({ people: peopleAlt });
        });
    }
}
