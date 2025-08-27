export type AuctionSession = {
  id: string;
  date: Date;
  commissioner_id: string;
  status: AuctionSessionStatus;
  created_at: Date;
  updated_at: Date;
};

export enum AuctionSessionStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
