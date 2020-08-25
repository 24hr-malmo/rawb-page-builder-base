import styled from '@emotion/styled';
import { TEMPLATE_OPTIONS, DEFAULT_TEMPLATE_INDEX } from './template-options';

const StyledContainer = styled.div`
    margin: 0 auto;
    max-width: 1100px;
    position: relative;
    & > div > .block-editor-block-list__layout {
        display: grid;
        grid-template-columns: ${ p => p.templateID ? TEMPLATE_OPTIONS[ p.templateID ].style : TEMPLATE_OPTIONS[ DEFAULT_TEMPLATE_INDEX ].style };
        grid-column-gap: 8px;
    }
`;

const StyledBlockRoot = styled.div`
    position: relative;
    margin-bottom: 2rem;
    margin-top: 2rem;
    padding: 2px 8px 8px;
    background-color: #ffffff;
    box-shadow: inset 8px 18px 0px #e6eae7, inset -8px -8px 0px #e6eae7;
`;

const StyledSectionLabel = styled.div`
    position: relative;
    height: 16px;
    &:after {
        position: absolute;
        font-size: 9px;
        opacity: .5;
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
