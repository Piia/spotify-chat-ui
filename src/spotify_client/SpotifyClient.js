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

    static getAccessTokenLifetime() {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/accessToken/lifeTime`);
    }

    static postAccessTokenRefresh() {
        return axios.post(`${process.env.REACT_APP_BACKEND_BASEPATH}/accessToken/refresh`);
    }

    static searchTracks(trackName) {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/search/track`, {
            params: { name: trackName }
        });
    }

    static playTrack(trackUri) {
        return axios.put(`${process.env.REACT_APP_BACKEND_BASEPATH}/playback/play/track`, {
            trackUri: trackUri
        });
    }

    static getPlaybackState() {
        return axios.get(`${process.env.REACT_APP_BACKEND_BASEPATH}/playback/state`);
    }

}

export default SpotifyClient;