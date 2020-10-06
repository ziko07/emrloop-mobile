export class Base {
    static apiUrl = 'https://95444204d898.ngrok.io/api/v1';
    static baseUrl = 'https://95444204d898.ngrok.io/';

    static getAuthToken() {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
