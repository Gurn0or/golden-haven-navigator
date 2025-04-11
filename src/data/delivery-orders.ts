
// Sample data for home delivery orders
export const deliveryOrdersData = [
  {
    id: "RD-34562",
    user: "John Smith",
    email: "john.smith@example.com",
    kycStatus: "Verified",
    walletId: "0x8f7a9b2c3d4e5f6g7h8i9j0k",
    goldWeight: "25g",
    tokenBurnHash: "0xabc123def456ghi789jkl012mno345pqr678stu",
    vault: "Brinks Dubai",
    status: "App Approved",
    deliveryAddress: "123 Palm Avenue, Downtown, Dubai",
    postalCode: "12345",
    contactNumber: "+971 55 123 4567",
    deliveryMode: "Standard",
    requestedOn: "2025-04-09",
    logs: [
      {
        timestamp: "2025-04-09 10:30 AM",
        status: "App Approved",
        note: "Redemption request approved through app"
      }
    ]
  },
  {
    id: "RD-34563",
    user: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    kycStatus: "Verified",
    walletId: "0x2a3b4c5d6e7f8g9h0i1j2k3l",
    goldWeight: "50g",
    tokenBurnHash: "0xdef456ghi789jkl012mno345pqr678stu901vwx",
    vault: "Singapore Vault",
    status: "Out for Delivery",
    deliveryAddress: "456 Orchard Road, #12-34, Singapore",
    landmark: "Near Orchard MRT",
    postalCode: "238865",
    contactNumber: "+65 9876 5432",
    deliveryMode: "Express",
    deliveryPartner: "ShipSecure",
    awbNumber: "SS12345678",
    requestedOn: "2025-04-08",
    logs: [
      {
        timestamp: "2025-04-08 14:45 PM",
        status: "App Approved",
        note: "Redemption request approved through app"
      },
      {
        timestamp: "2025-04-09 09:30 AM",
        status: "Out for Delivery",
        note: "Package handed to ShipSecure, AWB: SS12345678"
      }
    ]
  },
  {
    id: "RD-34564",
    user: "Michael Chen",
    email: "michael.chen@example.com",
    kycStatus: "Verified",
    walletId: "0x3c4d5e6f7g8h9i0j1k2l3m4n",
    goldWeight: "100g",
    tokenBurnHash: "0xghi789jkl012mno345pqr678stu901vwx234yz",
    vault: "London Gold",
    status: "Delivered",
    deliveryAddress: "789 Baker Street, London, UK",
    postalCode: "W1U 6TJ",
    contactNumber: "+44 7123 456789",
    deliveryMode: "Standard",
    deliveryPartner: "Brinks",
    awbNumber: "BR98765432",
    requestedOn: "2025-04-07",
    logs: [
      {
        timestamp: "2025-04-07 11:20 AM",
        status: "App Approved",
        note: "Redemption request approved through app"
      },
      {
        timestamp: "2025-04-08 10:15 AM",
        status: "Out for Delivery",
        note: "Package handed to Brinks, AWB: BR98765432"
      },
      {
        timestamp: "2025-04-10 14:30 PM",
        status: "Delivered",
        note: "Package delivered and signed by recipient"
      }
    ]
  },
  {
    id: "RD-34565",
    user: "Emily Davis",
    email: "emily.davis@example.com",
    kycStatus: "Pending",
    walletId: "0x4d5e6f7g8h9i0j1k2l3m4n5o",
    goldWeight: "10g",
    tokenBurnHash: "0xjkl012mno345pqr678stu901vwx234yz567abc",
    vault: "Singapore Vault",
    status: "Cancelled",
    deliveryAddress: "321 Thomson Road, Singapore",
    postalCode: "574623",
    contactNumber: "+65 8765 4321",
    deliveryMode: "Standard",
    requestedOn: "2025-04-06",
    logs: [
      {
        timestamp: "2025-04-06 16:10 PM",
        status: "App Approved",
        note: "Redemption request approved through app"
      },
      {
        timestamp: "2025-04-07 11:45 AM",
        status: "Cancelled",
        note: "Cancelled by customer due to address change"
      }
    ]
  },
  {
    id: "RD-34566",
    user: "James Wilson",
    email: "james.wilson@example.com",
    kycStatus: "Verified",
    walletId: "0x5e6f7g8h9i0j1k2l3m4n5o6p",
    goldWeight: "75g",
    tokenBurnHash: "0xmno345pqr678stu901vwx234yz567abc890def",
    vault: "Brinks Dubai",
    status: "App Approved",
    deliveryAddress: "567 Sheikh Zayed Road, Business Bay, Dubai",
    landmark: "Near Dubai Mall",
    postalCode: "12345",
    contactNumber: "+971 50 987 6543",
    deliveryMode: "Express",
    requestedOn: "2025-04-10",
    logs: [
      {
        timestamp: "2025-04-10 09:15 AM",
        status: "App Approved",
        note: "Redemption request approved through app"
      }
    ]
  }
];
