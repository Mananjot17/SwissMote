import EventCard from "./EventCard";

const EventSection = ({ title, events, onDeleteEvent }) => (
  <section className="mb-16">
    {/* Section title */}
    <h3 className="text-2xl font-semibold text-indigo-700 mb-6">{title}</h3>

    {/* Responsive grid layout for displaying event cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.length > 0 ? (
        // Map through the events array and render an EventCard for each event
        events.map((event) => (
          <EventCard key={event._id} event={event} onDelete={onDeleteEvent} />
        ))
      ) : (
        // Display a fallback message if no events are available
        <p className="text-gray-600">No events found.</p>
      )}
    </div>
  </section>
);

export default EventSection;
