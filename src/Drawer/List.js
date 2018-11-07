import React from 'react';

import './List.css';

const List = props => (
    <ul className="list-group">
        {
            props.items.map(function(item, idx) {
                return <li className="list-group-item" data-title={item.venue.name} data-lng={item.venue.location.lng} data-lat={item.venue.location.lat} key={idx} onClick={props.itemClickHandler}>{item.venue.name}</li>
            })
        }
    </ul>
);

export default List;