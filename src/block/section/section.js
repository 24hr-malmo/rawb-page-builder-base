/**
 * BLOCK: next24hr-section
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

/* global wp */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useEffect } from '@wordpress/element';
import TemplateSelectButton from './template-select-button.js';
// import React from 'react';

// Must have these empty styles otherwise it doesn't build.
import '../editor.scss';
import '../style.scss';

import { StyledBlockRoot, StyledContainer, StyledSectionLabel, StyledInfoBox } from './section.style';
import { TEMPLATE_OPTIONS, DEFAULT_TEMPLATE_INDEX } from './template-options';

const { useSelect, useDispatch } = wp.data;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    InspectorControls,
    InnerBlocks,
    MediaUploadCheck,
    MediaUpload,
} = wp.blockEditor;
const {
    PanelBody,
    PanelRow,
    BaseControl,
    Button,
    ButtonGroup,
    RadioControl,
    ColorPalette,
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const ALLOWED_MEDIA_TYPES = [ 'image/gif', 'image/jpg', 'image/jpeg', 'image/png' ];

const defaultColors = [
    { color: '#FFFFFF', name: 'white' },
    { color: '#FAFAFA', name: 'lightGray' },
    { color: '#F0F0F0', name: 'gray' },
    { color: '#cef1fe', name: 'skyLight' },
    { color: '#ccf4d3', name: 'pearLight' },
    { color: '#fbf5ce', name: 'lemonLight' },
    { color: '#fbe2c8', name: 'orangeLight' },
    { color: '#f9cfc2', name: 'tomatoLight' },
    { color: '#ecc0c0', name: 'berryLight' },
    { color: '#f0bddd', name: 'plummyLight' },
];

const defaultWidths = [
    { label: __( 'Follows normal flow', 'next24hr' ), value: 'normal' },
    { label: __( 'Background full width', 'next24hr' ), value: 'constrained' },
    { label: __( 'All full width', 'next24hr' ), value: 'full' },
    // { label: __( 'Follow single column flow (jFlow)', 'next24hr' ), value: 'jflow' },
];

const defaultBackgroundTypes = [
    { label: __( 'Transparent', 'next24hr' ), value: 'transparent' },
    { label: __( 'Color', 'next24hr' ), value: 'color' },
    { label: __( 'Image', 'next24hr' ), value: 'image' },
];

registerBlockType( 'next24hr/section', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __( 'Section' ), // Block title.
    icon: 'tagcloud', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: {
        templateSelected: { type: 'array', default: [...TEMPLATE_OPTIONS[0].template]}, 
        templateID: { type: 'number', default: DEFAULT_TEMPLATE_INDEX },
        verticalAlignment: { type: Boolean },
        sectionWidth: { type: 'string', default: 'normal' },
        backgroundType: { type: 'string', default: 'transparent' },
        backgroundValue: {},
        verticalPadding: { type: 'string', default: 'medium' },

        // This is the list off colors we will render in the admin UI. It can be overwritten to show a custom color list.
        colorSelection: { type: 'array', default: defaultColors },

        // This is the list of different width selections. It can be overwritten
        widthSelection: { type: 'array', default: defaultWidths },

        // This is the list of different background types selections. It can be overwritten
        backgroundTypesSelection: { type: 'array', default: defaultBackgroundTypes },

        features: { type: 'array', default: ['background', 'verticalAlignment', 'width', 'verticalPadding', 'background.image', 'background.color'] },
    },

    keywords: [
        __( 'next24hr-section — CGB Block' ),
        __( 'CGB Example' ),
        __( 'create-guten-block' ),
    ],

    edit: function( props ) {

        const { setAttributes } = props;

        const {

            templateSelected,
            templateID,
            verticalAlignment,
            sectionWidth,
            backgroundType,
            backgroundValue,
            verticalPadding,

            colorSelection,
            widthSelection,

            features,

        } = props.attributes;

        const { clientId } = props;
        const { replaceInnerBlocks } = useDispatch("core/block-editor");
        const { inner_blocks } = useSelect(select => ({
            inner_blocks: select("core/block-editor").getBlocks(clientId)
        }));


        const infoBoxList = props.infoBoxList || [];

        if (!Array.isArray(infoBoxList)) {
            throw new Error('Info box List has to be an array');
        }


        let {
            backgroundTypesSelection,
        } = props.attributes;

        // Turn of some features by flags
        if (!features.includes('background.image')) {
            backgroundTypesSelection = backgroundTypesSelection.filter(type => type.value !== 'image');
        }
        if (!features.includes('background.color')) {
            backgroundTypesSelection = backgroundTypesSelection.filter(type => type.value !== 'color');
        }


        useEffect(() => {
            if (!templateSelected) {
                templateSelectHandler(DEFAULT_TEMPLATE_INDEX, false);
                console.log('dddd');
            }
        }, []);

        const image = backgroundType === 'image' ? backgroundValue : null;

        const templateSelectHandler = ( templateIndex, replace = true) => {

            const newTemplate = [...TEMPLATE_OPTIONS[ templateIndex ].template];

            const all = wp.data.select('core/block-editor').getBlocksByClientId(clientId);
            const section = all[0];

            setAttributes( {
                templateSelected: newTemplate,
                templateID: templateIndex,
            } );

            console.log('do it', newTemplate);

            if (replace) {

            // Trigger replacement of blocks to update section with new columns layout
            replaceInnerBlocks(clientId, inner_blocks, false);

            // This parts checks if we are removing columns and makes sure the content is moved to the 
            // columns on the left of the removed columns
            if (section && section.innerBlocks && section.innerBlocks.length > newTemplate.length) {
                section.innerBlocks.forEach((block, index) => {
                    if (index > newTemplate.length - 1) {
                        wp.data.dispatch('core/block-editor').insertBlocks(block.innerBlocks, section.innerBlocks.length - 1, all[0].innerBlocks[newTemplate.length - 1].clientId, false);
                    }
                });
            }

            }

        };

        const updateVerticalAlignmentSetting = ( verticalAlignment ) => {
            setAttributes({
                verticalAlignment,
            });
        };

        const removeBgImage = () => {
            setAttributes({ backgroundValue: null });
        };

        const templateOptions = TEMPLATE_OPTIONS.map( ( templateOption, index ) => {
            return (
                <TemplateSelectButton
                    icon={ templateOption.icon }
                    key={ templateOption.title }
                    active={ index === templateID }
                    clicked={ () => templateSelectHandler( index ) } />
            );
        } );

        const mediaOptions = (
            <div css={ css`
                display: flex;
                flex-direction: column;
                align-items: center;
            ` }>
            { ! image ? <small css={ css`color: red;` }>{ __( 'No image selected', 'next24hr' ) }</small> : null }
            <PanelRow>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ ( media ) => setAttributes({ backgroundValue: media }) }
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        render={ ( { open } ) => (
                            <div>
                                    <BaseControl css={ css`
                                            display: flex;
                                            justify-content: end;
                                            margin-top: 0.5rem;
                                        ` }>
                                        <ButtonGroup>
                                            <Button
                                                isDefault
                                                onClick={ open }>
                                                { image ? __( 'Change image', 'next24hr' ) : __( 'Add image', 'next24hr' ) }
                                            </Button>
                                            { image ? imageDeleteButton : null }
                                        </ButtonGroup>
                                    </BaseControl>
                                </div>
                            ) }
                        />
                    </MediaUploadCheck>
                </PanelRow>
                { image ? <img src={ image.sizes.thumbnail.url } alt="" /> : null }
            </div>
        );

        const currentColorSelection = colorSelection.find(colorItem => backgroundValue === colorItem.name);
        const currentColor = currentColorSelection ? currentColorSelection.color : null;

        const colorOptions = (
            <PanelRow>
                <ColorPalette
                    label={ __( 'Background color', 'next24hr' ) }
                    colors={ colorSelection }
                    value={ currentColor }
                    onChange={ color => {
                        const item = colorSelection.find(colorItem => color === colorItem.color);
                        const value = item ? item.name : null;
                        setAttributes({ backgroundValue: value });
                    }}
                    disableCustomColors
                />
            </PanelRow>
        );

        const imageDeleteButton = (
            <Button
                isDefault
                onClick={ removeBgImage }>
                { __( 'Remove', 'next24hr' ) }
            </Button>
        );

        const updateBackgroundType = ( backgroundType ) => {

            // default values for each bg type
            const defaultValuesByType = {
                color: colorSelection[0] && colorSelection[0].color,
                image: null,
                transparent: null,
            };

            const newAttributes = { backgroundType, backgroundValue: defaultValuesByType[backgroundType] };

            setAttributes({ ...newAttributes });

        };


        const getInfoBoxListHtml = () => {
            const infoBoxListHtml = infoBoxList.map(item => {
                return (
                    <div style={item.style} onClick={(e) => item.callback(e)}>
                        {item.content}
                    </div>
                );
            });

            if (infoBoxList.length > 0) {
                return (
                    <StyledInfoBox>
                        {infoBoxListHtml}
                    </StyledInfoBox>
                );
            }

            return null;
        }

        console.log('ttt', templateSelected);

        return (
            <StyledBlockRoot>
                {getInfoBoxListHtml()}
                <StyledSectionLabel/>
                <InspectorControls>
                    <PanelBody title={ __( 'Section Layout Options', 'next24hr' ) } >
                        <PanelRow>
                            <div css={ css`
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: center;
                            ` }>
                                { templateOptions }
                            </div>
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={ __( 'Other options', 'next24hr' ) } >
                        { features.includes('verticalPadding') &&
                            <PanelRow>
                                <RadioControl
                                    label={ __( 'Vertical Padding', 'next24hr' ) }
                                    selected={ verticalPadding }
                                    options={ [
                                        { label: __( 'None', 'next24hr' ), value: 'none' },
                                        { label: __( 'Medium', 'next24hr' ), value: 'medium' },
                                        { label: __( 'Big', 'next24hr' ), value: 'big' },
                                    ] }
                                    onChange={ ( value ) => setAttributes({ verticalPadding: value }) }
                                />
                            </PanelRow>
                        }
                        { features.includes('verticalAlignment') &&
                            <PanelRow>
                                <RadioControl
                                    label={ __( 'Vertical alignment', 'next24hr' ) }
                                    selected={ verticalAlignment }
                                    options={ [
                                        { label: __( 'Top', 'next24hr' ), value: 'top' },
                                        { label: __( 'Center', 'next24hr' ), value: 'center' },
                                        { label: __( 'Bottom', 'next24hr' ), value: 'bottom' },
                                    ] }
                                    onChange={ ( verticalAlignment ) => updateVerticalAlignmentSetting( verticalAlignment, null ) }
                                />
                            </PanelRow>
                        }
                        { features.includes('width') &&
                            <PanelRow>
                                <RadioControl
                                    label={ __( 'Width', 'next24hr' ) }
                                    selected={ sectionWidth }
                                    options={ widthSelection }
                                    onChange={ value => setAttributes( { sectionWidth: value } ) }
                                />
                            </PanelRow>
                        }
                        { features.includes('background') &&
                            <PanelRow>
                                <RadioControl
                                    label={ __( 'Background', 'next24hr' ) }
                                    selected={ backgroundType }
                                    options={ backgroundTypesSelection }
                                    onChange={ updateBackgroundType }
                                />
                            </PanelRow>
                        }
                        { backgroundType === 'color' ? colorOptions : null }
                        { backgroundType === 'image' ? mediaOptions : null }
                     </PanelBody>
                </InspectorControls>
                <StyledContainer templateID={templateID} >
                    <InnerBlocks
                        // the template from local state
                        template={ templateSelected }
                        // function to render the block appender -  we don't want the user to add blocks, so we don't render one
                        // renderAppender={ () => null }
                        // lock this template down - the user cannot add or remove columns
                        // templateLock={false}
                        templateLock="all"
                    />
                </StyledContainer>
            </StyledBlockRoot>
        );
    },

    save: function() {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    },

} );
