"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }
    isOccupied(date) {
        for (const { checkIn, checkOut } of this.bookings) {
            if (date > checkIn && date < checkOut) {
                return true;
            }
        }
        return false;
    }
    occupancyPercentage(startDate, endDate) {
        let occupiedDays = 0;
        for (const { checkIn, checkOut } of this.bookings) {
            if (checkIn <= endDate && checkOut >= startDate) {
                const timeDiff = Math.abs(Math.min(checkOut.getTime(), endDate.getTime()) - Math.max(checkIn.getTime(), startDate.getTime()));
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                occupiedDays += diffDays + 1;
            }
        }
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return occupiedDays * 100 / (diffDays + 1);
    }
    static totalOccupancyPercentage(rooms, startDate, endDate) {
        const roomsPercentages = [];
        for (const room of rooms) {
            roomsPercentages.push(room.occupancyPercentage(startDate, endDate));
        }
        const sumOfPercentages = roomsPercentages.reduce((acc, cur) => acc + cur);
        return parseFloat((sumOfPercentages / roomsPercentages.length).toFixed(2));
    }
    static availableRooms(rooms, startDate, endDate) {
        const availableRooms = [];
        for (const room of rooms) {
            let isAvailable = true;
            for (const { checkIn, checkOut } of room.bookings) {
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
    }
}
exports.Room = Room;
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }
    getFee() {
        const timeDiff = Math.abs(this.checkOut.getTime() - this.checkIn.getTime());
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const final_price = (this.room.rate * days) * (1 - this.room.discount / 100) * (1 - this.discount / 100);
        return Math.floor(final_price);
    }
}
exports.Booking = Booking;
