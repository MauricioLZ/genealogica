import { Component } from 'react';

export class PersonData extends Component 
{
    static async getFamily() 
    {
        const response = await fetch('person', { method: 'GET'});
        const data = await response.json();
        return data;

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

    static async addPerson(person)
    {
        const response = await fetch('person', { 
            method: 'POST', 
            body: JSON.stringify(person),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();

        return data;
    }

    static async updatePerson(person)
    {
        const response = await fetch('person', { 
            method: 'PUT', 
            body: JSON.stringify(person),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        console.log(response);
    }
}