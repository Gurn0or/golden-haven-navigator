
interface Transaction {
  id: string;
  date: string;
  amount: number;
  token: 'eAurum' | 'USDT';
  status: 'completed' | 'pending' | 'failed';
  type: 'buy' | 'sell' | 'withdrawals' | 'redemptions';
}

interface LoginHistory {
  date: string;
  ip: string;
  device: string;
  location: string;
}

interface Alert {
  title: string;
  description: string;
}

interface WalletSecurity {
  recoverySetup: 'Done' | 'Pending';
  biometricSetup: boolean;
  mpcSharesActive: number;
  mpcSharesTotal: number;
}

interface WalletUser {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Wallet {
  id: string;
  user: WalletUser;
  eAurum: number;
  usdt: number;
  status: 'active' | 'suspended' | 'flagged';
  createdAt: string;
  device?: string;
  mintOrigin?: 'Minted' | 'Airdropped' | 'Manual';
  onchainAddress?: string;
  security: WalletSecurity;
  transactions?: Transaction[];
  loginHistory?: LoginHistory[];
  alerts?: Alert[];
}

export const walletData: Wallet[] = [
  {
    id: "0x83f7ad0a1cf347d5e980dc2",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatar: ""
    },
    eAurum: 1240.50,
    usdt: 5680.75,
    status: "active",
    createdAt: "2023-09-15T12:30:00Z",
    device: "iPhone 13 Pro",
    mintOrigin: "Minted",
    onchainAddress: "0x743e2d5c19e38c7a18fe2",
    security: {
      recoverySetup: "Done",
      biometricSetup: true,
      mpcSharesActive: 3,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_7a2b8c3d4e5f",
        date: "2023-12-10T08:15:00Z",
        amount: 500,
        token: "eAurum",
        status: "completed",
        type: "buy"
      },
      {
        id: "tx_9g8h7i6j5k4l",
        date: "2023-11-25T14:30:00Z",
        amount: 200,
        token: "eAurum",
        status: "completed",
        type: "sell"
      },
      {
        id: "tx_3m2n1o0p9q8r",
        date: "2023-10-15T16:45:00Z",
        amount: 1000,
        token: "USDT",
        status: "completed",
        type: "withdrawals"
      }
    ],
    loginHistory: [
      {
        date: "2024-01-05T09:23:15Z",
        ip: "192.168.1.1",
        device: "iPhone 13 Pro",
        location: "New York, USA"
      },
      {
        date: "2023-12-28T18:45:30Z",
        ip: "192.168.1.2",
        device: "MacBook Pro",
        location: "New York, USA"
      },
      {
        date: "2023-12-15T11:10:45Z",
        ip: "192.168.1.3",
        device: "Chrome / Windows",
        location: "New York, USA"
      }
    ]
  },
  {
    id: "0x94e8b31c72d59a60f48e3a1",
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      avatar: ""
    },
    eAurum: 378.25,
    usdt: 1250.00,
    status: "active",
    createdAt: "2023-10-20T09:45:00Z",
    device: "Samsung Galaxy S22",
    mintOrigin: "Airdropped",
    onchainAddress: "0x851f4c3b2a7d6e09s8p7o",
    security: {
      recoverySetup: "Done",
      biometricSetup: true,
      mpcSharesActive: 3,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_5s4t3u2v1w0x",
        date: "2024-01-02T10:20:00Z",
        amount: 100,
        token: "eAurum",
        status: "completed",
        type: "buy"
      },
      {
        id: "tx_9y8z7a6b5c4d",
        date: "2023-12-18T13:40:00Z",
        amount: 50,
        token: "eAurum",
        status: "pending",
        type: "redemptions"
      }
    ],
    loginHistory: [
      {
        date: "2024-01-04T15:30:20Z",
        ip: "203.0.113.42",
        device: "Samsung Galaxy S22",
        location: "Los Angeles, USA"
      },
      {
        date: "2023-12-30T12:15:10Z",
        ip: "203.0.113.43",
        device: "Chrome / Windows",
        location: "Los Angeles, USA"
      }
    ]
  },
  {
    id: "0x75c4d3e2f1a0b9c8d7e6f5",
    user: {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 234-5678",
      avatar: ""
    },
    eAurum: 0,
    usdt: 320.50,
    status: "suspended",
    createdAt: "2023-11-05T16:15:00Z",
    device: "Google Pixel 6",
    mintOrigin: "Manual",
    onchainAddress: "0x963e2d1c0b9a8f7g6h5j",
    security: {
      recoverySetup: "Pending",
      biometricSetup: false,
      mpcSharesActive: 2,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_3e2f1g0h9i8j7k",
        date: "2023-12-05T11:30:00Z",
        amount: 200,
        token: "eAurum",
        status: "failed",
        type: "buy"
      }
    ],
    loginHistory: [
      {
        date: "2023-12-25T08:45:30Z",
        ip: "198.51.100.27",
        device: "Google Pixel 6",
        location: "Chicago, USA"
      }
    ],
    alerts: [
      {
        title: "Recovery Not Set",
        description: "User has not completed recovery setup process. Account at risk."
      },
      {
        title: "MPC Desync Detected",
        description: "Only 2 of 3 MPC shares are active. Security downgraded."
      }
    ]
  },
  {
    id: "0x62a1b0c9d8e7f6g5h4i3j2",
    user: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 876-5432",
      avatar: ""
    },
    eAurum: 825.75,
    usdt: 3000.25,
    status: "flagged",
    createdAt: "2023-08-12T14:20:00Z",
    device: "iPhone 12",
    mintOrigin: "Minted",
    onchainAddress: "0x741d2e3f4g5h6i7j8k9l",
    security: {
      recoverySetup: "Done",
      biometricSetup: true,
      mpcSharesActive: 3,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_1k2l3m4n5o6p7q",
        date: "2023-12-22T09:50:00Z",
        amount: 500,
        token: "USDT",
        status: "completed",
        type: "withdrawals"
      },
      {
        id: "tx_8r9s0t1u2v3w4x",
        date: "2023-12-15T16:35:00Z",
        amount: 200,
        token: "eAurum",
        status: "completed",
        type: "sell"
      },
      {
        id: "tx_5y6z7a8b9c0d1e",
        date: "2023-12-05T11:20:00Z",
        amount: 300,
        token: "eAurum",
        status: "completed",
        type: "buy"
      }
    ],
    loginHistory: [
      {
        date: "2024-01-03T17:25:40Z",
        ip: "172.16.254.1",
        device: "iPhone 12",
        location: "Miami, USA"
      },
      {
        date: "2023-12-29T14:10:05Z",
        ip: "172.16.254.2",
        device: "Safari / MacOS",
        location: "Miami, USA"
      }
    ],
    alerts: [
      {
        title: "High Withdrawal Volume",
        description: "Unusual withdrawal activity detected in the past week."
      }
    ]
  },
  {
    id: "0x51j2k3l4m5n6o7p8q9r0s",
    user: {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 345-6789",
      avatar: ""
    },
    eAurum: 1650.00,
    usdt: 0,
    status: "active",
    createdAt: "2023-07-25T10:10:00Z",
    device: "Samsung Galaxy S21",
    mintOrigin: "Minted",
    onchainAddress: "0x852e3f4g5h6i7j8k9l0m",
    security: {
      recoverySetup: "Done",
      biometricSetup: true,
      mpcSharesActive: 3,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_9t0u1v2w3x4y5z",
        date: "2023-12-30T15:45:00Z",
        amount: 500,
        token: "eAurum",
        status: "completed",
        type: "buy"
      },
      {
        id: "tx_6a7b8c9d0e1f2g",
        date: "2023-12-20T12:30:00Z",
        amount: 250,
        token: "eAurum",
        status: "completed",
        type: "buy"
      }
    ],
    loginHistory: [
      {
        date: "2024-01-04T10:15:25Z",
        ip: "198.51.100.41",
        device: "Samsung Galaxy S21",
        location: "Dallas, USA"
      },
      {
        date: "2023-12-28T09:05:50Z",
        ip: "198.51.100.42",
        device: "Chrome / Android",
        location: "Dallas, USA"
      }
    ]
  },
  {
    id: "0x43t2u1v0w9x8y7z6a5b4c",
    user: {
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 456-7890",
      avatar: ""
    },
    eAurum: 105.25,
    usdt: 750.50,
    status: "active",
    createdAt: "2023-12-01T08:40:00Z",
    device: "iPhone 14 Pro",
    mintOrigin: "Airdropped",
    onchainAddress: "0x963f4g5h6i7j8k9l0m1n",
    security: {
      recoverySetup: "Pending",
      biometricSetup: false,
      mpcSharesActive: 3,
      mpcSharesTotal: 3
    },
    transactions: [
      {
        id: "tx_3h4i5j6k7l8m9n",
        date: "2023-12-25T13:15:00Z",
        amount: 100,
        token: "eAurum",
        status: "completed",
        type: "buy"
      }
    ],
    loginHistory: [
      {
        date: "2024-01-01T16:40:10Z",
        ip: "203.0.113.56",
        device: "iPhone 14 Pro",
        location: "Seattle, USA"
      }
    ],
    alerts: [
      {
        title: "Recovery Not Set",
        description: "User has not completed recovery setup process. Account at risk."
      }
    ]
  }
];
