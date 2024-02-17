export interface IStatistics {
  _id: string
  totalIncome: number
  totalExpenses: number
  totalSavings: number
  totalPercentOfSavings: number
  allMonths: ICategoryStats[]
}

export interface ICategoryStats {
  monthYear: string
  totalIncome: string
  totalExpenses: string
  totalSavings: string
  totalPercentOfSavings: string
  categoryStats: string
  categoryAmount: number
}

export interface MonthYear {
  start: string
  end: string
}
