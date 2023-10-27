import { Component } from 'react';

export class PersonData extends Component 
{
    static async getFamily() 
    {
        const response = await fetch('person', { method: 'GET'});
        const data = await response.json();
        return data;
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