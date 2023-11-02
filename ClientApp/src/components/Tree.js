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

    shouldComponentUpdate() 
    {
        return false;
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
            },
            editForm: {
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'Name', binding: 'name' },
                    { type: 'select', label: 'Gender', binding: 'gender', options: [
                        { value: 'Undefined', text: 'Undefined'},
                        { value: 'Female', text: 'Female'},
                        { value: 'Male', text: 'Male'},
                        { value: 'Other', text: 'Other'}] },
                    { type: 'textbox', label: 'Photo', binding: 'img' },
                    [
                        { type: 'date', label: 'Date of birth', binding: 'birth' },
                        { type: 'date', label: 'Date of death', binding: 'death' }
                    ],
                    { type: 'select', label: 'Mother', binding: 'mid', options: peopleOptions },
                    { type: 'select', label: 'Father', binding: 'fid', options: peopleOptions },
                    { type: 'select', label: 'Partner', binding: 'pid', options: peopleOptions }
                ],
                addMore: null,
                addMoreBtn: null,
                saveAndCloseBtn: 'Save',
                buttons: { 
                    edit: {
                        icon: FamilyTree.icon.edit(24,24,'#fff'),
                        text: 'Edit',
                        hideIfEditMode: true,
                        hideIfDetailsMode: false
                    },
                    share: null,
                    pdf: null,
                    remove: null
                }
            }  
        });

        this.family.editUI = new TreeNodeView({
            family: this.family,
            modalFormRef: this.props.modalFormRef,
            toggleForm: this.props.toggleForm,
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