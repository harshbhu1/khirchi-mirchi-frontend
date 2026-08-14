import { Link, Outlet, useLocation } from "react-router-dom";
import { CONTACT, ZOO_NAV } from "../../data/zoo";
import logo from "../../assets/images/logo.jpg";
import logoPage from "../../assets/images/logo-page.jpg";
import lionFamily from "../../assets/images/lion-family.jpg";
import animalKingdom from "../../assets/images/animal-kingdom.jpg";
import "../../styles/zoo-template.css";
// Must come after the template so its overflow and responsive fixes win.
import "../../styles/zoo-overrides.css";

/**
 * The Zoo template's own chrome, reproduced from its markup.
 *
 * Structure is the original's, element for element: #page wraps #header,
 * #content and #footer; the header holds a#logo, the Live/Love/Learn <ul>, the
 * "Buy tickets" button, ul#navigation with li#link1..7, and — on the home page
 * only — the lion-family figure and the "Special Events:" band.
 *
 * Interior pages swap logo.jpg for logo-page.jpg and drop the hero, exactly as
 * the template does.
 */
export default function ZooLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/zoo" || pathname === "/zoo/";

  return (
    <div className="zoo-site">
      <div id="page">
          <div id="header">
            <Link to="/zoo" id="logo">
              <img src={isHome ? logo : logoPage} alt="" />
            </Link>

            <ul>
              <li className="first">
                <h2>
                  <Link to="/zoo/the-zoo">Live</Link>
                </h2>
                <span>Have fun in your visit</span>
              </li>
              <li>
                <h2>
                  <Link to="/zoo/the-zoo">Love</Link>
                </h2>
                <span>Donate for the animals</span>
              </li>
              <li>
                <h2>
                  <Link to="/zoo/the-zoo">Learn</Link>
                </h2>
                <span>Get to know the animals</span>
              </li>
            </ul>

            <Link to="/zoo/tickets">Buy tickets / Check Events</Link>

            <ul id="navigation">
              {ZOO_NAV.map((item, index) => {
                const active = item.end
                  ? isHome
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);

                return (
                  <li
                    key={item.to}
                    id={`link${index + 1}`}
                    className={active ? "selected" : undefined}
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>

            {isHome ? (
              <>
                <img src={lionFamily} alt="figure" />
                <div>
                  <h1>Special Events:</h1>
                  <p>
                    Nawab Wajid Ali Shah Prani Udyan, Banarsi Bagh, Hazratganj —{" "}
                    <Link to="/zoo/events">see what&#39;s on</Link>
                  </p>
                </div>
              </>
            ) : null}
          </div>

          <div id="content">
            <Outlet />
          </div>

          <div id="footer">
            <div>
              <Link to="/zoo" className="logo">
                <img src={animalKingdom} alt="" />
              </Link>

              <div>
                <p>
                  Nawab Wajid Ali Shah Prani Udyan, {CONTACT.address}. Open Tuesday to
                  Sunday, closed Mondays.
                </p>
                <span>{CONTACT.phone}</span>
                <span>{CONTACT.email}</span>
              </div>

              <ul className="navigation">
                <li>
                  <Link to="/zoo">Home</Link>
                </li>
                <li>
                  <Link to="/zoo/tickets">Tickets</Link>
                </li>
                <li>
                  <Link to="/zoo/the-zoo">The Zoo</Link>
                </li>
                <li>
                  <Link to="/zoo/events">Events</Link>
                </li>
                <li>
                  <Link to="/zoo/visitors-info">Info</Link>
                </li>
                <li>
                  <Link to="/zoo/gallery">Gallery</Link>
                </li>
              </ul>

              <ul>
                <li>
                  <Link to="/zoo/the-zoo">Live : Have fun in your visit</Link>
                </li>
                <li>
                  <Link to="/zoo/the-zoo">Love : Donate for the animals</Link>
                </li>
                <li>
                  <Link to="/zoo/the-zoo">Learn : Get to know the animals</Link>
                </li>
              </ul>

              <p>
                Copyright &#169; {new Date().getFullYear()} Nawab Wajid Ali Shah Prani
                Udyan, Lucknow. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
