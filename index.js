"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }
    Room.prototype.isOccupied = function (date) {
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var _b = _a[_i], checkIn = _b.checkIn, checkOut = _b.checkOut;
            if (date > checkIn && date < checkOut) {
                return true;
            }
        }
        return false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        var occupiedDays = 0;
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var _b = _a[_i], checkIn = _b.checkIn, checkOut = _b.checkOut;
            if (checkIn <= endDate && checkOut >= startDate) {
                var timeDiff_1 = Math.abs(Math.min(checkOut.getTime(), endDate.getTime()) - Math.max(checkIn.getTime(), startDate.getTime()));
                var diffDays_1 = Math.ceil(timeDiff_1 / (1000 * 3600 * 24));
                occupiedDays += diffDays_1 + 1;
            }
        }
        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return occupiedDays * 100 / (diffDays + 1);
    };
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var roomsPercentages = [];
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
            roomsPercentages.push(room.occupancyPercentage(startDate, endDate));
        }
        var sumOfPercentages = roomsPercentages.reduce(function (acc, cur) { return acc + cur; });
        return parseFloat((sumOfPercentages / roomsPercentages.length).toFixed(2));
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var availableRooms = [];
        for (var _i = 0, rooms_2 = rooms; _i < rooms_2.length; _i++) {
            var room = rooms_2[_i];
            var isAvailable = true;
            for (var _a = 0, _b = room.bookings; _a < _b.length; _a++) {
                var _c = _b[_a], checkIn = _c.checkIn, checkOut = _c.checkOut;
                if (checkIn <= endDate && checkOut >= startDate) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) {
                availableRooms.push(room);
            }
        }
        return availableRooms;
    };
    return Room;
}());
exports.Room = Room;
var Booking = /** @class */ (function () {
    function Booking(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }
    Booking.prototype.getFee = function () {
        var timeDiff = Math.abs(this.checkOut.getTime() - this.checkIn.getTime());
        var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var final_price = (this.room.rate * days) * (1 - this.room.discount / 100) * (1 - this.discount / 100);
        return Math.floor(final_price);
    };
    return Booking;
}());
exports.Booking = Booking;
