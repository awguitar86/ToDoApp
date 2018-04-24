import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTodo, deleteTodo, addTodo, completeTodo, setTodo} from './reducer'


class List extends Component{
    constructor(props){
        super(props)

        this.state = {
            term: '',
            showtodo: false
        }
        this.showtodo = this.showtodo.bind(this)
    }

    componentDidMount(){
        this.props.getTodo()
    }

    handleTerm(str){
        this.setState({
            term: str
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

    setTodo(i){
        this.props.setTodo(this.props.todos[i])
        localStorage.setItem('todo',JSON.stringify(this.props.todos))
    }

    showtodo(){
        this.setState({
            showtodo: !this.state.showtodo
        })
    }


    render(){
        let todocards = "loading"
        this.props.todos ? todocards = this.props.todos.map( (v, i, a) => {
            return (
                <div key={i} className={ v.completed ? "completed-todo-item" : "todo-item"}>
                    <a href={`/#/todoitem/${i}`} ><h3 className="todo-item-title" onClick={() => {this.setTodo(i)}}>{v.title}</h3></a>
                    <div className="todo-complete-delete">
                        {v.completed ? null : <button className="todo-complete-button" onClick={()=> this.completeTodo(v.id)}>{v.completed ? "Completed" : "Complete?"}</button>}
                        <button className="delete-todo" onClick={() => this.deleteTodo(v.id)}>X</button>
                    </div>
                </div>
            )
        }) : "loading";

        console.log(this.props.todos);

        return(
            <div className="body">
                <div className="header">
                    <h1 className={this.state.showtodo ? "title-on" : "title-off"} onClick={ this.showtodo}>To-Do:</h1>
                    <input className="new-todo-input" value={this.state.term} style={{marginLeft: '20px'}} defaltvalue="" onChange={e => {
                                    this.handleTerm(e.target.value);
                                    }} />
                    <button className="add-new-todo" onClick={()=> this.addTodo()}>Add new todo</button>
                </div>
                <div className="todo-items">
                    {todocards}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, {getTodo, deleteTodo, addTodo, completeTodo, setTodo})(List)