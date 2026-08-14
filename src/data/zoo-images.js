/**
 * Every image shipped with the zoo template, imported so Vite fingerprints and
 * bundles them. Kept in one barrel file so the content in `zoo.js` stays
 * readable and nothing has to reach into `../assets/images` directly.
 *
 * Native sizes are noted because the template's layout depends on them —
 * gallery tiles are 214×213, event and ticket cards 268×213, thumbnails 98×98.
 */

// Branding
export { default as logo } from "../assets/images/logo.jpg"; // 364×254
export { default as logoFooter } from "../assets/images/animal-kingdom.jpg"; // 203×178
export { default as buttonViewGallery } from "../assets/images/button-view-gallery.jpg"; // 100×100

// Home hero
export { default as lionFamily } from "../assets/images/lion-family.jpg"; // 597×357

// "Meet Our Animals" thumbnail strip — 98×98
export { default as thumbPenguin } from "../assets/images/penguin.jpg";
export { default as thumbElephant } from "../assets/images/elephant.jpg";
export { default as thumbOwl } from "../assets/images/owl.jpg";
export { default as thumbButterfly } from "../assets/images/butterfly.jpg";
export { default as thumbTurtle } from "../assets/images/turtle.jpg";
export { default as thumbSnake } from "../assets/images/snake.jpg";
export { default as thumbGorilla } from "../assets/images/gorilla.jpg";

// Gallery — 212×211, displayed in the template's 214×213 frame
export { default as galleryLion } from "../assets/images/gallery-lion.jpg";
export { default as galleryTurtle } from "../assets/images/gallery-turtle.jpg";
export { default as galleryElephant } from "../assets/images/gallery-elephant.jpg";
export { default as galleryPenguin } from "../assets/images/gallery-penguin.jpg";
export { default as galleryDolphin } from "../assets/images/gallery-dolphin.jpg";
export { default as galleryButterfly } from "../assets/images/gallery-buterfly.jpg";
export { default as galleryGorilla } from "../assets/images/gallery-gorilla.jpg";
export { default as galleryOwl } from "../assets/images/gallery-owl.jpg";
export { default as galleryBlueButterfly } from "../assets/images/gallery-blue-butterfly.jpg";

// Events — 265×211
export { default as eventLion } from "../assets/images/event-lion.jpg";
export { default as eventDolphin } from "../assets/images/event-dolphin.jpg";
export { default as eventGorilla } from "../assets/images/event-gorilla.jpg";

// Tickets — 265×211
export { default as ticketLion } from "../assets/images/ticket-lion.jpg";
export { default as ticketDolphin } from "../assets/images/ticket-dolphin.jpg";
export { default as ticketGorilla } from "../assets/images/ticket-gorilla.jpg";

// Blog strip
export { default as blogGorilla } from "../assets/images/gorilla-2.jpg"; // 128×78
export { default as blogSnake } from "../assets/images/snake-2.jpg"; // 128×78
export { default as blogButterfly } from "../assets/images/butterfly-2.jpg"; // 138×78

// Spare imagery used on interior pages
export { default as dolphins } from "../assets/images/dolphins.jpg"; // 208×139
export { default as penguinTall } from "../assets/images/penguin2.jpg"; // 200×238

// Backgrounds
export { default as bgFooter } from "../assets/images/bg-footer.gif"; // 482×247
