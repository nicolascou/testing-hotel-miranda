export class Room { 
  constructor(
    private name: string, 
    public bookings: Booking[], 
    public rate: number, 
    public discount: number
  ) {}

  public isOccupied(date: Date) {
    for (const {checkIn, checkOut} of this.bookings) {
      if (date > checkIn && date < checkOut) {
        return true;
      }
    }
    return false;
  }

  public occupancyPercentage(startDate: Date, endDate: Date) {
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

  public static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date) {
    const roomsPercentages: number[] = [];
    for (const room of rooms) {
      roomsPercentages.push(room.occupancyPercentage(startDate, endDate));
    }
    const sumOfPercentages = roomsPercentages.reduce((acc, cur) => acc + cur);
    return parseFloat((sumOfPercentages / roomsPercentages.length).toFixed(2));
  }
  
  public static availableRooms(rooms: Room[], startDate: Date, endDate: Date) {
    const availableRooms: Room[] = [];
    for (const room of rooms) {
      let isAvailable = true;
      for (const {checkIn, checkOut} of room.bookings) {
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

export class Booking {
  constructor(
    private name: string, 
    private email: string, 
    public checkIn: Date, 
    public checkOut: Date, 
    public discount: number, 
    public room: Room
  ) {}

  public getFee() {
    const timeDiff = Math.abs(this.checkOut.getTime() - this.checkIn.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const final_price = (this.room.rate * days) * (1 - this.room.discount / 100) * (1 - this.discount / 100);
    return Math.floor(final_price);
  }
}