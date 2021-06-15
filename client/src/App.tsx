import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Login from './pages/Login';
import Create from './pages/Create';

const GlobalContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	font-size: ${({theme}) => theme.fontSizeEm};
	background: ${({theme}) => theme.secondary};
	font-family: ${({theme}) => theme.fontFamily};
	display: flex;
	flex-direction: column;
`

function App() {
	return (
		<GlobalContainer>
			<Switch>
				<Route exact path="/">
					<Rooms />
				</Route>
				<Route path="/room/:id">
					<Room />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/create">
					<Create />
				</Route>
			</Switch>
		</GlobalContainer>
  	);
}

export default App;
