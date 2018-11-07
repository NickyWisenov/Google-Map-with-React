import React from 'react';

import './List.css';

const List = props => (
    <ul className="list-group">
        {
            props.items.map(function(item, idx) {
                return <li className="list-group-item" data-lng={item.venue.location.lng} data-lat={item.venue.location.lat} key={idx}>{item.venue.name}</li>
            })
        }
    </ul>
);

export default List;