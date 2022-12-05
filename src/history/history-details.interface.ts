export interface HistoryDetails {
  id: string;
  date: Date,
  amount: number,
  type: string,
  spendingType: string,
  description: string,
  categoryId: string,
  createdAt: Date;
  updatedAt: Date;
}
