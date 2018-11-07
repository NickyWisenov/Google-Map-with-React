import React from 'react';
import List from './List';

import './BackDrop.css';

class BackDrop extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialItems: this.props.venues,
			items: []
		}
	}

	componentWillMount () {
		this.setState({
			items: this.state.initialItems
		});
	}

	filterList = (event) => {
		var updatedList = this.props.venues;
		updatedList = updatedList.filter(function(item){
		  return item.venue.name.toLowerCase().search(
			event.target.value.toLowerCase()) !== -1;
		});
		this.setState({items: updatedList});
	}


	render() {
		return (
			<div className="backdrop" onClick={this.props.click}>
				<input type="text" id="autocomplete" placeholder="Search Restauraunt" onChange={this.filterList}/>
				<List items={this.state.items} />
			</div>
		)
	}
}

export default BackDrop;




