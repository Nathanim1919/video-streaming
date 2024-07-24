import { useEffect, useState } from "react";
import { Event } from "../interfaces/event";
import Loader from "../components/Loader";
import { BookMarkedEventCard } from "../components/bookmarkedEventCard";
import { requestHandler } from "../utils";
import { getBookMarks } from "../api/auth";
import styled from "styled-components";

export const BookMarks = () => {
  const [bookMarks, setBookMarks] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookMarks = async () => {
      await requestHandler(
        async () => await getBookMarks(),
        setLoading,
        (data) => {
          console.log(data);
          setBookMarks(data.data as Event[]);
        },
        () => {}
      );
    };

    fetchBookMarks();
  }, []);


  return (
    <Container className="bookMarks">
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
    </Container>
  );
};


const Container = styled.div`
  display: grid;
  color: #fff;
  width: 60vw;
  height: 90vh;
  overflow-y: auto;
  margin: 0 auto;
    h1 {
        margin: 2rem 0;
        font-size: 2rem;
        position: sticky;
        top: 0;
        background-color: #0e0e0e;
        z-index: 10;
        backdrop-filter: blur(10px);
        padding: 1rem;
    }
`;
