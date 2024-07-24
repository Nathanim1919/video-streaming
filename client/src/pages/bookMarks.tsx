import { useEffect, useState } from "react";
import { Event, IEventForBookMark } from "../interfaces/event";
import Loader from "../components/Loader";
import { BookMarkedEventCard } from "../components/bookmarkedEventCard";
import { requestHandler } from "../utils";
import { getBookMarks } from "../api/auth";
import styled from "styled-components";
import { removeFromBookMark } from "../api/stream";

export const BookMarks = () => {
  const [bookMarks, setBookMarks] = useState<IEventForBookMark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookMarks = async () => {
      await requestHandler(
        async () => await getBookMarks(),
        setLoading,
        (data) => {
          setBookMarks(data.data as IEventForBookMark[]);
        },
        () => {}
      );
    };

    fetchBookMarks();
  }, []);

  
  const handleRemoveBookMark = async (id: string) => {
    await requestHandler(
      async () => await removeFromBookMark(id),
      setLoading,
      (data) => {
        console.log(data);
        setBookMarks((prev) => prev.filter((event) => event.item?._id !== id));
      },
      () => {}
    );
  };


  return (
    <Container className="bookMarks">
      <h1>Bookmarks</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="bookMarksContainer">
          {bookMarks.length > 0 ? (
            bookMarks.map((event) => (
              <BookMarkedEventCard handleRemoveBookMark={handleRemoveBookMark} key={event.item._id} event={event} />
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
  max-height: 90vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 90vw;
    }
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
