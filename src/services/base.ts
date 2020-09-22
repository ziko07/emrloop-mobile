export class Base {
    // static apiUrl = 'http://34.207.81.246/api/v1';
    // static baseUrl = 'http://34.207.81.246/';

    static apiUrl = 'https://fa1c8affff6a.ngrok.io/api/v1';
    static baseUrl = 'https://fa1c8affff6a.ngrok.io';

    static getAuthToken() {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
