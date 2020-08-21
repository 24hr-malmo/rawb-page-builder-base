import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';


const StyledColumnLabel = styled.div`
    position: relative;
    background-color: #f3f5f3;
    height: 20px;
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: 2rem;
    &:after {
        position: absolute;
        top: 2px;
        left: 8px;
        font-size: 9px;
        opacity: .5;
        content: 'column';
        font-weight: bold;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    }
`;

const StyledBlockRoot = styled.div`
    background-color: white; 
    color: #000;
    display: block;
    width: 100%;
    padding: 0px 16px 8px;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    flex: 1;
`;


const buttonCss = css`
	display: inline-flex;
	align-items: center;
`;

const globalCss = css`
    div[data-type="next24hr/column"] {
        width: 100%;
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;

export {
    StyledColumnLabel,
    StyledBlockRoot,
    buttonCss,
    globalCss,
};
