const {Page, TextView, ui} = require('tabris');

const TITLE = 'About';
const LICENSE_TEXT = 'wall-e';
const COVERS_LINK_TEXT = 'IT-Rockstars Services Ltd.';
const ATTRIBUTION_TEXT =
    `<i>Authors of wall-e:</i><br/>
  Rainer Häring - 1978<br/>
  Stefan Kostopoulos - 1978<br/>`;

module.exports = class AboutPage extends Page {

    constructor(properties) {
        super(Object.assign({title: TITLE}, properties));
        this.on({
            appear: () => ui.find('#aboutAction').first().visible = false,
            disappear: () => ui.find('#aboutAction').first().visible = true
        });
        this._createUI();
        this._applyLayout();
        this._applyStyles();
    }

    _createUI() {
        this.append(
            new TextView({id: 'licenseLabel', text: LICENSE_TEXT}),
            new TextView({id: 'attributionLabel',text: ATTRIBUTION_TEXT, markupEnabled: true})
        );
    }

    _applyLayout() {
        this.apply({
            '#licenseLabel': {left: 16, right: 16, top: 16},
            '#coversLink': {left: 16, right: 16, top: 'prev() 8',},
            '#attributionLabel': {left: 16, right: 16, top: 'prev() 8'}
        });
    }

    _applyStyles() {
        this.apply({
            '#coversLink': {textColor: 'rgba(71, 161, 238, 0.75)'}
        });
    }

};