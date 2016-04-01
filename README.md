# Redactor feature image plugin
[Redactor](https://imperavi.com/redactor/) plugin for adding emoji from twitter [Twemoji](https://github.com/twitter/twemoji). see all emoji http://twitter.github.io/twemoji/1/test/preview.html

## Usage

### JavaScript
```javascript
$('#redactor').redactor({
    plugins: ['twemoji'],
    emojiset: {
		'UserDefined 1': '[htmlenity code]', '[htmlenity code];', '[htmlenity code]',
		..
		..
		'UserDefined 2': '[htmlenity code]', '[htmlenity code];', '[htmlenity code]',
	},
	twemojiurl: "[twemoji library url]" /* use https://twemoji.maxcdn.com/twemoji.min.js by default */
	twemojiconfig: { /* all config https://github.com/twitter/twemoji#object-as-parameter */
		ext: '.png',
		size: 36
	}
});
```
