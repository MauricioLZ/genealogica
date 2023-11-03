import React, { Component } from 'react';
import './Home.css';
import FamilyTree from './Tree';
import { Button, Card, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { loginWithFb } from './FacebookLogin';
import { PersonForm } from './PersonForm';
import { PersonData } from '../data/PersonData';
import { LoginModal } from './LoginModal';

export class Home extends Component 
{
    static displayName = Home.name;

    constructor(props) 
    {
        super(props);
        this.state = { 
            people: [], 
            loading: false,
            formOpen: false,
            loginOpen: false,
            selectedPersonId: 0
        };

        this.modalFormRef = React.createRef();
        this.setUser = this.setUser.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.togglePersonForm = this.togglePersonForm.bind(this);
        this.showPersonForm = this.showPersonForm.bind(this);
        this.hidePersonForm = this.hidePersonForm.bind(this);
        this.registerPerson = this.registerPerson.bind(this);
        this.setPersonToForm = this.setPersonToForm.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.populatePeopleData = this.populatePeopleData.bind(this);
    }

    componentDidMount() 
    {
        this.props.autoLogin().then(dbUser => 
        {
            if (dbUser) 
            {
                this.populatePeopleData(dbUser.treeId)
            }
        }); 
    }

    setUser(user) 
    {
        this.props.setUser(user);
    }

    setPersonToForm(id) 
    {
        this.setState({ selectedPersonId: id })
    }

    toggleLoginModal() 
    {
        this.setState({ loginOpen: (this.props.loginTriggered) ? false : !this.state.loginOpen });

        if (this.props.loginTriggered) 
        {    
            this.props.untriggerLogin();
        }
    }
    
    togglePersonForm()
    {
        this.setState({ formOpen: !this.state.formOpen });
    }
    
    showPersonForm()
    {
        this.setState({ formOpen: true });
    }
    
    hidePersonForm()
    {
        this.setState({ formOpen: false });
    }

    renderPeople(people) 
    {
        let content;
        if (!people || people.length === 0)
        { 
            content = <Card className='firstPerson' onClick={this.togglePersonForm}> 
                <div>
                    <h3 className='firstPersonTitle'>Create Person</h3>
                    <h6 className='firstPersonSubtitle'>Create your tree by adding the family members</h6>
                </div>
            </Card>;
        }
        else
        {
            people.forEach(person => {
                person.birth = person.birth.split('T')[0];
                person.death = person.death.split('T')[0];
                person.mid = (person.mid == 0) ? null : person.mid;
                person.fid = (person.fid == 0) ? null : person.fid;
                person.pid = (person.pid == 0) ? null : person.pid;
                person.pids = (person.pid == 0) ? null : person.pids;
            });

            content = <div>
                <FamilyTree 
                    modalFormRef={this.modalFormRef}
                    showForm={this.showPersonForm}
                    hideForm={this.hidePersonForm} 
                    setPersonToForm={this.setPersonToForm} 
                    nodes={people}/>
                <Button 
                    id='addBtn' 
                    className='addBtn' 
                    color='primary' 
                    type='button' 
                    onClick={() => { 
                        this.setPersonToForm(0); 
                        this.togglePersonForm();
                    }}>
                        +
                    </Button>
            </div>;
        }

        return content;
    }

    renderLogInPrompt() 
    {
        return <div className='loginMsg' onClick={this.toggleLoginModal}>
            <h1>LOG IN</h1>
            <h3>to get started</h3>
        </div>;
    }

    render() 
    {
        let contents;
        
        if (this.props.loading || this.state.loading) contents = <p><em>Loading...</em></p>;
        else if (!this.props.loggedIn) contents = this.renderLogInPrompt();
        else contents = this.renderPeople(this.state.people);

        const personCloseBtn = <Button onClick={this.togglePersonForm} outline>X</Button>;
        const loginCloseBtn = <Button onClick={this.toggleLoginModal} outline>X</Button>;
        const selectedPerson = (this.state.selectedPersonId == 0) ? null : this.state.people.find(p => p.id == this.state.selectedPersonId);
        const modalFormTitle = (this.state.selectedPersonId == 0) ? 'Add person' : 'Edit person';

        return (
            <div>
                {contents}
                <LoginModal 
                    isOpen={this.state.loginOpen || this.props.loginTriggered} 
                    toggle={this.toggleLoginModal} 
                    centered={true} 
                    backdrop={true} 
                    closeBtn={loginCloseBtn} 
                    setUser={this.setUser}
                    populatePeopleData={this.populatePeopleData}/>
                <Modal ref={this.modalFormRef} isOpen={this.state.formOpen} toggle={this.togglePersonForm} centered={true} backdrop={true}>
                    <ModalHeader close={personCloseBtn}>
                        {modalFormTitle}
                    </ModalHeader>
                    <ModalBody>
                        <PersonForm toggleForm={this.togglePersonForm} 
                            relationOptions={this.state.people} 
                            registerPerson={this.registerPerson}
                            updatePerson={this.updatePerson} 
                            selectedPerson={selectedPerson}>
                        </PersonForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    async populatePeopleData(treeId) 
    {
        this.setState({ loading: true });
        const data = await PersonData.getFamily(treeId);
        this.setState({ people: data, loading: false });
    }

    async registerPerson(event)
    {
        event.preventDefault();
        this.setState({ loading: true })

        const person = {
            name: event.target['name'].value,
            gender: event.target['gender'].value,
            img: event.target['treePhoto'].value,
            birth: event.target['birth'].value,
            death: event.target['death'].value,
            mid: event.target['mother'].value,
            fid: event.target['father'].value,
            pid: event.target['partner'].value,
            pids: [event.target['partner'].value]
        };

        const id = await PersonData.addPerson(person, this.props.user.treeId);
        person.id = id;

        let partner = undefined;

        if (person.pid != undefined && person.pid > 0) 
        {
            partner = await this.updatePartner(person);
        }

        let people = [];

        for (let i = 0; i < this.state.people.length; i++) 
        {
            if (partner !== undefined && this.state.people[i].id === partner.id) 
                people.push(partner);
            else 
                people.push(this.state.people[i]);
        }

        console.log(person);
        this.setState({ 
            formOpen: false,
            people: [...people, person],
            loading: false
        });
    }

    async updatePerson(event)
    {
        event.preventDefault();
        this.setState({ loading: true })

        const person = {
            name: event.target['name'].value,
            gender: event.target['gender'].value,
            img: event.target['treePhoto'].value,
            birth: event.target['birth'].value,
            death: event.target['death'].value,
            mid: event.target['mother'].value,
            fid: event.target['father'].value,
            pid: event.target['partner'].value
        };

        person.id = this.state.selectedPersonId;
        await PersonData.updatePerson(person);
        let partner = undefined;
        
        if (person.pid != undefined && person.pid > 0) 
        {
            partner = await this.updatePartner(person);
        }

        let people = [];

        for (let i = 0; i < this.state.people.length; i++) 
        {
            if (this.state.people[i].id === person.id) 
                people.push(person);
            else if (partner !== undefined && this.state.people[i].id === partner.id) 
                people.push(partner);
            else 
                people.push(this.state.people[i]);
        }

        this.setState({ 
            people: people,
            formOpen: false,
            loading: false
        });
    }

    async updatePartner(person) 
    {
        let partner = this.state.people.find(p => p.id == person.pid);
        partner.mid = (partner.mid == null) ? 0 : partner.mid;
        partner.fid = (partner.fid == null) ? 0 : partner.fid;

        if (partner !== null) 
        {
            partner.pid = person.id;
            partner.pids = [person.id];
            await PersonData.updatePerson(partner);
            return partner;
        }
    }
}
