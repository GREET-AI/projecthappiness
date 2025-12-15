export interface VoteItem {
  id: string;
  name: string;
  organization: string;
  description: string;
  votes: number;
  badge: "supporter" | "guardian" | "god";
}

export interface Transaction {
  hash: string;
  date: string;
  type: "Donation" | "Distribution" | "Trading Fee";
  amount: number;
}

export interface Winner {
  id: string;
  name: string;
  organization: string;
  date: string;
  votes: number;
  amount: number;
  txHash: string;
}

export const mockVotes: VoteItem[] = [
  {
    id: "1",
    name: "Building Schools in Africa",
    organization: "Education for All Foundation",
    description:
      "Constructing 5 new schools in rural Africa to provide education for over 1,000 children. Every donation goes directly to building materials and teacher salaries.",
    votes: 12450,
    badge: "god",
  },
  {
    id: "2",
    name: "Clean Water Initiative",
    organization: "Water for Life",
    description:
      "Installing water wells in 10 villages across Southeast Asia. Each well serves 500+ people and provides clean, safe drinking water.",
    votes: 8920,
    badge: "guardian",
  },
  {
    id: "3",
    name: "Food Bank Support",
    organization: "Community Food Network",
    description:
      "Supporting local food banks to provide meals for 5,000 families this month. Focus on fresh produce and nutritional meals.",
    votes: 6540,
    badge: "supporter",
  },
  {
    id: "4",
    name: "Medical Supplies",
    organization: "Global Health Alliance",
    description:
      "Delivering essential medical supplies to clinics in underserved areas. Includes vaccines, medications, and equipment.",
    votes: 5230,
    badge: "supporter",
  },
  {
    id: "5",
    name: "Animal Rescue",
    organization: "Paws & Claws Sanctuary",
    description:
      "Rescuing and rehabilitating abandoned animals. Building new facilities and providing veterinary care for 200+ animals.",
    votes: 4120,
    badge: "supporter",
  },
  {
    id: "6",
    name: "Reforestation Project",
    organization: "Green Earth Initiative",
    description:
      "Planting 10,000 trees in deforested areas. Each tree is tracked and monitored for growth. Long-term carbon capture program.",
    votes: 3890,
    badge: "guardian",
  },
];

export const mockTransactions: Transaction[] = [
  {
    hash: "5KJp8...mN9qR",
    date: "2024-01-15 14:23",
    type: "Donation",
    amount: 5000,
  },
  {
    hash: "3HxL2...pQ7wT",
    date: "2024-01-15 13:45",
    type: "Trading Fee",
    amount: 1250,
  },
  {
    hash: "9MzK4...rT8vN",
    date: "2024-01-15 12:10",
    type: "Distribution",
    amount: 10000,
  },
  {
    hash: "2BnP6...sV5mX",
    date: "2024-01-15 11:30",
    type: "Donation",
    amount: 2500,
  },
  {
    hash: "7FqR9...tW8yZ",
    date: "2024-01-15 10:15",
    type: "Trading Fee",
    amount: 890,
  },
  {
    hash: "4DmS3...uX9aB",
    date: "2024-01-15 09:20",
    type: "Donation",
    amount: 15000,
  },
  {
    hash: "8GtV5...vY2cD",
    date: "2024-01-15 08:45",
    type: "Trading Fee",
    amount: 2100,
  },
  {
    hash: "1CnM7...wZ4eF",
    date: "2024-01-15 07:30",
    type: "Distribution",
    amount: 8500,
  },
  {
    hash: "6EpQ8...xA5gH",
    date: "2024-01-15 06:15",
    type: "Donation",
    amount: 3200,
  },
  {
    hash: "0BkL9...yB6iJ",
    date: "2024-01-15 05:00",
    type: "Trading Fee",
    amount: 1750,
  },
];

export const mockWinners: Winner[] = [
  {
    id: "1",
    name: "Building Schools in Africa",
    organization: "Education for All Foundation",
    date: "2024-01-14",
    votes: 12450,
    amount: 12500,
    txHash: "5KJp8...mN9qR",
  },
  {
    id: "2",
    name: "Clean Water Initiative",
    organization: "Water for Life",
    date: "2024-01-13",
    votes: 8920,
    amount: 10000,
    txHash: "3HxL2...pQ7wT",
  },
  {
    id: "3",
    name: "Food Bank Support",
    organization: "Community Food Network",
    date: "2024-01-12",
    votes: 6540,
    amount: 7500,
    txHash: "9MzK4...rT8vN",
  },
  {
    id: "4",
    name: "Medical Supplies",
    organization: "Global Health Alliance",
    date: "2024-01-11",
    votes: 5230,
    amount: 6000,
    txHash: "2BnP6...sV5mX",
  },
  {
    id: "5",
    name: "Animal Rescue",
    organization: "Paws & Claws Sanctuary",
    date: "2024-01-10",
    votes: 4120,
    amount: 5000,
    txHash: "7FqR9...tW8yZ",
  },
];

