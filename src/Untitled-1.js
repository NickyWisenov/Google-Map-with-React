import React,  { Component } from 'react' 
import './App.css'
import axios from 'axios'
import Header from './navigation.js'
import Toolbar from './Toolbar/Toolbar.js'
import SideDrawer from './Drawer/SideDrawer.js'
// import BackDrop from './Drawer/BackDrop.js'
import List from './Drawer/List'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			venues: null,
			sideDrawerOpen: false,
			items: [],
			markers: [],
			imgdata: null,
			opacity: 0
		}

		this.itemClickHandler =  this.itemClickHandler.bind(this);
		this.initMarkers = this.initMarkers.bind(this);
	}

	
	componentDidMount() {
		this.getVenues();
	}
	
	drawerHandler = () => {
		this.setState((prevState) => {
			return {sideDrawerOpen: !prevState.sideDrawerOpen};
		})
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

		this.map.addListener('click', () => {
			this.setState({
				opacity: 0
			})
		});

		this.initMarkers(this.state.items);


		// Search Box
		// this.searchBox = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));
		// this.searchBox.addListener('place_changed', this.handlePlaceSelect);
	}

	initMarkers = (items) => {
		var markers = [];

		for (var i = 0; i < this.state.markers.length; i++) {
			this.state.markers[i].setMap(null);
		}

		this.setState({
			markers: []
		});

		//Infowindow
		var infowindow = new window.google.maps.InfoWindow();
		//Display Markers
		items.map(myVenue => {
			var contentString = `${myVenue.venue.name}`
			//Marker
			var marker = new window.google.maps.Marker({
				position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
				map: this.map,
				title: myVenue.venue.name			
			});
			//Marker on click
			marker.addListener('click', () => {
				infowindow.setContent(contentString);
				infowindow.open(this.map, marker);
				this.itemClickHandler(marker, true);
			});

			this.state.markers.push(marker);
		});

		window.google.maps.event.addListener(infowindow, 'closeclick', () => {
			this.setState({
				opacity: 0
			})
		});


	}

	filterList = (event) => {
		this.setState({
			opacity: 0
		});
		var updatedList = this.state.venues;
		updatedList = updatedList.filter(function(item){
		  return item.venue.name.toLowerCase().search(
			event.target.value.toLowerCase()) !== -1;
		});
		this.setState({items: updatedList}, this.initMarkers(updatedList));
	}

	itemClickHandler = (event, ifMarker) => {
		var lat, lng;

		if (ifMarker) {
			lng = event.getPosition().lng();
			lat = event.getPosition().lat();
		} else {
			lng = event.target.getAttribute('data-lng');
			lat = event.target.getAttribute('data-lat');
			var title = event.target.getAttribute('data-title');

			for (var i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].getTitle() === title) {
					window.google.maps.event.trigger(this.state.markers[i], 'click');
				}
			}
		}
		
		axios
			.get(
			  'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + lat + ',' + lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBI4BeN8U277dOF689OezKrM27tYlGu0Zk',
			  { responseType: 'arraybuffer' },
			)
			.then(response => {
			  const base64 = btoa(
				new Uint8Array(response.data).reduce(
				  (data, byte) => data + String.fromCharCode(byte),
				  '',
				),
			  );
			  this.setState({ 
				  imgdata: "data:;base64," + base64,
				  opacity: 1
				});
			});
	}

	render() {
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
						<List items={this.state.items} itemClickHandler={(e) => this.itemClickHandler(e, false)}/>
					</div>
				}

				<main style={{marginTop: '64px'}}>
					<div id="map"></div>
				</main>
				<div className="img-div" style={{opacity: this.state.opacity}}>
					<img id="target" src={this.state.imgdata} />
				</div>
			</div>
		)
	}
}
	
function loadScript(url) {
	var indx = window.document.getElementsByTagName("script")[0]	
	var scrpt = window.document.createElement("script")
	scrpt.src = url
	scrpt.async = true
	scrpt.defer = true
	indx.parentNode.insertBefore(scrpt,indx)
}
	
export default App;
	
