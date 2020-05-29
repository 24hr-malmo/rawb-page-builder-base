import styled from '@emotion/styled';
import { css } from '@emotion/core';

const StyledColumnLabel = styled.div`
    position: absolute;
    top: 0px;
    left: -3px;
    right: -13px;
    bottom: -13px;
    box-shadow: 0px 18px 0px #f3f5f3 inset;
    margin-left: 3px;
    margin-right: 13px;
    &:after {
        position: absolute;
        font-size: 9px;
        opacity: .5;
        top: 1px;
        left: 5px;
        content: 'column';
        font-weight: bold;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    }
`;

const StyledBlockRoot = styled.div`
    background: #fff;
    color: #000;
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    flex: 1;
`;


const buttonCss = css`
	display: inline-flex;
	align-items: center;
`;

export {
    StyledColumnLabel,
    StyledBlockRoot,
    buttonCss,
};
