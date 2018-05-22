const {Composite, ImageView, TextView, ui} = require('tabris');
const WallePage = require('./WallePage');

const PAGE_DATA = [{
    title: 'Wallet',
    drawerIcon: 'images/page_coins.png'
}, {
    title: 'Issue Coin',
    drawerIcon: 'images/page_issue_coin.png',
}];

module.exports = class WallePageSelector extends Composite {

    constructor(properties) {
        super(properties);
        this._createUI();
        this._applyLayout();
        this._applyStyles();
        let {title, filter} = PAGE_DATA[0];
        this._open(new WallePage({title, filter}));
    }

    _createUI() {
        this.append(
            PAGE_DATA.map(data =>
            new Composite({class: 'pageEntry', highlightOnTouch: true}).append(
                new ImageView({class: 'image', image: data.drawerIcon}),
                new TextView({class: 'titleLabel', text: data.title})
            ).on('tap', () => this._open(new WallePage({title: data.title, filter: data.filter})))
    )
    );
    }

    _open(page) {
        let navigationView = ui.find('NavigationView').first();
        navigationView.pageAnimation = 'none';
        tabris.ui.drawer.close();
        navigationView.pages().dispose();
        page.appendTo(navigationView);
        navigationView.pageAnimation = 'default';
    }

    _applyLayout() {
        this.apply({
            '.pageEntry': {left: 0, top: 'prev()', right: 0, height: device.platform === 'iOS' ? 40 : 48},
            '.image': {left: 16, top: 10, bottom: 10},
            '.titleLabel': {left: 72, centerY: 0}
        });
    }

    _applyStyles() {
        this.apply({
            '.titleLabel': {
                font: device.platform === 'iOS' ? '17px .HelveticaNeueInterface-Regular' : 'medium 14px',
                textColor: device.platform === 'iOS' ? 'rgb(22, 126, 251)' : '#212121'
            }
        });
    }

};