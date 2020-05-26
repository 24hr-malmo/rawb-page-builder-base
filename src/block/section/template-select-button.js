// import React from 'react';

/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const { Button } = wp.components;

const templateSelect = ( props ) => {
	return (
		<Button
			css={ css`
                display: flex;
                justify-content: center;
                width: 26%;
                margin: 0.1rem;
                border-radius: 10%;
                border: ${ props.active ? '2px solid #11a0d2;' : '2px solid white;' }
                &:hover {
                background: #5bc6ed;
                }
            ` }
			onClick={ props.clicked }>
			{ props.icon }
		</Button>
	);
};

export default templateSelect;
