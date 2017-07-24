import React from 'react';
import ListForm from './ListForm.js'
import List from './List.js'
import { connect } from 'react-redux'

const items = ['one', 'two', 'three'];
class ListContainer extends React.Component {
	onListAddClick(){

	}

	render(){
		return (
			<div>
				<ListForm/>
				<List/>
			</div>
		);
	}

}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default ListContainer;
