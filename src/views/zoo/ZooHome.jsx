import { Link } from "react-router-dom";
import FeaturedAnimals from "../../components/zoo/FeaturedAnimals";
import { BLOG_POSTS, CONTACT, EVENTS } from "../../data/zoo";
import dolphins from "../../assets/images/dolphins.jpg";
import penguin2 from "../../assets/images/penguin2.jpg";

/**
 * The template's home page: the featured animal strip, then three floated
 * columns — section1 (events list), section2 (blog), section3 (connect).
 */
export default function ZooHome() {
  const [firstPost, secondPost, thirdPost] = BLOG_POSTS;

  return (
    <>
      <FeaturedAnimals variant="home" />

      <div className="section1">
        <h2>Events</h2>
        <ul id="article">
          {EVENTS.map((event, index) => (
            <li key={event.id} className={index === 0 ? "first" : undefined}>
              <Link to="/zoo/events">
                <span>{event.date}</span>
              </Link>
              <p>
                <Link to="/zoo/events">{event.title}</Link> — {event.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="section2">
        <h2>Blog : A century in Banarsi Bagh</h2>
        <p>
          Opened in 1921 and spread across 71.6 acres in the middle of Hazratganj, the zoo
          holds over nine hundred animals from more than a hundred species.
        </p>

        <Link to="/zoo/the-zoo">
          <img src={dolphins} alt="" />
        </Link>

        <ul>
          <li>
            <p>
              Renamed Nawab Wajid Ali Shah Prani Udyan in 2015 after the last Nawab of
              Awadh, the grounds are still known to most of Lucknow as{" "}
              <Link to="/zoo/the-zoo">Banarsi Bagh</Link>.
            </p>
          </li>
          <li>
            <p>
              The toy train has run here since 1969, and the Uttar Pradesh State Museum has
              stood inside the gates since 1963.
            </p>
          </li>
        </ul>

        <div id="section1">
          <ul>
            {[firstPost, secondPost].filter(Boolean).map((post) => (
              <li key={post.id}>
                <Link to="/zoo/the-zoo">
                  <img src={post.image} alt="" />
                </Link>
                <h4>
                  <Link to="/zoo/the-zoo">{post.title}</Link>
                </h4>
                <p>{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="section2">
          <ul>
            {thirdPost ? (
              <li>
                <Link to="/zoo/the-zoo">
                  <img src={thirdPost.image} alt="" />
                </Link>
                <h4>
                  <Link to="/zoo/the-zoo">{thirdPost.title}</Link>
                </h4>
                <p>{thirdPost.excerpt}</p>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="section3">
        <h2>Connect</h2>
        <a href={`mailto:${CONTACT.email}`} id="email">
          Email Us
        </a>
        <a
          href="http://facebook.com"
          id="facebook"
          target="_blank"
          rel="noreferrer noopener"
        >
          Facebook
        </a>
        <a href="http://twitter.com" id="twitter" target="_blank" rel="noreferrer noopener">
          Twitter
        </a>

        {/* No newsletter backend is wired up, so the submit is a no-op. */}
        <form action="" onSubmit={(event) => event.preventDefault()}>
          <h3>Subscribe to our</h3>
          <h2>NEWSLETTER</h2>
          <input type="text" defaultValue="your email here..." aria-label="Your email" />
        </form>

        <img src={penguin2} alt="" />
      </div>
    </>
  );
}
