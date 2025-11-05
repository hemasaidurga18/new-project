import React from 'react'
import RoomCard from './RoomCard'

const RoomList = ({ rooms, onBook }) => (
  <div>
    {rooms.map((room) => (
      <RoomCard key={room.id} room={room} onBook={onBook} />
    ))}
  </div>
)

export default RoomList
