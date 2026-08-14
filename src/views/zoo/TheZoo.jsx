import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { ATTRACTIONS } from "../../data/zoo";

/**
 * The template's "The Zoo" page: an #zoo block of alternating <h3> headings and
 * paragraphs, closing with a set of <h4> detail lines.
 */
export default function TheZoo() {
  return (
    <>
      <div id="zoo">
        <h1>The Zoo</h1>

        <h3>A Century in Banarsi Bagh</h3>
        <p>
          The zoo opened in 1921 as the Prince of Wales Zoological Gardens, set up on the
          initiative of Sir Harcourt Butler — then Governor — to commemorate the Prince of
          Wales&#39; visit to Lucknow. It was renamed Nawab Wajid Ali Shah Prani Udyan in
          2015, after the last Nawab of Awadh, though most of the city still calls it
          Banarsi Bagh.
        </p>

        <h3>Nine Hundred Animals, One Garden</h3>
        <p>
          Across 71.6 acres in the middle of Hazratganj, the zoo holds over nine hundred
          animals from more than a hundred species — Royal Bengal and white tigers, Asiatic
          lions, leopards, sloth bears, giraffe, an orangutan, and five species of deer
          including the barasingha, Uttar Pradesh&#39;s state animal.
        </p>

        <h3>How It Is Run</h3>
        <p>
          The zoo is administered as a trust by a Zoo Advisory Committee under the Uttar
          Pradesh Forest Department, with a Deputy Conservator of Forests serving as
          Director. The grounds also hold the Uttar Pradesh State Museum, moved here in
          1963.
        </p>

        <h3>Things to Do</h3>
        {ATTRACTIONS.map((attraction) => (
          <h4 key={attraction.id}>
            {attraction.title} — {attraction.body}
          </h4>
        ))}

        <h3>Visitor details</h3>
        <h4>Open Tuesday to Sunday. Closed every Monday.</h4>
        <h4>
          Seasonal hours: 8:30 AM – 5:30 PM February to April and August to October, 8:00 AM
          – 6:00 PM May to July, 8:30 AM – 5:00 PM November to January.
        </h4>
        <h4>
          Entry ₹60 for adults and ₹30 for children at the gate, with a ten percent discount
          booking online. Children under five enter free.
        </h4>
      </div>

      <FeaturedAnimals />
    </>
  );
}
