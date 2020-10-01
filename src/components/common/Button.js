import React from 'react';

let Button = ({ children, ...props }) => (
	<button type="button" {...props}>
		{children}
	</button>
);

export default Button;
