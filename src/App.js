import React,  { Component } from 'react' 
import './App.css'
import axios from 'axios'
import Header from './navigation.js'
import Toolbar from './Toolbar/Toolbar.js'
import SideDrawer from './Drawer/SideDrawer.js'
// import BackDrop from './Drawer/BackDrop.js'
import List from './Drawer/List'

const map = null;

class App extends Component {
	
	state = {
		venues: null,
		sideDrawerOpen: false,
		items: []
	}
	
	componentDidMount() {
		this.getVenues();
	}
	
	drawerHandler = () => {
		this.setState((prevState) => {
			return {sideDrawerOpen: !prevState.sideDrawerOpen};
		})
	}

	backdropHandler = () => {
		// this.setState({sideDrawerOpen: false});
	}

	renderMap = () =>  {
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBI4BeN8U277dOF689OezKrM27tYlGu0Zk&v=3&libraries=places,geometry&language=en&callback=initMap")
		window.initMap= this.initMap
	}
	
	getVenues = () => {
		const endPoint = "https://api.foursquare.com/v2/venues/explore?"
		const Prmtrs = {
			client_id: "ZOXOCJJ2PAOBDT3OD2IX4RCGO5GZBJWO3OJIMKMQUM2G3ATN",
			client_secret: "OAHFQ0DEPHVAG3UXJ13TZJSYGGKG0RHZNPUR45UXWIYOVRAS",
			query: "food",
			near : "kolkata",
			v: "20182507"
		}
		
		axios.get(endPoint + new URLSearchParams(Prmtrs))
			.then(response => {
					this.setState({ 
						venues: response.data.response.groups[0].items,
						items: response.data.response.groups[0].items,
					}, this.renderMap() )
			})
			.catch(error => {
				console.log("Error: " + error)
			});
	}

	initMap = () =>  {
		//Map
        this.map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 22.4629461, lng: 88.39675360000001},
			zoom: 12
		})

		//Infowindow
		var infowindow = new window.google.maps.InfoWindow();
		//Display Markers
		this.state.venues.map(myVenue => {
			var contentString = `${myVenue.venue.name}`
	
			//Marker
			var marker = new window.google.maps.Marker({
				position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
				map: this.map,
				title: myVenue.venue.name			
			})
			//Marker on click
			marker.addListener('click', function() {
				infowindow.setContent(contentString)
				infowindow.open(this.map, marker)
			})
		});

		// Search Box
		// this.searchBox = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));
		// this.searchBox.addListener('place_changed', this.handlePlaceSelect);

	}

	// handlePlaceSelect = () => {
	// 	let addressObject = this.searchBox.getPlace();
	// 	let address = addressObject.address_components;
		

	// 	// Check if address is valid
	// 	if (address) {
	// 	  // Set State
	// 	  console.log(address);
	// 	}
	// }

	filterList = (event) => {
		var updatedList = this.state.venues;
		updatedList = updatedList.filter(function(item){
		  return item.venue.name.toLowerCase().search(
			event.target.value.toLowerCase()) !== -1;
		});
		this.setState({items: updatedList});
	}



	render() {
		// let backDrop;
		// if (this.state.sideDrawerOpen){
		// 	backDrop = <BackDrop click={this.backdropHandler}/>;
		// }
		return (
		<div className="App">
			<Toolbar drawerHandler= {this.drawerHandler} />
			<SideDrawer show={this.sideDrawerOpen} />
			{
				this.state.venues === null ? 
                <div>Loading</div>
				:
				<div className="backdrop">
					<input type="text" id="autocomplete" placeholder="Search Restauraunt" onChange={this.filterList}/>
					<List items={this.state.items} />
				</div>
			}

			<main style={{marginTop: '64px'}}>
				<div id="map"></div>
			</main>
		</div>
		)
	}
}

	
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
async defer></script>

*/
	
	
function loadScript(url) {
	var indx = window.document.getElementsByTagName("script")[0]	
	var scrpt = window.document.createElement("script")
	scrpt.src = url
	scrpt.async = true
	scrpt.defer = true
	indx.parentNode.insertBefore(scrpt,indx)
}
	
export default App;
	
