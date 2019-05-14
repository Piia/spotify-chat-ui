import axios from 'axios';


class ChatClient {
    static getChatHistory(trackId) {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/chat/${trackId}/history`);
    }
}

export default ChatClient;