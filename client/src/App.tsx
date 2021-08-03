import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faUser, faExternalLinkSquareAlt, faCog, faComments, faTimes, faCircleNotch, faLock, faPause, faPlay, faVolumeUp, faVolumeMute, faExpand } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare, faStickerMule } from '@fortawesome/free-brands-svg-icons';
import { io, Socket } from 'socket.io-client';
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


import socketContext from './context/socketContext';

import WithoutLogin from './hocs/WithoutLogin';
import WithLogin from './hocs/WithLogin';
import WithRoomAuth from './hocs/WithRoomAuth';

import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Login from './pages/Login';
import Create from './pages/Create';
import Kicked from './pages/Kicked';

import Modal from './components/organisms/Modal';
import Nav from './components/organisms/Nav';

library.add(faSignOutAlt, faUser, faExternalLinkSquareAlt, faCog, faComments, faTimes, faCircleNotch, faLock, faPause, faPlay, faVolumeUp, faVolumeMute, faExpand, faYoutubeSquare, faStickerMule);

const WithoutLoginComponent = WithoutLogin(Login);
const WithLoginCreateComponent = WithLogin(Create);
const WithAuthRoomComponent = WithRoomAuth(Room);
const WithLoginRoomComponent = WithLogin(WithAuthRoomComponent);

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
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socket = io();

		socket.on('sendNotificationToUser', (title, message, type) => {
			store.addNotification({
				title: title,
				message: message,
				type: type,
				insert: "bottom",
				container: "bottom-left",
				animationIn: ["animate__animated", "animate__fadeIn"],
				animationOut: ["animate__animated", "animate__fadeOut"],
				dismiss: {
					duration: 3000,
					onScreen: true
				}
			})
		})

		setSocket(socket);
	}, [])

	return (
		<GlobalContainer>
			<socketContext.Provider value={socket}>
				<ReactNotification />
				<Modal />
				<Nav />
				<GlobalWrapper>
					<Switch>
						<Route exact path="/">
							<Rooms />
						</Route>
						<Route path="/room/:id">
							<WithLoginRoomComponent />
						</Route>
						<Route path="/login">
							<WithoutLoginComponent />
						</Route>
						<Route path="/create">
							<WithLoginCreateComponent />
						</Route>
						<Route path="/kicked">
							<Kicked />
						</Route>
					</Switch>
				</GlobalWrapper>
			</socketContext.Provider>
		</GlobalContainer>
  	);
}

export default App;
