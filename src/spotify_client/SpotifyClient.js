import axios from 'axios';


class SpotifyClient {
    static getMyProfile() {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/user/profile`)
    }

    static postAuthenticate(authorizationCode) {
        return axios.post(`${process.env.REACT_APP_BACKEND_BASEPATH}/authenticate`, {
            authorizationCode: authorizationCode
        });
    }

}

export default SpotifyClient;