import { useState } from "react";
import Lightbox from "../../components/zoo/Lightbox";
import { ANIMALS } from "../../data/zoo";

/**
 * The template's gallery: a single #gallery block holding a <ul> of 214×213
 * framed thumbnails with the animal's name beneath each one.
 *
 * The only behavioural addition is the lightbox — the original linked each tile
 * to "#" and did nothing.
 */
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <div id="gallery">
        <h1>Meet our Animals</h1>
        <ul>
          {ANIMALS.map((animal, index) => (
            <li key={animal.id}>
              <div>
                <a
                  href="#gallery"
                  onClick={(event) => {
                    event.preventDefault();
                    setLightboxIndex(index);
                  }}
                >
                  <img src={animal.image} alt={animal.name} />
                </a>
              </div>
              <a
                href="#gallery"
                onClick={(event) => {
                  event.preventDefault();
                  setLightboxIndex(index);
                }}
              >
                {animal.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={ANIMALS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
