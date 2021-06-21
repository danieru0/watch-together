import { useEffect, useState } from 'react';

import { useSocketContext } from '../context/socketContext';

const useSocketError = () => {
    const [isError, setIsError] = useState('');
    const socket = useSocketContext();
    
    useEffect(() => {
        if (socket) {
            socket.on('sendError', message => {
                setIsError(message);
            })
        }

        return () => {socket && socket.off('sendError')}
    }, [socket]);

    return isError;
}

export default useSocketError;