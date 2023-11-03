import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { UserData } from './data/UserData';
import Cookies from 'js-cookie';
import './custom.css';

export default class App extends Component 
{
	static displayName = App.name;

	constructor() 
	{
		super();
		this.state = { 
			user: {},
			logginTriggered: false,
            loggedIn: false,
			loading: true
		};
		
		this.triggerLogin = this.triggerLogin.bind(this);
		this.untriggerLogin = this.untriggerLogin.bind(this);
		this.setUser = this.setUser.bind(this);
		this.autoLogin = this.autoLogin.bind(this);
		this.logout = this.logout.bind(this);
	}

	triggerLogin() 
	{
		this.setState({ logginTriggered: true });
	}

	untriggerLogin() 
	{
		this.setState({ logginTriggered: false });
	}

	setUser(user) 
	{
		this.setState({ 
			user: user, 
			loggedIn: true 
		});
	}

	render() {
		return (
		<Layout triggerLogin={this.triggerLogin} user={this.state.user} logout={this.logout}>
			<Routes>
			{ AppRoutes.map((route, index) => {
				const { element, ...rest } = route;
				const elementClone = React.cloneElement(element, {
					user: this.state.user,
					setUser: this.setUser,
					loginTriggered: this.state.logginTriggered,
					untriggerLogin: this.untriggerLogin,
					loading: this.state.loading,
					loggedIn: this.state.loggedIn,
					autoLogin: this.autoLogin
				});
				return <Route key={index} {...rest} element={elementClone} />;
			})}
			</Routes>
		</Layout>
		);
	}

    async autoLogin() 
    {
		let dbUser = undefined;
		const id = Cookies.get('userSession');

		if (id > 0) 
		{
			dbUser = await UserData.login(id, '', 'Cookie');
	
			if (dbUser) 
			{
				this.setUser(dbUser);
			}
		}

		this.setState({ loading: false });

		return dbUser;
    }

	logout() 
	{
		Cookies.remove('userSession');
		this.setState({ 
			user: {},
			loggedIn: false
		})
	}
}
