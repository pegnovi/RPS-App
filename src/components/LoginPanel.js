import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';


export default class LoginPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	// make the request to the login endpoint
	getToken() {
		var loginUrl = "http://localhost:9000/login"
		var xhr = new XMLHttpRequest();
		var user = this.state.username;
		var password = this.state.password;

		console.log(user);
		console.log(password);

		xhr.open('POST', loginUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

		var tokenElement = document.getElementById('token');

		xhr.addEventListener('load', function() {
			var responseObject = JSON.parse(this.response);
			console.log(responseObject);
			if (responseObject.token) {
				// Store in cookie later
				// https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
				tokenElement.innerHTML = responseObject.token;
			}
			else {
				tokenElement.innerHTML = "No token received";
			}
		});

		var sendObject = JSON.stringify({name: user, password: password});

		console.log('going to send', sendObject);

		xhr.send(sendObject);
	}

	// make the request to the secret API endpoint
	getSecret() {

		var url = "http://localhost:9000/secret"
		var xhr = new XMLHttpRequest();
		var tokenElement = document.getElementById('token');
		var resultElement = document.getElementById('result');
		xhr.open('GET', url, true);
		console.log('TOKEN');
		console.log(tokenElement.innerHTML);
		xhr.setRequestHeader("Authorization", "Bearer " + tokenElement.innerHTML);
		xhr.addEventListener('load', function() {
			console.log(this.response);
			var responseObject = JSON.parse(this.response);
			console.log(responseObject);
			resultElement.innerHTML = this.responseText;
		});

		xhr.send(null);
	}

	handleTextChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	render() {
		return (<div>
			<TextField
				id='username'
				hintText='Username'
				floatingLabelText='Username'
				value={this.state.username}
				onChange={this.handleTextChange.bind(this)}
			/>
			<TextField
				id='password'
				hintText='Password'
				floatingLabelText='Password'
				type='password'
				value={this.state.password}
				onChange={this.handleTextChange.bind(this)}
			/>
			<RaisedButton
				label={'Register'}
				onClick={this.getSecret.bind(this)}
			/>
			<RaisedButton
				label={'Login'}
				onClick={this.getToken.bind(this)}
			/>
			<div id='token'></div>
			<div id='result'></div>
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
