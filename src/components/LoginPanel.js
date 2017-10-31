import React, { Component } from 'react';
//import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';


export default class LoginPanel extends Component {
	render() {
		return (<div>
			<TextField 
				hintText='Username'
				floatingLabelText='Username'
			/>
			<TextField 
				hintText='Password'
				floatingLabelText="Password"
				type="password"
			/>
		</div>);
	}
}

// function mapStateToProps(state){
// 	return {
// 		handsign: state.handsign
// 	}
// }

// function mapDispatchToProps(dispatch){
// 	// using ES6 property value shorthand, equivalent to { playHandSign: playHandSign, ... }
// 	return bindActionCreators({ playHandSign }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);