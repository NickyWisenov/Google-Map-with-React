import React from 'react';
import './DrawerToggle.css';
const drawerToggle = props => (
	<button className="toggle-button" onClick={props.click}> 
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
	</button>
	
);

export default drawerToggle;