export interface BookBuddyRequest {
  title?: string;
  author?: string;
  category?: string;
  history?: Array<{ user?: string; ai?: string }>;
  message: string;
}

export interface BookBuddyResponse {
  reply: string;
}
