/* global wp */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { SVG, Path } = wp.components;

import templates from './templates.js';

// These are the template options.
// To add more options, just add a template to the templates.json (templates are also used to get default values in PHP parser),
// then add the options here.
// The width gets applied to the individual column as an attribute, and the user has no way to change that attribute.
const TEMPLATE_OPTIONS = [
    {
        style: 'minmax(min-content, 1fr);',
        title: __( 'One column' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H10V34H39ZM23 34H9V14H10V34Z" /></SVG>,
        template: templates[0][0],
    },
    {
        style: 'minmax(min-content, 1fr) minmax(min-content, 1fr)',
        title: __( 'Two columns; equal split' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z" /></SVG>,
        template: templates[0][1],
    },
    {
        style: 'minmax(min-content, 1fr) minmax(min-content, 2fr)',
        title: __( 'Two columns; one-third, two-thirds split' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z" /></SVG>,
        template: templates[0][2],
    },
    {
        style: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
        title: __( 'Two columns; two-thirds, one-third split' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z" /></SVG>,
        template: templates[0][3],
    },
    {
        style: 'minmax(min-content, 1fr) minmax(min-content, 1fr) minmax(min-content, 1fr)',
        title: __( 'Three columns; equal split' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z" /></SVG>,
        template: templates[0][4],
    },
    {
        style: 'minmax(min-content, 1fr) minmax(min-content, 2fr) minmax(min-content, 1fr)',
        title: __( 'Three columns; wide center column' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z" /></SVG>,
        template: templates[0][5],
    },
    {
        style: 'minmax(min-content, 1fr) minmax(min-content, 1fr) minmax(min-content, 1fr) minmax(min-content, 1fr)',
        title: __( 'Three columns; wide center column' ),
        icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path d="M 24 34.742 L 24 13.282" /><Path d="M 41 34 C 41 35.105 40.105 36 39 36 L 9 36 C 7.895 36 7 35.105 7 34 L 7 14 C 7 12.895 7.895 12 9 12 L 39 12 C 40.105 12 41 12.895 41 14 Z M 31 14 L 25 14 L 25 34 L 31 34 Z M 17 14 L 17 34 L 23 34 L 23 14 Z M 39 34 L 39 14 L 33 14 L 33 34 Z M 15 14 L 9 14 L 9 34 L 15 34 Z" /></SVG>,
        template: templates[0][6],
    },
];

const DEFAULT_TEMPLATE_INDEX = 0;

export {
    TEMPLATE_OPTIONS,
    DEFAULT_TEMPLATE_INDEX,
};

