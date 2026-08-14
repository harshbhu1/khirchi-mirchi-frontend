import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { CONTACT } from "../../data/zoo";

/**
 * The template's contact page: an #contact block of <h4> labels each followed by
 * a paragraph, then the social links and the newsletter form.
 */
export default function Contact() {
  return (
    <>
      <div id="contact">
        <h1>Contact Information</h1>

        <h4>Location :</h4>
        <p>
          Nawab Wajid Ali Shah Prani Udyan, {CONTACT.address}. {CONTACT.landmark}.{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Nawab+Wajid+Ali+Shah+Prani+Udyan+Lucknow"
            target="_blank"
            rel="noreferrer noopener"
          >
            Open in Google Maps
          </a>
        </p>

        <h4>Ticketing Office :</h4>
        <p>{CONTACT.phone}</p>

        <h4>Office Phone Number :</h4>
        <p>{CONTACT.phone}</p>

        <h4>Visiting Hours :</h4>
        <p>
          Tuesday to Sunday, 8:00 or 8:30 AM to 5:00, 5:30 or 6:00 PM depending on the
          season. Closed every Monday.
        </p>

        <h4>Email :</h4>
        <p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>

        <h4>Managed By :</h4>
        <p>
          The Zoo Advisory Committee under the Uttar Pradesh Forest Department, with a Deputy
          Conservator of Forests as Director.
        </p>

        <a href="http://facebook.com" id="facebook" target="_blank" rel="noreferrer noopener">
          Facebook
        </a>
        <a href="http://twitter.com" id="twitter" target="_blank" rel="noreferrer noopener">
          Twitter
        </a>

        {/* No mail backend is wired up, so the submit is a no-op. */}
        <form action="" onSubmit={(event) => event.preventDefault()}>
          <h3>Subscribe to our</h3>
          <h2>NEWSLETTER</h2>
          <input type="text" defaultValue="your email here..." aria-label="Your email" />
        </form>
      </div>

      <FeaturedAnimals />
    </>
  );
}
