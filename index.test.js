"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var rooms = [
    new index_1.Room('room1', [], 13000, 50),
    new index_1.Room('room2', [], 20000, 40),
    new index_1.Room('room3', [], 30000, 60),
];
var bookings = [
    new index_1.Booking('booking1', 'john@mail.com', new Date('2023-04-27'), new Date('2023-04-28'), 12, rooms[0]),
    new index_1.Booking('booking2', 'wayne@mail.com', new Date('2023-05-01'), new Date('2023-05-03'), 14, rooms[0]),
    new index_1.Booking('booking3', 'wilson@mail.com', new Date('2023-05-05'), new Date('2023-05-07'), 13, rooms[0]),
    new index_1.Booking('booking4', 'mariah@mail.com', new Date('2023-04-20'), new Date('2023-04-26'), 10, rooms[1]),
    new index_1.Booking('booking5', 'jeff@mail.com', new Date('2023-04-27'), new Date('2023-04-30'), 15, rooms[1]),
    new index_1.Booking('booking6', 'taylor@mail.com', new Date('2023-05-04'), new Date('2023-05-06'), 14, rooms[1]),
    new index_1.Booking('booking7', 'roger@mail.com', new Date('2023-04-20'), new Date('2023-04-23'), 5, rooms[2]),
    new index_1.Booking('booking8', 'david@mail.com', new Date('2023-05-04'), new Date('2023-05-08'), 8, rooms[2]),
];
rooms.forEach(function (room) {
    room.bookings = bookings.filter(function (booking) { return booking.room === room; });
});
describe('isOccupied()', function () {
    test('room is occupied', function () {
        var date = new Date('2023-05-02');
        expect(rooms[0].isOccupied(date)).toBe(true);
    });
    test('room is free', function () {
        var date = new Date('2023-05-04');
        expect(rooms[0].isOccupied(date)).toBe(false);
    });
});
describe('occupancyPercentage()', function () {
    test('room has 75% of occupancy', function () {
        var startDate = new Date('2023-05-01');
        var endDate = new Date('2023-05-08');
        expect(rooms[0].occupancyPercentage(startDate, endDate)).toBe(75);
    });
    test('room has 20% of occupancy', function () {
        var startDate = new Date('2023-04-20');
        var endDate = new Date('2023-04-29');
        expect(rooms[0].occupancyPercentage(startDate, endDate)).toBe(20);
    });
});
describe('totalOccupancyPercentage()', function () {
    test('hotel has 58.3% of occupancy', function () {
        var startDate = new Date('2023-05-01');
        var endDate = new Date('2023-05-08');
        expect(index_1.Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(58.33);
    });
    test('hotel has 42.86% of occupancy', function () {
        var startDate = new Date('2023-04-25');
        var endDate = new Date('2023-05-01');
        expect(index_1.Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(42.86);
    });
});
describe('availableRooms()', function () {
    test('room 1 is available', function () {
        var startDate = new Date('2023-04-20');
        var endDate = new Date('2023-04-25');
        expect(index_1.Room.availableRooms(rooms, startDate, endDate)).toStrictEqual([rooms[0]]);
    });
    test('room 2 and 3 are available', function () {
        var startDate = new Date('2023-05-01');
        var endDate = new Date('2023-05-03');
        expect(index_1.Room.availableRooms(rooms, startDate, endDate)).toStrictEqual([rooms[1], rooms[2]]);
    });
});
describe('getFee()', function () {
    test('fee is equal to 11180 cents', function () {
        expect(bookings[1].getFee()).toBe(11180);
    });
    test('fee is equal to 306 cents', function () {
        expect(bookings[4].getFee()).toBe(30600);
    });
    test('fee is equal to 44160 cents', function () {
        expect(bookings[7].getFee()).toBe(44160);
    });
});
