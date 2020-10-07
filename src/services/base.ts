export class Base {
    // static apiUrl = 'https://34.207.81.246/api/v1';
    // static baseUrl = 'https://34.207.81.246/';

    static apiUrl = 'http://93ec8bdc45f6.ngrok.io/api/v1';
    static baseUrl = 'http://93ec8bdc45f6.ngrok.io/';

    static getAuthToken() {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
