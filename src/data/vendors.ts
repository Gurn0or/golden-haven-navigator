
// Sample data for vendors
export const vendorsData = [
  {
    id: "VEN-1001",
    name: "Gold Express Dubai",
    location: "Downtown Dubai",
    address: "123 Sheikh Mohammed Bin Rashid Blvd",
    city: "Dubai",
    zip: "12345",
    contactPerson: "Ahmed Hassan",
    phone: "+971 55 123 4567",
    email: "ahmed@goldexpressdubai.com",
    status: "Active",
    acceptingOrders: true,
    timeSlots: [
      { day: "Monday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM"] },
      { day: "Friday", slots: ["3:00 PM - 5:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Saturday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM"] },
      { day: "Sunday", slots: [] }
    ],
    activeOrders: 2,
    linkedVaults: ["Brinks Dubai"],
    deliveryType: "Only Pickup",
    activeOrdersList: [
      {
        id: "RP-12345",
        user: "Alex Thompson",
        pickupDate: "2025-04-15",
        timeSlot: "11:00 AM - 1:00 PM",
        goldWeight: "30g"
      },
      {
        id: "RP-12349",
        user: "Mohammed Al-Farsi",
        pickupDate: "2025-04-16",
        timeSlot: "5:00 PM - 7:00 PM",
        goldWeight: "100g"
      }
    ]
  },
  {
    id: "VEN-1002",
    name: "Singapore Gold Exchange",
    location: "Marina Bay",
    address: "456 Marina Boulevard, #15-01",
    city: "Singapore",
    zip: "018987",
    contactPerson: "Li Wei",
    phone: "+65 9876 5432",
    email: "liwei@singaporegold.com",
    status: "Active",
    acceptingOrders: true,
    timeSlots: [
      { day: "Monday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Friday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"] },
      { day: "Saturday", slots: ["11:00 AM - 1:00 PM"] },
      { day: "Sunday", slots: [] }
    ],
    activeOrders: 0,
    linkedVaults: ["Singapore Vault"],
    deliveryType: "Both",
    notes: "Premier partner with excellent service record. Offers additional services like gold assessment and certification."
  },
  {
    id: "VEN-1003",
    name: "London Bullion Center",
    location: "Mayfair",
    address: "789 Bond Street",
    city: "London",
    zip: "W1S 1RS",
    contactPerson: "James Thornton",
    phone: "+44 7123 456789",
    email: "james@londonbullion.co.uk",
    status: "Active",
    acceptingOrders: true,
    timeSlots: [
      { day: "Monday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Friday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"] },
      { day: "Saturday", slots: [] },
      { day: "Sunday", slots: [] }
    ],
    activeOrders: 0,
    linkedVaults: ["London Gold"],
    deliveryType: "Both"
  },
  {
    id: "VEN-1004",
    name: "Dubai Gold Souk",
    location: "Deira",
    address: "321 Gold Souk Road",
    city: "Dubai",
    zip: "54321",
    contactPerson: "Fatima Al-Maktoum",
    phone: "+971 50 987 6543",
    email: "fatima@dubaigoldsouk.ae",
    status: "Active",
    acceptingOrders: true,
    timeSlots: [
      { day: "Monday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Tuesday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Wednesday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Thursday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Friday", slots: ["5:00 PM - 7:00 PM"] },
      { day: "Saturday", slots: ["11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
      { day: "Sunday", slots: ["1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] }
    ],
    activeOrders: 1,
    linkedVaults: ["Brinks Dubai"],
    deliveryType: "Only Pickup",
    activeOrdersList: [
      {
        id: "RP-12349",
        user: "Mohammed Al-Farsi",
        pickupDate: "2025-04-16",
        timeSlot: "5:00 PM - 7:00 PM",
        goldWeight: "100g"
      }
    ]
  },
  {
    id: "VEN-1005",
    name: "Zurich Gold Services",
    location: "Bahnhofstrasse",
    address: "123 Bahnhofstrasse",
    city: "Zurich",
    zip: "8001",
    contactPerson: "Hans Mueller",
    phone: "+41 78 123 4567",
    email: "hans@zurichgold.ch",
    status: "Suspended",
    acceptingOrders: false,
    timeSlots: [
      { day: "Monday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"] },
      { day: "Saturday", slots: [] },
      { day: "Sunday", slots: [] }
    ],
    activeOrders: 0,
    linkedVaults: ["Zurich Safe"],
    deliveryType: "Delivery Support",
    notes: "Temporarily suspended due to compliance review. Expected to resume service by next month."
  }
];
