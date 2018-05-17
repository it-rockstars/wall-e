const {Button, TextView, ui} = require('tabris');

let button = new Button({
  centerX: 0, top: 100,
  text: 'wow'
}).appendTo(ui.contentView);

let textView = new TextView({
  centerX: 0, top: [button, 50],
  font: '24px'
}).appendTo(ui.contentView);

button.on('select', () => {
  textView.text = 'Hallo oder was anderes!';
});
