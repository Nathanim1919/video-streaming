import EventDetail from "../components/EventDetail";
import { useEffect, useState } from "react";
import { requestHandler } from "../utils";
import { getEvent } from "../api/event";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {eventId} = useParams<{eventId: string}>();


    useEffect(() => {
        const fetchEvent = async () => {
            await requestHandler(
                async () => await getEvent(eventId),
                setIsLoading,
                (res) => setEvent(res.data),
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