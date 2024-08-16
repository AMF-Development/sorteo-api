export interface PaymentNotification {
  action: string;
  api_version: string;
  data: { id: string };
  date_created: string;
  id: number;
  live_mode: true;
  type: string;
  user_id: string;
}
