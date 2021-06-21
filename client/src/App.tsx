import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faUser, faExternalLinkSquareAlt, faCog, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { io } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from './app/hooks';

import { selectSocket, setSocket } from './features/socket/socketSlice';

import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Login from './pages/Login';
import Create from './pages/Create';

import Modal from './components/organisms/Modal';
import Nav from './components/organisms/Nav';

library.add(faSignOutAlt, faUser, faExternalLinkSquareAlt, faCog, faComments, faTimes, faYoutubeSquare);

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
	const socketSelector = useAppSelector(selectSocket);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const socket = io();

		dispatch(setSocket(socket));
	}, [dispatch])

	useEffect(() => {
		if (socketSelector.socket) {
			socketSelector.socket.on('connected', data => {
				alert(data);
			})
		}
	}, [socketSelector]);

	const isModalActive = false;

	return (
		<GlobalContainer>
			{isModalActive && <Modal />}
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
