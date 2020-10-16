export class Base {
    static apiUrl = 'http://34.207.81.246/api/v1';
    static baseUrl = 'http://34.207.81.246/';

    // static apiUrl = 'http://192.168.0.117:3001/api/v1';
    // static baseUrl = 'http://192.168.0.117:3301';

    static getAuthToken() {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
