const {Page, TextView, ui} = require('tabris');

const TITLE = 'About';
const LICENSE_TEXT = 'wall-e';
const ATTRIBUTION_TEXT =
    `<br/>wallet app.<br/> create your own money. <br/>be consumer. <br/>be producer. <br/>be bank. <br/>be broker. <br/>be issuer<br/>
<br/>
  <br/>
  Rainer Häring - 1978<br/>
  Stefan Kostopoulos - 1978<br/>
  <br/>
  IT-Rockstars Services<br/>
  Munich / Valencia<br/>`;

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