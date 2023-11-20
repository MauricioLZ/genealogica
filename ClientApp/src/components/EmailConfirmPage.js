import React, { Component } from 'react';
import { UserData } from '../data/UserData';
import { useSearchParams } from "react-router-dom";

export class EmailConfirmPage extends Component 
{
    static displayName = EmailConfirmPage.name;
    searchParams = useSearchParams();

    constructor(props) 
    {
        super(props);
    }

    componentDidMount()
    {
        const email = this.searchParams.get("email");
        const token = this.searchParams.get("token");
        UserData.validateUser(email, token);
    }
}