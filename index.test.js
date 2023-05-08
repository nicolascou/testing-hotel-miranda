const { Room, Booking } = require('./index.js');

const room1 = new Room('r1', bookings, 130, 0);

const bookings = [
  new Booking('b1', 'test1@mail.com', new Date('2023-04-27'), new Date('2023-04-28'), 0, room1),
  new Booking('b2', 'test2@mail.com', new Date('2023-05-01'), new Date('2023-05-03'), 0, room1),
  new Booking('b3', 'test3@mail.com', new Date('2023-05-05'), new Date('2023-05-07'), 0, room1),
]

describe('room methods', () => {
  test('room is occupied', () => {
    const date = new Date('2023-05-02');
    expect(room1.isOccupied(date)).toBe(true);
  });
  test('room is free', () => {
    const date = new Date('2023-05-04');
    expect(room1.isOccupied(date)).toBe(false);
  });
});