const { Room, Booking } = require('./index.js');

const rooms = [
  new Room('room1', bookings, 130, 0),
  new Room('room2', bookings, 200, 0),
  new Room('room3', bookings, 300, 0),
]

const bookings = [
  new Booking('booking1', 'john@mail.com', new Date('2023-04-27'), new Date('2023-04-28'), 0, rooms[0]),
  new Booking('booking2', 'wayne@mail.com', new Date('2023-05-01'), new Date('2023-05-03'), 0, rooms[0]),
  new Booking('booking3', 'wilson@mail.com', new Date('2023-05-05'), new Date('2023-05-07'), 0, rooms[0]),

  new Booking('booking4', 'mariah@mail.com', new Date('2023-04-20'), new Date('2023-04-26'), 0, rooms[1]),
  new Booking('booking5', 'jeff@mail.com', new Date('2023-04-27'), new Date('2023-04-30'), 0, rooms[1]),
  new Booking('booking6', 'taylor@mail.com', new Date('2023-05-04'), new Date('2023-05-06'), 0, rooms[1]),

  new Booking('booking7', 'roger@mail.com', new Date('2023-04-20'), new Date('2023-04-23'), 0, rooms[2]),
  new Booking('booking8', 'david@mail.com', new Date('2023-05-04'), new Date('2023-05-08'), 0, rooms[2]),
]

describe('room methods', () => {
  test('room is occupied', () => {
    const date = new Date('2023-05-02');
    expect(rooms[0].isOccupied(date)).toBe(true);
  });
  test('room is free', () => {
    const date = new Date('2023-05-04');
    expect(rooms[0].isOccupied(date)).toBe(false);
  });
  
  test('room has 75% of occupancy', () => {
    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-05-08');
    expect(rooms[0].occupancyPercentage(startDate, endDate)).toBe(75);
  });
  test('room has 20% of occupancy', () => {
    const startDate = new Date('2023-04-20');
    const endDate = new Date('2023-04-30');
    expect(rooms[0].occupancyPercentage(startDate, endDate)).toBe(20);
  });

  test('room 1 is available', () => {
    const startDate = new Date('2023-04-20');
    const endDate = new Date('2023-04-25');
    expect(Room.availableRooms(rooms, startDate, endDate)).toBe([rooms[0]]);
  });
  test('room 2 and 3 are available', () => {
    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-05-03');
    expect(Room.availableRooms(rooms, startDate, endDate)).toBe([rooms[2], rooms[3]]);
  });
});