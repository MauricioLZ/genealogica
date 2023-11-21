import React, { Component } from 'react';
import { UserData } from '../data/UserData';
import withRouter from '../withRouter';

class EmailConfirmPage extends Component 
{
    static displayName = EmailConfirmPage.name;

    componentDidMount()
    {        
        const email = this.props.params.get("email");
        const token = this.props.params.get("token");
        UserData.validateUser(email, token);
    }

    render() 
    {
        return <div>
            <h3>Email has been validated!</h3>
        </div>
    }
}

export default withRouter(EmailConfirmPage);