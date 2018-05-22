const {CollectionView, Composite, ImageView, TextView, ui} = require('tabris');
const coins = require('./coins');

module.exports = class CoinList extends CollectionView {

    constructor(properties) {
        super(Object.assign({id: 'coinList', cellHeight: 72}, properties));
        //this._Coins = Coins.filter(this.filter);
        this._coins = coins;
        this.on('select', ({index}) => console.log('selected', this.coins[index].title));
        this.itemCount = this.coins.length;
    }

    get coins() {
        return this._coins;
    }

    set filter(filter) {
        this._filter = filter;
    }

    get filter() {
        return this._filter || (() => true);
    }

    createCell() {
        console.log("creating cell");
        super.createCell();
        return new CoinCell();
    }

    updateCell(view, index) {
        console.log("updating cell");
        super.updateCell(view, index);
        let {image, title, symbol, amount   } = coins[index];
        Object.assign(view, {image, symbol, title, amount});
    }

    _showCoinDetailsPage(Coin) {
        const CoinDetailsPage = require('./CoinDetailsPage');
        new CoinDetailsPage({title: Coin.title, Coin}).appendTo(ui.find('NavigationView').first());
    }

};

class CoinCell extends Composite {

    constructor(properties) {
        super(Object.assign({highlightOnTouch: true}, properties));
        this._createUI();
        this._applyLayout();
        this._applyStyles();
    }

    set image(image) {
        this.find('#image').first().image = image;
    }

    get image() {
        return this.find('#image').first().image;
    }

    set symbol(symbol) {
        this.find('#symbol').first().text = symbol;
    }

    get symbol() {
        return this.find('#symbol').first().text;
    }

    set title(title) {
        this.find('#title').first().text = title;
    }

    get title() {
        return this.find('#title').first().text;
    }

    set amount(amount) {
        this.find('#amount').first().text = amount;
    }

    get amount() {
        return this.find('#amount').first().text;
    }


    _createUI() {
        this.append(
            new ImageView({id: 'image'}),
            new TextView({id: 'symbol'}),
            new TextView({id: 'title', markupEnabled: true}),
            new TextView({id: 'amount', alignment: 'right'})
        );
    }

    _applyLayout() {
        this.apply({
            '#image': {left: 16, centerY: 0, width: 32, height: 48, scaleMode: 'fit'},
            '#symbol': {left: 64, right: 16, top: 16},
            '#title': {left: 64, right: 16, top: 32},
            '#amount': {left: 64, right: 16, top: 16, height: 32}
        });
    }

    _applyStyles() {
        this.apply({
            '#title': {textColor: '#4a4a4a'},
            '#symbol': {textColor: '#4a4a4a'},
            '#amount': {textColor: '#7b7b7b', font: device.platform === 'iOS' ? '24px .HelveticaNeueInterface-Regular' : 'medium 20px'}
        });
    }

}