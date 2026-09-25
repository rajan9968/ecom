// Boutique E-Commerce Admin Store Mock Data & Configurations

export const ECOM_OVERVIEW_CARDS = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    subtitle: 'Online Store Sales & Checkout',
    amount: '£48,620.50',
    change: '+14.8% vs last month ↑',
    actionText: 'View sales breakdown',
    theme: 'featured', // Peach-Terracotta Active Card
    icon: 'bag'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    subtitle: '98.4% On-Time Fulfillment',
    amount: '1,428 Orders',
    change: '+8.5% this month ↑',
    actionText: 'Manage pending orders',
    theme: 'white',
    icon: 'package'
  },
  {
    id: 'aov',
    title: 'Average Order Value',
    subtitle: 'Items per basket: 2.4 units',
    amount: '£58.40',
    change: '+5.2% vs target ↑',
    actionText: 'View basket insights',
    theme: 'white',
    icon: 'trending'
  }
];

export const TOP_SELLING_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Sophie Ellis-Bextor Pink Satin Pyjama Set',
    category: 'Sophie Collab',
    price: '£62.00',
    unitsSold: 342,
    revenue: '£21,204.00',
    stockStatus: 'Low Stock',
    stockCount: 4,
    image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg'
  },
  {
    id: 'prod-2',
    title: 'Womens Navy Ticking Stripe Gauze Set',
    category: 'Womens Pyjamas',
    price: '£46.00',
    unitsSold: 268,
    revenue: '£12,328.00',
    stockStatus: 'In Stock',
    stockCount: 38,
    image: 'https://www.theirnibs.com/cdn/shop/files/29.WomensOversizePyjamasNavyTickingStripeShot0036.jpg'
  },
  {
    id: 'prod-3',
    title: 'Sophie Ellis-Bextor Pink Satin Dressing Gown',
    category: 'Robes & Gowns',
    price: '£60.00',
    unitsSold: 194,
    revenue: '£11,640.00',
    stockStatus: 'In Stock',
    stockCount: 16,
    image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-bextor_Dressing_Gown.jpg'
  },
  {
    id: 'prod-4',
    title: 'Mens Cotton Traditional Charcoal Mushroom',
    category: 'Mens Nightwear',
    price: '£46.00',
    unitsSold: 162,
    revenue: '£7,452.00',
    stockStatus: 'In Stock',
    stockCount: 24,
    image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/mens_grey_mushroom_traditional_pyjamas_detail.jpg'
  }
];

export const REVENUE_CHART_DATA = {
  monthly: [
    { label: 'Jan', value: 28, amount: '£28,400.00' },
    { label: 'Feb', value: 32, amount: '£32,150.00' },
    { label: 'Mar', value: 44, amount: '£44,300.00' },
    { label: 'Apr', value: 36, amount: '£36,200.00' },
    { label: 'May', value: 41, amount: '£41,800.00' },
    { label: 'Jun', value: 38, amount: '£38,900.00' },
    { 
      label: 'Jul', 
      value: 52, 
      amount: '£48,620.50',
      active: true, 
      date: 'Current Month (July 2026)',
      cashflow: '£48,620.50',
      inflow: '+1,428 orders' 
    }
  ],
  weekly: [
    { label: 'Week 1', value: 25, amount: '£10,200.00' },
    { label: 'Week 2', value: 34, amount: '£12,450.00' },
    { label: 'Week 3', value: 42, amount: '£14,100.00' },
    { 
      label: 'Week 4', 
      value: 50, 
      amount: '£11,870.50', 
      active: true, 
      date: 'Final Week of July',
      cashflow: '£11,870.50',
      inflow: '+384 orders' 
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9024',
    customer: 'Emma Watson',
    email: 'emma.w@gmail.com',
    location: 'London, UK',
    avatarBg: '#EAAFA0',
    itemSummary: 'Sophie x Pink Satin Pyjamas (M) x 1',
    itemCount: 1,
    date: 'Today',
    time: '02:45 PM',
    amount: '£62.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped'
  },
  {
    id: 'ORD-9023',
    customer: 'Charlotte Smith',
    email: 'c.smith@outlook.com',
    location: 'Edinburgh, UK',
    avatarBg: '#BA6C5A',
    itemSummary: 'Navy Stripe Gauze Set (S) x 2',
    itemCount: 2,
    date: 'Today',
    time: '11:15 AM',
    amount: '£92.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing'
  },
  {
    id: 'ORD-9022',
    customer: 'James Anderson',
    email: 'james.a@yahoo.co.uk',
    location: 'Manchester, UK',
    avatarBg: '#8E3E2F',
    itemSummary: 'Mens Charcoal Mushroom Set (L) x 1',
    itemCount: 1,
    date: 'Yesterday',
    time: '06:30 PM',
    amount: '£46.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered'
  },
  {
    id: 'ORD-9021',
    customer: 'Sophie Taylor',
    email: 's.taylor@icloud.com',
    location: 'Bristol, UK',
    avatarBg: '#DE9B8B',
    itemSummary: 'Sophie Satin Dressing Gown (M) x 1',
    itemCount: 1,
    date: 'Yesterday',
    time: '03:20 PM',
    amount: '£60.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped'
  },
  {
    id: 'ORD-9020',
    customer: 'Oliver Davies',
    email: 'o.davies@proton.me',
    location: 'Bath, UK',
    avatarBg: '#9CA3AF',
    itemSummary: 'Square Neck Cotton Nightdress (M) x 1',
    itemCount: 1,
    date: '23 Sep, 2026',
    time: '04:15 PM',
    amount: '£56.00',
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Unfulfilled'
  },
  {
    id: 'ORD-9019',
    customer: 'Lucy Walker',
    email: 'lucy.w@gmail.com',
    location: 'Oxford, UK',
    avatarBg: '#C5705D',
    itemSummary: 'Read My Lips Satin Short Set (S) x 1',
    itemCount: 1,
    date: '22 Sep, 2026',
    time: '01:10 PM',
    amount: '£58.00',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered'
  }
];

export const DATE_FILTER_OPTIONS = [
  'This Month',
  'Last 7 Days',
  'Last 30 Days',
  'This Quarter',
  'Year to Date'
];

export const CATEGORY_BREAKDOWN = [
  { name: 'Womens Pyjamas', percentage: 48, revenue: '£23,340' },
  { name: 'Sophie Collab', percentage: 26, revenue: '£12,640' },
  { name: 'Mens Nightwear', percentage: 16, revenue: '£7,780' },
  { name: 'Robes & Loungewear', percentage: 10, revenue: '£4,860' }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-101',
    name: 'Emma Watson',
    email: 'emma.w@gmail.com',
    location: 'London, UK',
    ordersCount: 6,
    totalSpent: '£364.00',
    joinedDate: 'Jan 2026',
    status: 'VIP Customer',
    avatarBg: '#EAAFA0'
  },
  {
    id: 'CUST-102',
    name: 'Charlotte Smith',
    email: 'c.smith@outlook.com',
    location: 'Edinburgh, UK',
    ordersCount: 4,
    totalSpent: '£218.00',
    joinedDate: 'Mar 2026',
    status: 'Active',
    avatarBg: '#BA6C5A'
  },
  {
    id: 'CUST-103',
    name: 'James Anderson',
    email: 'james.a@yahoo.co.uk',
    location: 'Manchester, UK',
    ordersCount: 3,
    totalSpent: '£138.00',
    joinedDate: 'Apr 2026',
    status: 'Active',
    avatarBg: '#8E3E2F'
  },
  {
    id: 'CUST-104',
    name: 'Sophie Taylor',
    email: 's.taylor@icloud.com',
    location: 'Bristol, UK',
    ordersCount: 5,
    totalSpent: '£295.00',
    joinedDate: 'Feb 2026',
    status: 'VIP Customer',
    avatarBg: '#DE9B8B'
  },
  {
    id: 'CUST-105',
    name: 'Oliver Davies',
    email: 'o.davies@proton.me',
    location: 'Bath, UK',
    ordersCount: 1,
    totalSpent: '£56.00',
    joinedDate: 'Sep 2026',
    status: 'New',
    avatarBg: '#9CA3AF'
  },
  {
    id: 'CUST-106',
    name: 'Lucy Walker',
    email: 'lucy.w@gmail.com',
    location: 'Oxford, UK',
    ordersCount: 2,
    totalSpent: '£116.00',
    joinedDate: 'Jun 2026',
    status: 'Active',
    avatarBg: '#C5705D'
  }
];

export const INITIAL_DISCOUNTS = [
  {
    id: 'DISC-01',
    code: 'SLEEP20',
    discount: '20% Off',
    type: 'Percentage',
    appliesTo: 'All Womens Pyjamas',
    redemptions: 142,
    status: 'Active',
    expiry: '31 Dec 2026'
  },
  {
    id: 'DISC-02',
    code: 'WELCOME10',
    discount: '10% Off',
    type: 'First Order',
    appliesTo: 'Sitewide Order',
    redemptions: 389,
    status: 'Active',
    expiry: 'Ongoing'
  },
  {
    id: 'DISC-03',
    code: 'SOPHIE15',
    discount: '15% Off',
    type: 'Collab Exclusive',
    appliesTo: 'Sophie Ellis-Bextor Collection',
    redemptions: 88,
    status: 'Active',
    expiry: '15 Nov 2026'
  }
];

