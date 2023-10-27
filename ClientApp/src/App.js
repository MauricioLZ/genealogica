import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
	static displayName = App.name;

	constructor() 
	{
		super();
		this.state = { logginTriggered: false };
		
		this.triggerLogin = this.triggerLogin.bind(this);
		this.untriggerLogin = this.untriggerLogin.bind(this);
	}

	triggerLogin() 
	{
		this.setState({ logginTriggered: true });
	}

	untriggerLogin() 
	{
		this.setState({ logginTriggered: false });
	}

	render() {
		return (
		<Layout triggerLogin={this.triggerLogin}>
			<Routes>
			{AppRoutes.map((route, index) => {
				const { element, ...rest } = route;
				const elementClone = React.cloneElement(element, {
					loginTriggered: this.state.logginTriggered,
					untriggerLogin: this.untriggerLogin,
				});
				return <Route key={index} {...rest} element={elementClone} />;
			})}
			</Routes>
		</Layout>
		);
	}
}
