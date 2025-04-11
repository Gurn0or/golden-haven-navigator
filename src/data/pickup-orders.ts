
// Sample data for vendor pickup orders
export const pickupOrdersData = [
  {
    id: "RP-12345",
    user: "Alex Thompson",
    email: "alex.thompson@example.com",
    kycStatus: "Verified",
    walletId: "0xa1b2c3d4e5f6g7h8i9j0k1l2",
    vendor: "Gold Express Dubai",
    vendorId: "VEN-1001",
    goldWeight: "30g",
    tokenBurnHash: "0x123abc456def789ghi012jkl345mno678pqr",
    vault: "Brinks Dubai",
    status: "Scheduled",
    pickupDate: "2025-04-15",
    timeSlot: "11:00 AM - 1:00 PM",
    pickupCode: "P4R8X2",
    requestedOn: "2025-04-10",
    logs: [
      {
        timestamp: "2025-04-10 13:25 PM",
        status: "Scheduled",
        note: "Pickup scheduled through app"
      }
    ]
  },
  {
    id: "RP-12346",
    user: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    kycStatus: "Verified",
    walletId: "0xb2c3d4e5f6g7h8i9j0k1l2m3",
    vendor: "Singapore Gold Exchange",
    vendorId: "VEN-1002",
    goldWeight: "45g",
    tokenBurnHash: "0x456def789ghi012jkl345mno678pqr901stu",
    vault: "Singapore Vault",
    status: "Picked",
    pickupDate: "2025-04-11",
    timeSlot: "3:00 PM - 5:00 PM",
    pickupCode: "Q5S9Y3",
    requestedOn: "2025-04-09",
    logs: [
      {
        timestamp: "2025-04-09 10:45 AM",
        status: "Scheduled",
        note: "Pickup scheduled through app"
      },
      {
        timestamp: "2025-04-11 15:30 PM",
        status: "Picked",
        note: "Gold picked up by customer, identity verified"
      }
    ]
  },
  {
    id: "RP-12347",
    user: "Daniel Lee",
    email: "daniel.lee@example.com",
    kycStatus: "Verified",
    walletId: "0xc3d4e5f6g7h8i9j0k1l2m3n4",
    vendor: "London Bullion Center",
    vendorId: "VEN-1003",
    goldWeight: "15g",
    tokenBurnHash: "0x789ghi012jkl345mno678pqr901stu234vwx",
    vault: "London Gold",
    status: "Missed",
    pickupDate: "2025-04-09",
    timeSlot: "9:00 AM - 11:00 AM",
    pickupCode: "R6T0Z4",
    requestedOn: "2025-04-07",
    logs: [
      {
        timestamp: "2025-04-07 16:15 PM",
        status: "Scheduled",
        note: "Pickup scheduled through app"
      },
      {
        timestamp: "2025-04-09 11:30 AM",
        status: "Missed",
        note: "Customer did not show up for pickup"
      }
    ]
  },
  {
    id: "RP-12348",
    user: "Sophia Kim",
    email: "sophia.kim@example.com",
    kycStatus: "Pending",
    walletId: "0xd4e5f6g7h8i9j0k1l2m3n4o5",
    vendor: "Gold Express Dubai",
    vendorId: "VEN-1001",
    goldWeight: "60g",
    tokenBurnHash: "0x012jkl345mno678pqr901stu234vwx567yza",
    vault: "Brinks Dubai",
    status: "Cancelled",
    pickupDate: "2025-04-12",
    timeSlot: "1:00 PM - 3:00 PM",
    pickupCode: "S7U1A5",
    requestedOn: "2025-04-08",
    logs: [
      {
        timestamp: "2025-04-08 11:05 AM",
        status: "Scheduled",
        note: "Pickup scheduled through app"
      },
      {
        timestamp: "2025-04-09 14:20 PM",
        status: "Cancelled",
        note: "Cancelled by customer due to travel changes"
      }
    ]
  },
  {
    id: "RP-12349",
    user: "Mohammed Al-Farsi",
    email: "mohammed.alfarsi@example.com",
    kycStatus: "Verified",
    walletId: "0xe5f6g7h8i9j0k1l2m3n4o5p6",
    vendor: "Dubai Gold Souk",
    vendorId: "VEN-1004",
    goldWeight: "100g",
    tokenBurnHash: "0x345mno678pqr901stu234vwx567yza890bcd",
    vault: "Brinks Dubai",
    status: "Scheduled",
    pickupDate: "2025-04-16",
    timeSlot: "5:00 PM - 7:00 PM",
    pickupCode: "T8V2B6",
    requestedOn: "2025-04-10",
    logs: [
      {
        timestamp: "2025-04-10 09:30 AM",
        status: "Scheduled",
        note: "Pickup scheduled through app"
      }
    ]
  }
];
