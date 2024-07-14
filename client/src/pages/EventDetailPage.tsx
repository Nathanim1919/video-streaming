import EventDetail from "../components/EventDetail";
import React from "react";

interface EventDetailPageProps {
  type: "stream" | "event";
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ type }) => {
  return (
    <div>
      <EventDetail type={type} />
    </div>
  );
};

export default EventDetailPage;
