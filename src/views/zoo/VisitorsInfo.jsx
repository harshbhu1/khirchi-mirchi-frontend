import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { VISITOR_FACILITIES, VISITOR_HOURS, ZOO_RULES } from "../../data/zoo";

/**
 * The template's visitors info page: two intro paragraphs, then a <ul> of
 * 261px-wide centred blocks, each an <h2> heading over a justified paragraph.
 */
export default function VisitorsInfo() {
  return (
    <>
      <div id="info">
        <h1>Visitors Info</h1>

        <p>
          The zoo occupies Banarsi Bagh in Hazratganj, right in the centre of Lucknow — about
          a kilometre from the city centre and four from Lucknow Junction. Any auto or cab
          driver will know it as Banarsi Bagh even if the current name does not register.
        </p>

        <p>
          Opening hours shift four times a year with the season:{" "}
          {VISITOR_HOURS.filter((entry) => entry.hours !== "Closed")
            .map((entry) => `${entry.days}, ${entry.hours}`)
            .join("; ")}
          . The zoo is closed every Monday for animal rest and enclosure maintenance. The
          Uttar Pradesh State Museum inside the grounds keeps separate hours — 10:30 AM to
          4:30 PM, closed Mondays and public holidays.
        </p>

        <ul>
          {VISITOR_FACILITIES.map((facility) => (
            <li key={facility.title}>
              <h2>
                <a href="#info" onClick={(event) => event.preventDefault()}>
                  {facility.title}
                </a>
              </h2>
              <p>{facility.body}</p>
            </li>
          ))}

          <li>
            <h2>
              <a href="#info" onClick={(event) => event.preventDefault()}>
                Before you visit
              </a>
            </h2>
            <p>{ZOO_RULES.join(" ")}</p>
          </li>
        </ul>
      </div>

      <FeaturedAnimals />
    </>
  );
}
