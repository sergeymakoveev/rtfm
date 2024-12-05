/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import { render } from 'react-dom';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		h1: {
			fontSize: '1rem',
		},
	},
});

theme.typography.h3 = {
	fontSize: '3rem',
};

const Index = React.memo(() => (
	<ThemeProvider theme={theme}>
		<Typography variant="h1">Responsive h1</Typography>
		<Typography variant="h3">Responsive h3</Typography>
	</ThemeProvider>
));

render(React.createElement(Index), document.getElementById('root'));
