const defaultState = {
    messages: []
}

const ADD_MESSAGE = "ADD_MESSAGE";
const DROP_MESSAGES = "DROP_MESSAGES";

export default function chatReducer(state = defaultState, { type, payload }) {
    switch(type) {
        case ADD_MESSAGE:
            return { ...state, messages: [...state.messages, payload] };
        case DROP_MESSAGES:
            return { ...state, messages: [] };
        default:
            return state;
    }
}

export const addMessageAction = message => ({ type: ADD_MESSAGE, payload: message });
export const dropMessagesAction = () => ({ type: DROP_MESSAGES });

export const selectMessages = state => state.chat.messages;