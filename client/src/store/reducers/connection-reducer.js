const defaultState = {
    isConnected: false
}

const SET_CONNECTED = "SET_CONNECTED";
const SET_DISCONNECTED = "SET_DISCONNECTED";

export default function connectionReducer(state = defaultState, { type }) {
    switch(type) {
        case SET_CONNECTED:
            return { ...state, isConnected: true };
        case SET_DISCONNECTED:
            return { ...state, isConnected: false };
        default:
            return state;
    }
}

export const setConnectedAction = () => ({ type: SET_CONNECTED });
export const setDisconnectedAction = () => ({ type: SET_DISCONNECTED });

export const selectConnected = state => state.connection.isConnected;