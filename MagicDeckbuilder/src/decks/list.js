import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class List {
    constructor(http) {
        this.http = http;

        this.http.configure(x => x.useStandardConfiguration().withBaseUrl("/api/"));
    }

    activate() {
        return this.http.fetch(`decks?userId=${window.currentUserId}`)
            .then(x => x.json())
            .then(x => this.decks = x);
    }
}