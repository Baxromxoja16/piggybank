export interface ITransaction {
  type: string;
  title: string;
  amount: number;
  description?: string;
  date_of_operation: Date;
  categories: string[];
  accountId: string;
  payee?: string;
  createdAt?: string
}
