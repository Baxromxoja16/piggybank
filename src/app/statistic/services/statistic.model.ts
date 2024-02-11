export interface IStatistics {
  _id: string
  totalIncome: number
  totalExpenses: number
  totalSavings: number
  totalPercentOfSavings: number
  categoryStats: ICategoryStats[]
}

export interface ICategoryStats {
  category: string[]
  categoryAmount: number
}
