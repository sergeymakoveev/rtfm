import { useHistory } from 'react-router';
import { default as queryString } from 'query-string';

export const useQueryInLocation = () => {
	const history = useHistory();
	return {
		updateQueryInLocation: (queryArgsUpdate: Record<string, unknown>) => {
			const queryArgsFromLocation = queryString.parse(location.search);
			const search = queryString.stringify({
				...queryArgsFromLocation,
				...queryArgsUpdate,
			});
			console.log('## ', { search, history });
			history.replace({ ...history.location, search });
		},
	};
};
