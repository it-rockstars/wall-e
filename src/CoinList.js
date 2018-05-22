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
        let {image, title, author} = coins[index];
        Object.assign(view, {image, title, author});
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

    set title(title) {
        this.find('#titleLabel').first().text = title;
    }

    get title() {
        return this.find('#titleLabel').first().text;
    }

    set author(author) {
        this.find('#authorLabel').first().text = author;
    }

    get author() {
        return this.find('#authorLabel').first().text;
    }

    _createUI() {
        this.append(
            new ImageView({id: 'image'}),
            new TextView({id: 'titleLabel', markupEnabled: true}),
            new TextView({id: 'authorLabel'})
        );
    }

    _applyLayout() {
        this.apply({
            '#image': {left: 16, centerY: 0, width: 32, height: 48, scaleMode: 'fit'},
            '#titleLabel': {left: 64, right: 16, top: 16},
            '#authorLabel': {left: 64, right: 16, top: 'prev() 4'}
        });
    }

    _applyStyles() {
        this.apply({
            '#titleLabel': {textColor: '#4a4a4a'},
            '#authorLabel': {textColor: '#7b7b7b'}
        });
    }

}