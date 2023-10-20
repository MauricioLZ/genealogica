import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import './Person.css';

export class Person extends Component {
  static displayName = Person.name;

  render() {
    return (
        <Card className='personCard' color="primary" outline>
            <img alt='Main photo' src={this.props.data.photoLink} />
            <CardBody>
                <CardTitle className='personName' tag="h5">
                    {this.props.data.name} {this.props.data.surname}
                </CardTitle>
                <div className='dates'>
                  <CardSubtitle>{this.props.data.dateOfBirth}</CardSubtitle>
                  {this.props.data.dateOfDeath !== null && 
                    <CardSubtitle>{this.props.data.dateOfDeath}</CardSubtitle>}
                </div>
            </CardBody>
        </Card>
    );
  }
}