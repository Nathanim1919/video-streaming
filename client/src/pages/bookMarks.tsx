import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Event } from "../interfaces/event";
import Loader from "../components/Loader";
import { BookMarkedEventCard } from "../components/bookmarkedEventCard";
import { requestHandler } from "../utils";

export const BookMarks = () => {
    const { user } = useAuth();
    const [bookMarks, setBookMarks] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBookMarks = async () => {
            await requestHandler(
                async () => await getBookMarks(),
                setLoading,
                (data: Event[]) => setBookMarks(data),
                () => {}
            )
        };
    }, []);
    
    return (
        <div className="bookMarks">
        <h1>Bookmarks</h1>
        {loading ? (
            <Loader />
        ) : (
            <div className="bookMarksContainer">
            {bookMarks.length > 0 ? (
                bookMarks.map((event) => (
                <BookMarkedEventCard key={event._id} event={event} />
                ))
            ) : (
                <h2>No Bookmarks</h2>
            )}
            </div>
        )}
        </div>
    );
}