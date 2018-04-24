import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTodo, deleteTodo, addTodo, completeTodo, editTodo} from './reducer'


class TodoItem extends Component{
    constructor(props){
        super(props)

        this.state = {
            todo: {}
        }
    }

    componentDidMount(){
        var cat =  JSON.parse(localStorage.getItem("todo"));
        console.log(cat);
        this.setState({
            todo: cat[this.props.match.params.id]
        })
    }

    handleTitle(str){
        let todo = this.state.todo;
        todo.title = str
        this.setState({
            todo: todo
        })
    }

    handleDescription(str){
        let todo = this.state.todo;
        todo.description = str
        this.setState({
            todo: todo
        })
    }

    deleteTodo(i){
        this.props.deleteTodo(i);
    }

    addTodo(){
        if(this.state.term){
        this.props.addTodo(this.state.term)
        this.setState({
            term: ""
        })
        }
    }

    completeTodo(i){
        this.props.completeTodo(i);
    }

    editTodo(){
        this.props.editTodo(this.state.todo.id, this.state.todo.title, this.state.todo.description)
    }


    render(){
        //{this.props.match.params.id}
        return(
            <div className="todo-body">
                <div className='todo-wrap'>
                    <button><a href="/#/">Back to main page</a></button>
                    <div className="top">
                            <h3 className="todo-title">Title:</h3>
                            <input className="todo-title-input" value={this.state.todo.title} onChange={e => {this.handleTitle(e.target.value)}} />
                            {this.state.todo.completed ? null : <button onClick={()=> this.completeTodo(this.state.todo.id)} >Completed?</button>}
                    </div>
                    <div className="description">
                        <h3 className="todo-description">Description:</h3>
                        <input className="todo-description-input" value={this.state.todo.description} onChange={e => {this.handleDescription(e.target.value)}}/>
                    </div>
                    <div className="buttons">
                        <a href="/#/"><button className="save"  onClick={()=> this.editTodo()}>Save</button></a>
                        <a href="/#/"><button className="cancel">Cancel</button></a>
                        <a href="/#/"><button className="delete"  onClick={() => this.deleteTodo(this.state.todo.id)}>Delete</button></a>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        todos: state.todos,
        todo: state.todo
    }
}

export default connect(mapStateToProps, {getTodo, deleteTodo, addTodo, completeTodo, editTodo})(TodoItem)