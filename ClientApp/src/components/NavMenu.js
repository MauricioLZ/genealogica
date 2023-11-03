import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component 
{
    static displayName = NavMenu.name;

    constructor (props) 
    {
        super(props);

        this.state = {
            collapsed: true,
            logoutOpen: false
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggleNavbar () 
    {
        this.setState({ collapsed: !this.state.collapsed });
    }

    toggleLogout() 
    {
        this.setState({ logoutOpen: !this.state.logoutOpen });
    }

    logout() 
    {
        this.setState({ logoutOpen: false });
        this.props.logout();
    }

    render() 
    {
        return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">Genealogica</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                    <NavItem>
                        { this.props.user.username === undefined &&
                            <Button onClick={this.props.triggerLogin}>Login</Button> 
                        }
                        <p id='userMenu' className='username'>{this.props.user.username}</p>
                        { this.props.user.username !== undefined &&
                            <div>
                                <Popover isOpen={this.state.logoutOpen} target='userMenu' toggle={this.toggleLogout} placement='bottom'>
                                    <PopoverBody>
                                        <Button onClick={this.logout}>Sign out</Button>
                                    </PopoverBody>
                                </Popover>
                            </div>
                        }
                    </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
        );
    }
}
