import React, { Component } from 'react'
import PropTypes from 'prop-types';


export default class AddTodo extends Component {

    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''})

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input onChange={this.onChange} value={this.state.title} type="text" name="title" style={{ flex: '10', padding: '5px' }} placeholder="Add todo .." />
                <input type="submit" value="Submit" className="btn" style={{flex: '1'}}/>
            </form>
        )
    }
}


AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
}