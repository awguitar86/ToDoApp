import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTasks, deleteTask, addTask, completeTask, setTodo} from './reducer'


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
        this.props.getTasks()
    }

    handleTerm(str){
        this.setState({
            term: str
        })
    }

    deleteTask(i){
        this.props.deleteTask(i);
    }

    addTask(){
        if(this.state.term){
        this.props.addTask(this.state.term)
        this.setState({
            term: ""
        })
        }
    }

    completeTask(i){
        this.props.completeTask(i);
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
                <div key={i} className={ v.completed ? "clistitem" : "listitem"}>
                    <a href={`/#/task/${i}`} ><h2 className="ltitle" onClick={() => {this.setTodo(i)}}>{v.title}</h2></a>
                    <div className="lleft">
                        {v.completed ? null : <button className="lbutton" onClick={()=> this.completeTask(v.id)}>{v.completed ? "Completed" : "Complete?"}</button>}
                        <button className="lx" onClick={() => this.deleteTask(v.id)}>X</button>
                    </div>
                </div>
            )
        }) : "loading";

        console.log(this.props.todos);

        return(
            <div className="papa">
                <div className="header">
                    <h1 className={this.state.showtodo ? "htitle" : "nohtitle"} onClick={ this.showtodo}>TO-DO:</h1>
                    <input className="hinput" value={this.state.term} style={{marginLeft: '20px'}} defaltvalue="" onChange={e => {
                                    this.handleTerm(e.target.value);
                                    }} />
                    <button className="hbutton" onClick={()=> this.addTask()}>Add new task</button>
                </div>
                <div className="listholder">
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

export default connect(mapStateToProps, {getTasks, deleteTask, addTask, completeTask, setTodo})(List)