import React, { Component } from 'react';
import FamilyTree from "@balkangraph/familytree.js";
import './Tree.css'

export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        FamilyTree.templates.genealogica = Object.assign({}, FamilyTree.templates.tommy);

        this.family = new FamilyTree (this.divRef.current , {
            template: 'genealogica',
            nodes: this.props.nodes,
            nodeBinding: {
                field_0: 'name',
                field_1: 'birth',
                img_0: 'img'
            }
        });
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}