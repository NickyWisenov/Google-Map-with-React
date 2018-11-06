import React from 'react';
import './BackDrop.css';
const backDrop = props => (
	<div className="backdrop" onClick={props.click}> 
		<ul>
		<li><a href="/">Search</a></li>
		</ul>
	</div>
	
);

export default backDrop;