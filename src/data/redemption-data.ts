
export interface Redemption {
  requestId: string;
  user: {
    name: string;
    email: string;
    avatar: string;
    walletId: string;
  };
  goldWeight: number;
  vaultLocation: string;
  status: 'submitted' | 'verified' | 'approved' | 'shipped' | 'completed' | 'rejected';
  mode: 'pickup' | 'delivery';
  requestedOn: string;
}

export const redemptionData: Redemption[] = [
  {
    requestId: "RED-78934",
    user: {
      name: "Maria Johnson",
      email: "mjohnson@example.com",
      avatar: "https://i.pravatar.cc/150?u=1",
      walletId: "0x83c72d819A2F8306d0C9453D7A8a4D61B9e6dc23"
    },
    goldWeight: 112.34,
    vaultLocation: "london",
    status: "completed",
    mode: "pickup",
    requestedOn: "2023-09-12T14:22:18Z"
  },
  {
    requestId: "RED-78935",
    user: {
      name: "Robert Chen",
      email: "rchen@example.com",
      avatar: "https://i.pravatar.cc/150?u=2",
      walletId: "0x94d72b819A2F8306d0C9453D7A8a4D61B9e2fa45"
    },
    goldWeight: 50.00,
    vaultLocation: "dubai",
    status: "shipped",
    mode: "delivery",
    requestedOn: "2023-09-15T09:12:43Z"
  },
  {
    requestId: "RED-78936",
    user: {
      name: "Sarah Kim",
      email: "skim@example.com",
      avatar: "https://i.pravatar.cc/150?u=3",
      walletId: "0x2fc73a819A2F8306d0C9453D7A8a4D61B9e7bc12"
    },
    goldWeight: 250.12,
    vaultLocation: "singapore",
    status: "approved",
    mode: "pickup",
    requestedOn: "2023-09-16T11:32:56Z"
  },
  {
    requestId: "RED-78937",
    user: {
      name: "John Smith",
      email: "jsmith@example.com",
      avatar: "https://i.pravatar.cc/150?u=4",
      walletId: "0xabd74c819A2F8306d0C9453D7A8a4D61B9e3de56"
    },
    goldWeight: 75.25,
    vaultLocation: "",
    status: "verified",
    mode: "delivery",
    requestedOn: "2023-09-18T15:45:22Z"
  },
  {
    requestId: "RED-78938",
    user: {
      name: "David Wong",
      email: "dwong@example.com",
      avatar: "https://i.pravatar.cc/150?u=5",
      walletId: "0x63e72f819A2F8306d0C9453D7A8a4D61B9e8gh34"
    },
    goldWeight: 30.45,
    vaultLocation: "",
    status: "submitted",
    mode: "pickup",
    requestedOn: "2023-09-19T08:17:39Z"
  },
  {
    requestId: "RED-78939",
    user: {
      name: "Lisa Taylor",
      email: "ltaylor@example.com",
      avatar: "https://i.pravatar.cc/150?u=6",
      walletId: "0x12g72h819A2F8306d0C9453D7A8a4D61B9e9ij78"
    },
    goldWeight: 500.00,
    vaultLocation: "zurich",
    status: "rejected",
    mode: "delivery",
    requestedOn: "2023-09-10T13:27:51Z"
  },
  {
    requestId: "RED-78940",
    user: {
      name: "Michael Brown",
      email: "mbrown@example.com",
      avatar: "https://i.pravatar.cc/150?u=7",
      walletId: "0x45k72l819A2F8306d0C9453D7A8a4D61B9e0mn12"
    },
    goldWeight: 125.75,
    vaultLocation: "london",
    status: "shipped",
    mode: "delivery",
    requestedOn: "2023-09-14T16:39:05Z"
  },
  {
    requestId: "RED-78941",
    user: {
      name: "Jessica Lee",
      email: "jlee@example.com",
      avatar: "https://i.pravatar.cc/150?u=8",
      walletId: "0x78o72p819A2F8306d0C9453D7A8a4D61B9e1qr34"
    },
    goldWeight: 80.50,
    vaultLocation: "dubai",
    status: "completed",
    mode: "pickup",
    requestedOn: "2023-09-08T10:52:14Z"
  },
  {
    requestId: "RED-78942",
    user: {
      name: "Ahmed Hassan",
      email: "ahassan@example.com",
      avatar: "https://i.pravatar.cc/150?u=9",
      walletId: "0x90s72t819A2F8306d0C9453D7A8a4D61B9e2uv56"
    },
    goldWeight: 150.25,
    vaultLocation: "",
    status: "verified",
    mode: "delivery",
    requestedOn: "2023-09-17T12:24:37Z"
  },
  {
    requestId: "RED-78943",
    user: {
      name: "Emma Wilson",
      email: "ewilson@example.com",
      avatar: "https://i.pravatar.cc/150?u=10",
      walletId: "0x34w72x819A2F8306d0C9453D7A8a4D61B9e3yz78"
    },
    goldWeight: 95.75,
    vaultLocation: "singapore",
    status: "approved",
    mode: "pickup",
    requestedOn: "2023-09-16T09:15:49Z"
  }
];
