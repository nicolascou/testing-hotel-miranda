class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name; 
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    for (const {checkIn, checkOut} of this.bookings) {
      if (date > checkIn && date < checkOut) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    let occupiedDays = 0;
    for (const {checkIn, checkOut} of this.bookings) {
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
    return;
  }
  
  static availableRooms(rooms, startDate, endDate) {
    return;
  }
}

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
    return;
  }
}

module.exports = { Room, Booking }