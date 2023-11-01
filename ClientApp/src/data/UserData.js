import { Component } from 'react';

export class UserData extends Component 
{
    static async login(identifier, password, loginType) 
    {
        const loginObject = {
            identifier: identifier, 
            password: password, 
            loginType: loginType
        }

        const response = await fetch('user/login', { 
            method: 'POST', 
            body: JSON.stringify(loginObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();

        return data;
    }

    static async addUser(user)
    {
        const response = await fetch('user/registration', { 
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