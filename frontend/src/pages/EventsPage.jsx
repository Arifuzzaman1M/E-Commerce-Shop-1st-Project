import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const hasEvents = allEvents && allEvents.length > 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {hasEvents ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <p>No events available</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
