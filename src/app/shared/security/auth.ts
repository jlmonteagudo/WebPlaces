export class Auth {

    constructor(public $uid: string) {}

    isLoggedIn() {
        return !!this.$uid;
    }

}