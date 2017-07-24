import React from 'react';

const items = ['one', 'two', 'three'];
class List extends React.Component {

	render(){
		let list = items.map(function(elem){
			return '<li>' + elem + '</li>' + '<br>';
		});

		return (
			<ol>
				{list}
			</ol>
		);
	}

}

export default List;
