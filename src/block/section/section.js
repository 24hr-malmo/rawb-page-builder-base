/**
 * BLOCK: next24hr-section
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

/* global wp */
/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import { useEffect } from '@wordpress/element';
import TemplateSelectButton from './template-select-button.js';

import { StyledBlockRoot, StyledContainer, StyledSectionLabel, StyledInfoBox, StyledInfoItem } from './section.style';
import { TEMPLATE_OPTIONS, DEFAULT_TEMPLATE_INDEX } from './template-options';

const { useSelect, useDispatch } = wp.data;
const { useRef } = wp.element;

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
    __experimentalRadio: Radio,
    __experimentalRadioGroup: RadioGroup,
	TextControl,
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
        verticalAlignment: { type: 'string', default: 'top' },
        sectionWidth: { type: 'string', default: 'normal' },
        backgroundType: { type: 'string', default: 'transparent' },
        anchorTarget: { type: 'string', default: '' },
        backgroundValue: {},
        paddingTop: { type: 'string', default: 'medium' },
        paddingBottom: { type: 'string', default: 'medium' },

        // This is the list off colors we will render in the admin UI. It can be overwritten to show a custom color list.
        colorSelection: { type: 'array', default: defaultColors },

        // This is the list of different width selections. It can be overwritten
        widthSelection: { type: 'array', default: defaultWidths },

        // This is the list of different background types selections. It can be overwritten
        backgroundTypesSelection: { type: 'array', default: defaultBackgroundTypes },

        mobileDesktopFilter: { type: 'string' },

        anchorTarget: { type: 'string', default: '' },

        features: { type: 'array', default: [
            'background', 
            'verticalAlignment', 
            'width', 
            'verticalPadding', 
            'background.image', 
            'background.color', 
            'mobileDesktopFilter',
            'anchorTarget',
            'disableTemplates'
        ] },
    },

    keywords: [
        __( 'next24hr-section — CGB Block' ),
        __( 'CGB Example' ),
        __( 'create-guten-block' ),
    ],

    edit: function( props ) {

        const { setAttributes, extraTemplates, disableTemplates } = props;

        const {

            templateSelected,
            templateID,
            verticalAlignment,
            sectionWidth,
            backgroundType,
            backgroundValue,
            paddingTop,
            paddingBottom,

            colorSelection,
            widthSelection,
            mobileDesktopFilter,
            anchorTarget,

            features,
        } = props.attributes;

        const { clientId } = props;
        const { replaceInnerBlocks } = useDispatch("core/block-editor");
        const { inner_blocks } = useSelect(select => ({
            inner_blocks: select("core/block-editor").getBlocks(clientId)
        }));

        const anchorTargetRef = useRef(null);

        const infoBoxList = props.infoBoxList || [];
        if (!Array.isArray(infoBoxList)) {
            throw new Error('Info box List has to be an array');
        }

        const getVisibilityInfo = (mobileDesktopFilter = 'all') => {
            if (mobileDesktopFilter !== 'all') {
                return {
                    content: `Visibility:  ${mobileDesktopFilter}`,
                };
            }
        };

        const visibilityInfo = getVisibilityInfo(mobileDesktopFilter);
        if (visibilityInfo && !infoBoxList.find(info => info.content === visibilityInfo.content)) {
            infoBoxList.push(visibilityInfo);
        }

        const anchorTargetInfo = getAnchorTargetInfo(anchorTarget, anchorTargetRef);
        if (anchorTargetInfo && !infoBoxList.find(info => info.content === anchorTargetInfo.content)) {
            infoBoxList.push(anchorTargetInfo);
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
            }
        }, []);

        const image = backgroundType === 'image' ? backgroundValue : null;
        
        const ALL_TEMPLATES = [
            ...TEMPLATE_OPTIONS.filter(template => {
                if (!disableTemplates || disableTemplates.length === 0) {
                    return true;
                }

                return !disableTemplates.includes(template.slug);
            }),
            ...(extraTemplates || [])
        ];

        const templateSelectHandler = ( templateIndex, replace = true) => {

            const newTemplate = [...ALL_TEMPLATES[ templateIndex ].template];

            const all = wp.data.select('core/block-editor').getBlocksByClientId(clientId);
            const section = all[0];

            setAttributes( {
                templateSelected: newTemplate,
                templateID: templateIndex,
            } );

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

        const templateOptions = ALL_TEMPLATES.map( ( templateOption, index ) => {
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
                    <StyledInfoItem style={item.style} onClick={(e) => item.callback(e)}>
                        {item.content}
                    </StyledInfoItem>
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

        const currentSelectedColor = colorSelection.find(item => item.name === backgroundValue);
        const currentDisplayColor = currentSelectedColor ? currentSelectedColor.color : null;

        const sectionCss = css`
            ${backgroundType === 'image' && backgroundValue ? `
                position: relative;
                ::before {
                    content: "";
                    background: url(${backgroundValue.url}) no-repeat 50% 50%;
                    opacity: 0.2;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    position: absolute;
                    background-size: cover;
                }` : null
            }
            ${backgroundType === 'color' ? `
                position: relative;
                ::before {
                    content: "";
                    background-color: ${currentDisplayColor};
                    opacity: 0.3;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    position: absolute;
                    background-size: cover;
                }` : null
            }
         `;

        const getVisibilityFilterPanel = () => {
            if (features.includes('mobileDesktopFilter')) {
                return (
                    <PanelBody title="Visibility" initialOpen={false}>
                        <RadioGroup
                            accessibilityLabel="Visibility"
                            onChange={value => setAttributes({ mobileDesktopFilter : value })}
                            checked={mobileDesktopFilter}
                        >
                            <Radio value="all">All</Radio>
                            <Radio value="mobile">Mobile</Radio>
                            <Radio value="desktop">Desktop</Radio>
                        </RadioGroup>
                    </PanelBody>
                );
            }
        };

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
                    { (features.includes('background') || backgroundType === 'color' || backgroundType === 'image') && (
                        <PanelBody title={ __( 'Background', 'next24hr' ) } initialOpen={true} >
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
                    )}
                    { (features.includes('verticalPadding') || features.includes('verticalAlignment') || features.includes('width')) && (
                        <PanelBody title={ __( 'Spacing', 'next24hr' ) } initialOpen={false} >
                            { features.includes('verticalPadding') &&
                                <div>
                                    <PanelRow>
                                        <RadioControl
                                            label={ __( 'Padding Top', 'next24hr' ) }
                                            selected={ paddingTop }
                                            options={ [
                                                { label: __( 'None', 'next24hr' ), value: 'none' },
                                                { label: __( 'Medium', 'next24hr' ), value: 'medium' },
                                                { label: __( 'Big', 'next24hr' ), value: 'big' },
                                            ] }
                                            onChange={ ( value ) => setAttributes({ paddingTop: value }) }
                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RadioControl
                                            label={ __( 'Padding Bottom', 'next24hr' ) }
                                            selected={ paddingBottom }
                                            options={ [
                                                { label: __( 'None', 'next24hr' ), value: 'none' },
                                                { label: __( 'Medium', 'next24hr' ), value: 'medium' },
                                                { label: __( 'Big', 'next24hr' ), value: 'big' },
                                            ] }
                                            onChange={ ( value ) => setAttributes({ paddingBottom: value }) }
                                        />
                                    </PanelRow>
                                </div>
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
                        </PanelBody>
                    )}

                    { getVisibilityFilterPanel() }

                    { features.includes('anchorTarget') && (
                        <PanelBody title="Anchor Target" initialOpen={false}>
                            <PanelRow ref={anchorTargetRef}>
                                <TextControl
                                    label={__('Anchor Name')}
                                    value={anchorTarget}
                                    onChange={ (value) => setAttributes({ anchorTarget: value.replace(/^#/g, '') }) }
                                />
                            </PanelRow>
                        </PanelBody>
                    ) }


                </InspectorControls>
                <StyledContainer templateID={templateID} css={sectionCss} allTemplates={ALL_TEMPLATES}>
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

const getAnchorTargetInfo = (values, ref) => {
    if (values) {
        return {
            callback: () => {
                if (ref && ref.current) {
                    ref.current.scrollIntoView({
                        behavior: 'smooth',
                    });
                }
            },
            content: `anchor: #${values}`,
            style: { cursor: 'pointer' },
        };
    }
};


