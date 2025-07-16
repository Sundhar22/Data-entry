export type BillItem = {
  id: string;
  billId: string;
  auctionItemId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
