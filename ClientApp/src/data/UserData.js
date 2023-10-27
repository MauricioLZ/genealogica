import { Component } from 'react';

export class UserData extends Component 
{
    static async getUser(identifier, password, loginType) 
    {
        const id = this.validate(identifier, password, loginType);

        if (id > 0) 
        {

        }

        const response = await fetch('user', { method: 'GET' });
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

    static async validate(identifier, password, loginType) 
    {
        const response = await fetch('user', { 
            method: 'POST', 
            body: JSON.stringify({
                identifier: identifier, 
                password: password, 
                loginType: loginType
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();

        return data;
    }

    static async addUser(user)
    {
        const response = await fetch('user', { 
            method: 'POST', 
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();

        return data;
    }
}