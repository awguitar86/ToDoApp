import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTasks, deleteTask, addTask, completeTask, editTask} from './reducer'


class Details extends Component{
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

    handleTermTitle(str){
        let task = this.state.todo;
        task.title = str
        this.setState({
            todo: task
        })
    }

    handleTermDes(str){
        let task = this.state.todo;
        task.description = str
        this.setState({
            todo: task
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

    editTask(){
        this.props.editTask(this.state.todo.id, this.state.todo.title, this.state.todo.description)
    }


    render(){
        //{this.props.match.params.id}
        return(
            <div className="father">
                <div className="backlink">
                    <a href="/#/">{'< Back to main page'}</a>
                </div>
                <div className="top">
                    <div className="titleholder">
                        <h1 className="titlelabel">Title</h1>
                        <input className="dtinput" value={this.state.todo.title} onChange={e => {this.handleTermTitle(e.target.value)}} />

                    </div>
                    {this.state.todo.completed ? null : <button className="dcombutton" onClick={()=> this.completeTask(this.state.todo.id)} >Completed?</button>}
                </div>
                <div className="bottom">
                    <div className='desholder'>
                        <h1 className="deslabel">Description</h1>
                        <input className="ddinput" value={this.state.todo.description} onChange={e => {this.handleTermDes(e.target.value)}}/>
                    </div>
                </div>
                <div className="somebuttons">
                    <a href="/#/"><button className="save"  onClick={()=> this.editTask()}>Save</button></a>
                    <a href="/#/"><button className="cancel">Cancel</button></a>
                    <a href="/#/"><button className="delete"  onClick={() => this.deleteTask(this.state.todo.id)}>Delete</button></a>
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

export default connect(mapStateToProps, {getTasks, deleteTask, addTask, completeTask, editTask})(Details)