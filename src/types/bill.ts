export type Bill = {

  id: string;
  sessionId: string;
  farmerId: string;
  totalAmount: number;
  commissionAmount: number;
  netAmount: number;
  billDate: string;
  paymentStatus: PaymentStatus;
  printedAt: string;
  paidAt: string;
  creartedAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {

  UNPAID = 'UNPAID',
  PAID = 'PAID'

}


