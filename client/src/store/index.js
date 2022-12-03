import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chat-reducer';
import connectionReducer from './reducers/connection-reducer';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        connection: connectionReducer
    },
});
