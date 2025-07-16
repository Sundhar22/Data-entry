export type AuctionItem = {

  id: string;
  session_id: string;
  farmer_id: string;
  product_id: string;
  unit: UnitType;
  quantity: number;
  final_price: number;
  buyer_id: string;
  created_at: Date;
  updated_at: Date;

}

export enum UnitType {
  KG = "KG",
  BUNDLE = "BUNDLE",
  PIECE = "PIECE",
  LITRE = "LITRE",
  DOZEN = "DOZEN",
  BOX = "BOX",
  OTHER = "OTHER",
}
