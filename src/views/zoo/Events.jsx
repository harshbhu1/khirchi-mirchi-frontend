import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { EVENTS } from "../../data/zoo";

/**
 * The template's events page: a <ul> of rows, each a 268×213 framed image
 * floated left with an <h4> title, a "Date : …" paragraph and the description.
 */
export default function Events() {
  return (
    <>
      <div id="events">
        <h1>Events</h1>
        <ul>
          {EVENTS.map((event) => (
            <li key={event.id}>
              <div>
                <a href="#events" onClick={(clickEvent) => clickEvent.preventDefault()}>
                  <img src={event.image} alt={event.title} />
                </a>
              </div>

              <h4>
                <a href="#events" onClick={(clickEvent) => clickEvent.preventDefault()}>
                  {event.title}
                </a>
              </h4>

              <p>Date : {event.range}</p>
              <p>{event.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <FeaturedAnimals />
    </>
  );
}
