import { UserInterface } from "./user";

export type ScheduleItem = {
  time: string;
  activity: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type guest = {
  name: string;
  profession: string;
}

export type IEvent = {
  _id?: string;
  title: string;
  time?: string;
  description: string;
  date: string;
  owner?: UserInterface;
  location?: string;
  image?: string;
  price: number;
  capacity: number;
  eventType: string;
  isOnline: boolean;
  isOpenForRsvp: string;
  tags: string[];
  rsvp: string;
  duration: 0,
  guests?: guest[];
  specialInstructions: string;
  schedule?: ScheduleItem[];
  socialLinks?: SocialLink[];
  attendees?: string[];

};


export type IRsvps = {
  _id: string;
  eventId: IEvent;
  userId: UserInterface;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  qrCodeUrl: string;
};



export type IEventForBookMark = {
  type: string;
  item: IEvent;
};
