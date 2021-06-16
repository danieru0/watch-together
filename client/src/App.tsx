import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Login from './pages/Login';
import Create from './pages/Create';

import Nav from './components/organisms/Nav';

library.add(faSignOutAlt);

const GlobalContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	font-size: ${({theme}) => theme.fontSizeEm};
	background: ${({theme}) => theme.secondary};
	font-family: ${({theme}) => theme.fontFamily};
	display: flex;
	flex-direction: column;
`

const GlobalWrapper = styled.div`
	width: 100%;
	flex: 1;
	display: flex;
`

function App() {
	return (
		<GlobalContainer>
			<Nav />
			<GlobalWrapper>
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
			</GlobalWrapper>
		</GlobalContainer>
  	);
}

export default App;
