import { Link } from "react-router-dom";
import { FEATURED_ANIMALS } from "../../data/zoo";
import buttonViewGallery from "../../assets/images/button-view-gallery.jpg";

/**
 * The template's "Meet our Animals" strip.
 *
 * The home page uses id="featured" and the interior pages class="featured" —
 * the two rules differ only in the background sprite offset and the li margin,
 * so the caller picks which one via the `variant` prop, as the original does.
 */
export default function FeaturedAnimals({ variant = "page" }) {
  const attrs = variant === "home" ? { id: "featured" } : { className: "featured" };

  return (
    <div {...attrs}>
      <h2>Meet our Animals</h2>
      <ul>
        {FEATURED_ANIMALS.map((animal, index) => (
          <li key={animal.id} className={index === 0 ? "first" : undefined}>
            <Link to="/zoo/gallery">
              <img src={animal.image} alt="" />
            </Link>
            <Link to="/zoo/gallery">{animal.name}</Link>
          </li>
        ))}

        <li className="last">
          <Link to="/zoo/gallery">
            <img src={buttonViewGallery} alt="" />
          </Link>
          <Link to="/zoo/gallery">Gallery</Link>
        </li>
      </ul>
    </div>
  );
}
