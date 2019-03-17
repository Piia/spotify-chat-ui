import axios from 'axios';


axios.defaults.withCredentials = true;


class SpotifyClient {
    static getMyProfile() {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/user/profile`)
    }

    static postAuthenticate(authorizationCode) {
        return axios.post(`${process.env.REACT_APP_BACKEND_BASEPATH}/authenticate`, {
            authorizationCode: authorizationCode
        });
    }

    static searchTracks(trackName) {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/search/track`, {
            params: { name: trackName }
        });
    }

}

export default SpotifyClient;