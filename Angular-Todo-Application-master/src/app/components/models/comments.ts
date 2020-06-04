export class comments {

  id: number;
  type: string;
  author_id: number;
  body: string;
  html_body: string;
  plain_body: string;
  public: boolean;
  audit_id: number;
  created_at: string;
  via: {
    channel: string;
    source:{
      from: string;
      to: string;
      rel: string;
    }
  }
  attachments: [];
  metadata: {
    system: {
      client: string,
      ip_address: string,
      location: string,
      latitude: number,
      longitude: number
      },
    custom: {}
  }
}
