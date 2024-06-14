import { UserInterface } from "./user";

export interface IStream {
  _id: string;
  title: string;
  streamer: string;
  date: string;
  description: string;
  location: string;
  attendees: string[];
  isOpenForRsvp: string;
  status: string;
  eventType: string;
  capacity: number;
  price: number;
  isOnline: boolean;
  tags: string[];
  duration: number;
  guests: [
    {
      name: string;
      profession: string;
      imageUrl: string;
    }
  ];
  specialInstructions: string;
  schedule: [
    {
      time: string;
      activity: string;
    }
  ];
  socialLinks: [
    {
      platform: string;
      url: string;
    }
  ];
  owner: UserInterface;
}
