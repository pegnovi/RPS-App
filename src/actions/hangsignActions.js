export const playRockHand = (state) => {
	console.log('you clicked:', state);
	return {
		type: 'ROCK_SIGN_CLICKED',
		payload: state
	};
}

//TODO implement scissor action
//TODO implement paper action
