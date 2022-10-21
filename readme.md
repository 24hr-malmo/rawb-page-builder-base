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


