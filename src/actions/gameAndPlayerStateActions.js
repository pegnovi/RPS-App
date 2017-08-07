//https://github.com/reactjs/redux/issues/601
export const setMatchResult = (result) => {
	return {
		type: 'SET_MATCH_RESULT',
		payload: result
	};
}

export const exitMatch = () => {
	return {
		type: 'EXIT_MATCH',
		payload: ''
	};
}
