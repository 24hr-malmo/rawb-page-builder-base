import styled from '@emotion/styled';
import { TEMPLATE_OPTIONS, DEFAULT_TEMPLATE_INDEX } from './template-options';

const StyledContainer = styled.div`
    margin: 0 auto;
    margin-top: 2rem;
    max-width: 1100px;
    position: relative;
    & > div > div.editor-block-list__layout {
        display: grid;
        grid-template-columns: ${ p => p.templateID ? TEMPLATE_OPTIONS[ p.templateID ].style : TEMPLATE_OPTIONS[ DEFAULT_TEMPLATE_INDEX ].style };
        grid-column-gap: 14px;
        background-color: #e6eae7;
        padding: 0;
        margin-right: 0;
        margin-left: 0;
        padding-top: 6px;
        & > div.wp-block {
            padding-right: 0px;
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-top: 0px;
            & > div.block-editor-block-list__block-edit {
                margin-top: 0px;
                margin-left: 0px;
                margin-right: 0px;
                min-height: 100%;
                display: flex;
            }
            & > div.editor-block-list__insertion-point {
                top: 32px;
            }
        }
        & > div.wp-block:last-child {
            box-shadow: none;
            border-right: 0;
            padding-right: 0px;
        }
        & > div > div > div.block-editor-block-contextual-toolbar {
            display: none;
        }
        & > div > div.block-editor-block-list__block-edit:before {
            left: 0;
            right: 0;
            top: 0;
            z-index: 1;
            bottom: 0;
        }
        & > div > div.block-editor-block-list__block-edit > div {
            margin-top: 0px;
            padding-top: 0px;
            margin-bottom: 0px;
            width: 100%;
            flex: 1;
        }
    }
`;

const StyledBlockRoot = styled.div`
    position: relative;
    margin-bottom: 2rem;
    margin-top: 2rem;
`;

const StyledSectionLabel = styled.div`
    position: absolute;
    top: -13px;
    left: -14px;
    right: -13px;
    bottom: -13px;
    box-shadow: 0px 0px 0px 18px #e6eae7 inset;
    &:after {
        position: absolute;
        font-size: 9px;
        opacity: .5;
        top: 2px;
        left: 5px;
        content: 'section';
        font-weight: bold;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    }
`;

const StyledInfoBox = styled.div`
    position: absolute;
    top: -15px;
    right: 0px;
    z-index: 10;
    font-size: 12px;
`;

export {
    StyledContainer,
    StyledBlockRoot,
    StyledSectionLabel,
    StyledInfoBox,
};
