import React from "react";

export default class TodosListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderActionSection () {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.editTask.bind(this)}>Save</button>
                    <button className="cancel-btn" onClick={this.setEditState.bind(this, false)}>Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <span><button onClick={this.setEditState.bind(this, true)}>Edit</button>
                <button className="delete-btn" onClick={this.deleteTask.bind(this)}>Delete</button></span>
            </td>
        );
    }

    renderTask () {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            cursor: "pointer"
        };

        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.editTask.bind(this)}>
                        <input ref="task" defaultValue={task} autoFocus />
                    </form>
                </td>
            );
        }

        return (
            <td onClick={this.toggleTask.bind(this)} style={taskStyle}>{task}</td>
        );
    }

    render () {
        const { isCompleted } = this.props;
        return (
            <tr className={"todo-" + (isCompleted ? "completed" : "not-completed") }>
                {this.renderTask()}
                {this.renderActionSection()}
            </tr>
        )
    }

    setEditState (isEditing) {
        this.setState({
            isEditing
        });
    }

    toggleTask () {
        this.props.toggleTask(this.props.id,this.props.isCompleted);
    }

    editTask (e) {
        this.props.editTask(this.props.id, this.refs.task.value,this.props.isCompleted);
        this.setState({
            isEditing: false
        });
        e.preventDefault();
    }

    deleteTask () {
        this.props.deleteTask(this.props.id,this.props.isCompleted);
    }
}
