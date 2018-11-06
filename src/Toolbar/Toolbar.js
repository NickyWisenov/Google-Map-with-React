import React, {Component} from 'react';
import DrawerToggle from '../Drawer/DrawerToggle.js';
import './Toolbar.css';
const toolbar = props => (
	<header className="toolbar">
		<nav className="toolbar__navigation">
			<div>
				<DrawerToggle click={props.drawerHandler}/>
			</div>
			<div className="toolbar__logo"><a href="/">MY NEIGHBOURHOOD APP</a> </div>
			<div className="spacer" />
		</nav>
	</header>
	
	);

export default toolbar;
