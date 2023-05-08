class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name; 
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    return;
  }

  occupancyPercentage(startDate, endDate) {
    return;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    return;
  }
  
  static availableRooms(rooms, startDate, endDate) {
    return;
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room=null) {
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