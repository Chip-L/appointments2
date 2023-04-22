const today = new Date();
const at = (hours) => today.setHours(hours, 0);
export const sampleAppointments = [
  {
    startsAt: at(9),
    customer: {
      firstName: "Charlie",
      lastName: "Brown",
      phoneNumber: "907-555-1234",
    },
    stylist: "Joan",
    service: "Cut",
    notes: "Use a #8",
  },
  {
    startsAt: at(10),
    customer: {
      firstName: "Frankie",
      lastName: "Avalon",
      phoneNumber: "720-555-1234",
    },
    stylist: "Joan",
    service: "Cut",
    notes: "Use a #2",
  },
  {
    startsAt: at(11),
    customer: {
      firstName: "Casey",
      lastName: "Jones",
      phoneNumber: "303-555-1234",
    },
    stylist: "Joan",
    service: "Cut",
    notes: "Use a #5",
  },
  {
    startsAt: at(12),
    customer: {
      firstName: "Ashley",
      lastName: "Benson",
      phoneNumber: "406-555-1234",
    },
    stylist: "Joan",
    service: "Style",
    notes: "",
  },
  {
    startsAt: at(13),
    customer: {
      firstName: "Jordan",
      lastName: "Sparks",
      phoneNumber: "907-555-9874",
    },
    stylist: "Joan",
    service: "Dye",
    notes: "Black",
  },
  {
    startsAt: at(14),
    customer: {
      firstName: "Jay",
      lastName: "Bird",
      phoneNumber: "406-555-9874",
    },
    stylist: "Joan",
    service: "Cut",
    notes: "Use a #1",
  },
  {
    startsAt: at(15),
    customer: {
      firstName: "Alex",
      lastName: "Dominguez",
      phoneNumber: "303-555-9874",
    },
    stylist: "Joan",
    service: "Cut",
    notes: "lorem ipsum",
  },
  {
    startsAt: at(16),
    customer: {
      firstName: "Jules",
      lastName: "Verne",
      phoneNumber: "720-555-9874",
    },
    stylist: "Joan",
    service: "Dye",
    notes: "Used blue last time",
  },
  {
    startsAt: at(17),
    customer: {
      firstName: "Stevie",
      lastName: "Wonder",
      phoneNumber: "907-555-0000",
    },
    stylist: "Joan",
    service: "Shave",
    notes: "real close",
  },
];
