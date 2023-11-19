import { Component } from 'react';

export class PersonData extends Component 
{
    static async getFamily(treeId) 
    {
        const response = await fetch('person/family/' + treeId, { method: 'GET'});
        
        if (response.ok) 
        {
            const data = await response.json();
            return data;
        }
        else 
        {
            return undefined;
        }
    }

    static async addPerson(person, treeId)
    {
        const response = await fetch('person', { 
            method: 'POST', 
            body: JSON.stringify({
                person: person,
                treeId: treeId
            }),
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

        return response;
    }

    static async deletePerson(personId) 
    {
        const response = await fetch('person/' + personId, { 
            method: 'DELETE'
        });

        return response;
    }
}