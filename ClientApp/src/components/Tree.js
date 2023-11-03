import React, { Component } from 'react';
import FamilyTree from "@balkangraph/familytree.js";
import TreeNodeView from './TreeNodeView'
import './Tree.css'

export default class Tree extends Component 
{
    constructor(props) 
    {
        super(props);
        this.divRef = React.createRef();
    }

    componentDidMount() 
    {
        FamilyTree.templates.genealogica = Object.assign({}, FamilyTree.templates.tommy);

        let peopleOptions = [{ value: 0, text: 'Undefined' }];
        for (var i = 0; i < this.props.nodes.length; i++) 
        {
            const person = this.props.nodes[i];
            peopleOptions.push({ value: person.id, text: person.name });
        }

        this.family = new FamilyTree (this.divRef.current , {
            template: 'genealogica',
            nodes: this.props.nodes,
            nodeBinding: {
                field_0: 'name',
                field_1: 'birth',
                img_0: 'img'
            }
        });

        this.family.editUI = new TreeNodeView({
            showForm: this.props.showForm,
            hideForm: this.props.hideForm,
            setPersonToForm: this.props.setPersonToForm
        });
    }

    render() 
    {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}