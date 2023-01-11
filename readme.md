# RAWB Wordpress Page Builder Base plugin

This plugin provides two things:

1. A Section block
2. A Column block

The blocks are the base of all our page builder projects in wordpress and have the basic settings
normaly needed. 
The settings can be truned on or offf by extending and overriding a `features` attribute.

### Section

The sections has the following features active by default

- background
- verticalAlignment
- width
- verticalPadding
- background.image
- background.color

They can be turned off like this:

```javascript
// Register the new settings
addFilter( 'blocks.registerBlockType', 'next24hr/compontents', settings => {
    if (settings.name !== 'next24hr/section') {
        return settings;
    }
	if( typeof settings.attributes !== 'undefined' ){
        settings.attributes = Object.assign( settings.attributes, {
            // Add the features you want to use in the array
			features: { type: 'array', default: [
                'background', 
                'verticalAlignment', 
                'width', 
                'verticalPadding', 
                'background.image',
            ] },
		});
	}
	return settings;
});
```
#### Column layouts

The secion comes pre-loaded with some common column splits. If you wish to add more, you can do it like so:

```javascript
const template = {
    // gutenberg editor css
    style: 'minmax(min-content, 1fr) minmax(min-content, 4fr) minmax(min-content, 1fr)',
    title: __( 'Three columns; wider center column' ),
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill-rule="evenodd" d="M 41 14 C 41 12.895 40.105 12 39 12 L 9 12 C 7.895 12 7 12.895 7 14 L 7 34 C 7 35.105 7.895 36 9 36 L 39 36 C 40.105 36 41 35.105 41 34 L 41 14 Z M 32.681 34 L 14.694 34 L 14.733 14 L 32.602 14 L 32.681 34 Z M 34.329 34 L 34.368 14 L 39 14 L 39 34 L 34.329 34 Z M 12.928 34 L 9 34 L 9 14 L 13.006 14.039 L 12.928 34 Z"></path></svg>,
    template:[
        [ "next24hr/column", { "width": "1/6" } ],
        [ "next24hr/column", { "width": "2/3" } ],
        [ "next24hr/column", { "width": "1/6" } ]
    ],
};

// when you extend the gutenberg block:
<BlockEdit { ...props } extraTemplates={[ template ]}>

```

You can also disable these default templates by their slug name (except the single column template), like so:

```javascript
// when you extend the gutenberg block:
<BlockEdit { ...props } disableTemplates={[ 'threeColumnsWideCenter', 'fourColumnsEqual' ]}>

/**
 * Defaults:
 * 
 * twoColumnsEqual
 * twoColumnsOneAndTwoThirds
 * twoColumnsTwoAndOneThirds
 * threeColumnsEqual
 * threeColumnsWideCenter
 * fourColumnsEqual
 */
```

### Column

As in the section, the column has a set of features that can be turned on or off:

- direction
- aligment

They can be turned of in the same way as a section (in this example we turned of `direction`):

```javascript
// Register the new settings
addFilter( 'blocks.registerBlockType', 'next24hr/compontents', settings => {
	if (settings.name !== 'next24hr/column') {
		return settings;
    }
	if( typeof settings.attributes !== 'undefined' ){
        settings.attributes = Object.assign( settings.attributes, {
            // Add the features you want to use in the array. 
			features: { type: 'string', default: ['aligment'] },
		});
	}
	return settings;
});
```

# Blocking (disabling) blocks inside a column

If you want certain blocks to be disabled in a column, you can change an attribute
called `blockedBlocks` like this:

```javascript
// Register the new settings
addFilter( 'blocks.registerBlockType', 'next24hr/compontents', settings => {
	if (settings.name !== 'next24hr/column') {
		return settings;
    }
	if( typeof settings.attributes !== 'undefined' ){
        settings.attributes = Object.assign( settings.attributes, {
			blockedBlocks: { type: 'array', default: ['mysupercoolblock'] },
		});
	}
	return settings;
});
```
```

## How to develop

This is base on Create Gutenberg Block

### 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.


