import React, {Component} from 'react';

class RockButton extends Component {
	render(){
		return (
			<input type='button' onClick=>Rock</input>
		);
	}
}

export default RockButton;

//list of things to do to make a rock button.
//
// markup
// click handler
// parent component
// handsign reducer
// handsign actions
// store handsigns
// all components aware of handsign state
