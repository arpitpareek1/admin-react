export interface AllData {
  userInfo: UserInfo[]
  transactionsInfo: TransactionsInfo[]
  withdrawalInfo: WithdrawalInfo[]
  products: Products[]
  news: News[]
  settings: Settings[]
}

export interface userAllData {
  userInfo: UserInfo
  transactionsInfo: TransactionsInfo[]
  withdrawalInfo: WithdrawalInfo[]
}

export interface Settings {
  _id: string
  key: string
  value: string
  __v: number
}

export interface UserInfo {
  isRefered: boolean
  lastRedeem?: string
  _id: string
  name: string
  email: string
  password: string
  phone: string
  money: number
  role: number
  approved: boolean
  referralCode: string
  userReferCode: string
  referredBy?: string
  createdAt: string
  updatedAt: string
  __v: number
  address?: string
}

export interface News {
  _id: string
  title: string
  date: string
  description: string
  imageSource: string
  category: string
}

export interface TransactionsInfo {
  _id: string
  userId: string
  amount: number
  product_name: string
  transaction_id: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface Products {
  _id: string
  imageSource: string
  link: string
  price: number
  title: string
  dailyIncome: number
  validity: number
  purchaseLimit: number
  desc: string
  isHot: boolean
  __v: number
}

export interface WithdrawalInfo {
  _id: string
  userId: string
  amount: number
  status: string
  cardInfo?: string
  ifsc?: string
  bank_name?: string
  upi_id?: string
  createdAt: string
  updatedAt: string
  __v: number
}
