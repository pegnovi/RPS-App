import React from 'react';

class ListForm extends React.Component {
	onClick(e){
		e.preventDefault();
		console.log('clicked');
	}

	render(){
		return (
			<form>
				<button onClick={this.onClick.bind(this)}>Click me</button>
			</form>
		)
	}

}

export default ListForm;
