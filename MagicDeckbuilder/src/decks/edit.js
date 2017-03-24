import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Edit {

    deck = null;
    constructor(http) {
        this.http = http;

        this.http.configure(x => x.useStandardConfiguration().withBaseUrl("/api/"));
    }

    activate(params) {
        return this.http.fetch(`decks/${params.id}`)
            .then(x => x.json())
            .then(x => {
                this.deck = x;
            });
    }

    get cardList() {
        return this.deck.cards.map(x => `${x.quantity} ${x.name}`).join('\n');
    }

    set cardList(val) {
        let cardQuantityStrings = val.split('\n');
        this.deck.cards = cardQuantityStrings.map(x => {
            let firstSpaceIndex = x.indexOf(' ');
            let card = {
                quantity: x.substr(0, firstSpaceIndex),
                name: x.substr(firstSpaceIndex+1)
            };
            return card;
        });
    }
}