import axios from 'axios';


class ChatClient {
    static getChatHistory() {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/chat/history`);
    }
}

export default ChatClient;