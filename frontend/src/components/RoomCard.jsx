import React from 'react'

const RoomCard = ({ room, onBook }) => (
  <div className="room-card">
    <img src={room.image} alt={room.name} className="room-image" />
    <h3>{room.name}</h3>
    <p className="room-description">{room.description}</p>
    <p><strong>Type:</strong> {room.type}</p>
    <p><strong>Price:</strong> ₹{room.price}/night</p>
    <div className="amenities">
      <strong>Amenities:</strong>
      <ul>
        {room.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
    <button onClick={() => onBook(room)}>Book Now</button>
  </div>
)

export default RoomCard
