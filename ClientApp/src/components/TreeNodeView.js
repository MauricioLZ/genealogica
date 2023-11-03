export default class TreeNodeView 
{
    constructor (props) 
    {
        this.props = props;
    };
    
    show = function (nodeId) 
    {
        this.nodeId = nodeId;
        this.props.setPersonToForm(nodeId);
        this.props.showForm();
    
        // var node = this.family.get(nodeId);
        // this.nameInput.value = node.name;
        // this.titleInput.value = node.title;
    };
    
    hide = function (showldUpdateTheNode) 
    {
        this.props.hideForm();
    };
}