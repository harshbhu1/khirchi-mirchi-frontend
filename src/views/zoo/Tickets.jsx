import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { TICKETS, TICKET_NOTE } from "../../data/zoo";

/**
 * The template's tickets page: an intro paragraph, then a <ul> of three 267×213
 * framed images, each with a title, a paragraph and the two price spans the
 * original renders as "Adult - $ 9.00 / Kids - $ 4.00".
 *
 * Prices here are the zoo's real rupee rates, gate and online.
 */
export default function Tickets() {
  return (
    <>
      <div id="tickets">
        <h1>Tickets</h1>
        <p>
          Entry covers every enclosure, the aviary, the Aquarium House, the Nocturnal House
          and the Nature Interpretation Centre. Booking online saves ten percent on every
          rate, and children under five enter free. {TICKET_NOTE}
        </p>

        <ul>
          {TICKETS.map((ticket, index) => (
            <li key={ticket.id} className={index === 0 ? "first" : undefined}>
              <div>
                <a href="#tickets" onClick={(event) => event.preventDefault()}>
                  <img src={ticket.image} alt={ticket.name} />
                </a>
              </div>

              <h2>
                <a href="#tickets" onClick={(event) => event.preventDefault()}>
                  {ticket.name} — {ticket.eligibility}
                </a>
              </h2>

              <p>{ticket.blurb}</p>

              {ticket.isExtras ? (
                ticket.extras.map((extra) => (
                  <span key={extra.label}>
                    {extra.label} - {extra.price}
                  </span>
                ))
              ) : (
                <>
                  <span>Gate - ₹ {ticket.window.toFixed(2)}</span>
                  <span>Online - ₹ {ticket.online.toFixed(2)}</span>
                  <span>Package - ₹ {ticket.packageWindow.toFixed(2)}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <FeaturedAnimals />
    </>
  );
}
