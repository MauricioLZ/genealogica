import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) 
    {
        super(props);
    }

    render() {
		return (
			<div>
			<NavMenu triggerLogin={this.props.triggerLogin} user={this.props.user} />
			<Container tag="main" style={{maxWidth:"100%"}}>
				{this.props.children}
			</Container>
			</div>
		);
    }
}
