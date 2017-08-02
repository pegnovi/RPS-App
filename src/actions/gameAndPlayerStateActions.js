//https://github.com/reactjs/redux/issues/601
export const setMatchResult = (result) => {
	const type = 'MATCH_RESULT';
	return {
		type: type,
		payload: result
	};
}

export const exitMatch = () => {
	const type = 'EXIT_MATCH';
	return {
		type: type,
		payload: ''
	};
}
