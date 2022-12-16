export interface HistoryDetails {
  id: string;
  date: Date,
  amount: number,
  type: string,
  targetType: string,
  targetId: string,
  description: string,
  categoryId: string,
  createdAt: Date;
  updatedAt: Date;
}
