export type Bill = {
  id: string;
  bill_number: string;
  farmer_id: string;
  commissioner_id: string;
  product_id: string;
  session_id: string;
  total_quantity: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  other_charges: Record<string, number>;
  net_payable: number;
  payment_status: BillPaymentStatus;
  payment_method?: string;
  payment_date?: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type BillWithDetails = Bill & {
  farmer: {
    id: string;
    name: string;
    phone: string;
    village: string;
  };
  product: {
    id: string;
    name: string;
  };
  auction_items: Array<{
    id: string;
    quantity: number;
    rate: number;
    unit: string;
  }>;
}

export type BillPreview = {
  farmer_id: string;
  product_id: string;
  session_id: string;
  farmer_name: string;
  product_name: string;
  session_date: Date;
  items: Array<{
    id: string;
    quantity: number;
    rate: number;
    unit: string;
    amount: number;
  }>;
  total_quantity: number;
  total_bags: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  suggested_other_charges: Record<string, number>;
  net_payable: number;
}

export type BillGenerateRequest = {
  farmer_id: string;
  previews: Array<{
    product_id: string;
    session_id: string;
    other_charges?: Record<string, number>;
    notes?: string;
  }>;
}

export type BillPaymentRequest = {
  bill_ids: string[];
  payment_method: string;
  notes?: string;
}

export enum BillPaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID'
}


