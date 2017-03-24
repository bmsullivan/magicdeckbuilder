export class App {
    constructor() {
        this.message = 'Hello World!';
    }

    configureRouter(config, router) {
        this.router = router;

        config.map([
            { route: ['', 'decks/list'], name: 'decks/list', moduleId: 'decks/list' },
            { route: ['decks/edit/:id'], name: 'decks/edit', moduleId: 'decks/edit' }
        ]);
    }
}
