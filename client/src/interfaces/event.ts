export type ScheduleItem = {
  time: string;
  activity: string;
  [key: string]: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  owner: string;
  location?: string;
  price: number;
  capacity: number;
  eventType: string;
  isOnline: boolean;
  isOpenForRsvp: string;
  tags: string[];
  duration: 0,
  guests: string[];
  specialInstructions: string;
  schedule: ScheduleItem[];
  socialLinks: SocialLink[];
  attendees: string[];
};