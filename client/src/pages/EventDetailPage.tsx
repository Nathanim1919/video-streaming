import EventDetail from "../components/EventDetail";
import React, { useEffect, useState } from "react";
import { requestHandler } from "../utils";
import { getEvent } from "../api/event";
import {getStream} from '../api/stream';
import { useParams } from "react-router-dom";

interface EventDetailPageProps {
    type: 'stream' | 'event';
  }


const EventDetailPage: React.FC<EventDetailPageProps> = ({type}) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {eventId} = useParams<{eventId: string}>();


    useEffect(() => {
        const endPoint = type === 'stream' ? getStream : getEvent;
        const fetchEvent = async () => {
            await requestHandler(
                async () => await endPoint(eventId as string),
                setIsLoading,
                (res) => setEvent(res.data as Event),
                (err) => console.log(err)
            )
        }
        fetchEvent();
    }, []);

    return (
        <div>
        <EventDetail event={event}/>
        </div>
    );
}


export default EventDetailPage;