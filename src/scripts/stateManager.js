export class StateManager {
    static state = {
        theme: 'light',
        soundEnabled: false,
        errors: [],
    };

    static getState() {
        return this.state;
    }

    static setState(newState) {
        this.state = { ...this.state, ...newState };
     }

    static addError(error) {
        this.state.errors.push(error);
     }

    static clearErrors() {
        this.state.errors = [];
     }
}