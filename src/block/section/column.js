/**
 * BLOCK: next24hr-column
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

/** @jsx jsx */
/* global wp, NEXT24HR_ALLOWED_BLOCK_TYPES */

import { Global, jsx } from '@emotion/react';
import { globalCss, StyledColumnLabel, StyledBlockRoot, buttonCss } from './column.style';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { Button, ButtonGroup, Dashicon, PanelBody, PanelRow, RadioControl } = wp.components;

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

registerBlockType('next24hr/column', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Column'), // Block title.
    icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    // this means the block is only allowed as a child of columns block
    parent: ['next24hr/section'],
    attributes: {
        alignment: { type: 'string' },
        direction: { type: 'string' },
        features: { type: 'array', default: ['direction', 'aligment'] },
    },
    keywords: [__('next24hr-column — CGB Block'), __('CGB Example'), __('create-guten-block')],
    edit: function (props) {
        const { setAttributes } = props;

        const { alignment, direction, features } = props.attributes;

        const blockedBlocks = props.blockedBlocks || [];

        const allowedBlocks = !Array.isArray(NEXT24HR_ALLOWED_BLOCK_TYPES)
            ? true
            : NEXT24HR_ALLOWED_BLOCK_TYPES.filter((block) => block !== 'next24hr/section' && block !== 'next24hr/column' && !blockedBlocks.includes(block));

        return (
            <StyledBlockRoot>
                <StyledColumnLabel />
                <Global styles={globalCss} />
                <InspectorControls>
                    { (features.includes('aligment') || features.includes('direction')) && (
                        <PanelBody title={ __( 'Column Options', 'next24hr' ) } >
                            { features.includes('aligment') &&
                                <PanelRow>
                                    <ButtonGroup>
                                        <Button
                                            css={buttonCss}
                                            isLarge
                                            value={'left'}
                                            isPrimary={alignment === 'left'}
                                            onClick={() => setAttributes({alignment: 'left'})}
                                        >
                                            <Dashicon icon="editor-alignleft" />
                                        </Button>
                                        <Button
                                            css={buttonCss}
                                            isLarge
                                            isPrimary={alignment === 'center'}
                                            onClick={() => setAttributes({alignment: 'center'})}
                                        >
                                            <Dashicon icon="editor-aligncenter" />
                                        </Button>
                                        <Button
                                            css={buttonCss}
                                            isLarge
                                            isPrimary={alignment === 'right'}
                                            onClick={() => setAttributes({alignment: 'right'})}
                                        >
                                            <Dashicon icon="editor-alignright" />
                                        </Button>
                                    </ButtonGroup>
                                </PanelRow>
                            }
                            { features.includes('direction') &&
                                <PanelRow>
                                    <RadioControl
                                        label={ __( 'Direction of elements', 'next24hr' ) }
                                        selected={ direction }
                                        options={ [
                                            { label: __( 'Column', 'next24hr' ), value: 'column' },
                                            { label: __( 'Row', 'next24hr' ), value: 'row' },
                                        ] }
                                        onChange={ (value) => props.setAttributes ({direction: value}) }
                                    />
                                </PanelRow>
                            }
                        </PanelBody>
                    )}
                </InspectorControls>

                <InnerBlocks
                    // use the pre-made button block appender (not the default paragraph one)
                    renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    allowedBlocks={allowedBlocks}
                    // if we don't disable template lock, it will be inherited from parent
                    templateLock={false}
                />
            </StyledBlockRoot>
        );
    },

    save: function () {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    },
});
