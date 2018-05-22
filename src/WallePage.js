const {Page} = require('tabris');
const CoinList = require('./CoinList');

module.exports = class WallePage extends Page {

    constructor(properties) {
        super(Object.assign({autoDispose: false}, properties));
        this.createUI();
        this.applyLayout();
    }

    set filter(filter) {
        this._filter = filter;
    }

    get filter() {
        return this._filter;
    }

    createUI() {
        this.append(
            new CoinList({filter: this.filter})
        );
    }

    applyLayout() {
        this.find('#coinList').set({left: 0, top: 0, right: 0, bottom: 0});
    }

};