/**
 * Content for the zoo mini-site.
 *
 * The layout, imagery and page structure are the zoo template's, reproduced from
 * its own assets in `src/assets/images`. The identity and visitor facts are the
 * real Nawab Wajid Ali Shah Prani Udyan (Lucknow Zoo).
 *
 * Note the animals are dictated by the photographs the template ships — lion,
 * elephant, penguin, owl, butterfly, turtle, snake, gorilla, dolphin — so this
 * list is the template's cast, not Lucknow's actual collection. Swap the `image`
 * on any entry to change it.
 *
 * Fees and timings are compiled from published visitor guides, not an official
 * feed; re-check them before this goes anywhere public.
 */

import * as IMG from "./zoo-images";

export const ZOO_NAME = "Nawab Wajid Ali Shah Prani Udyan";
export const ZOO_SHORT_NAME = "Lucknow Zoo";
export const ZOO_TAGLINE = "Banarsi Bagh, Hazratganj · Established 1921";

/** The three pillars the template runs across its header and footer. */
export const PILLARS = [
  { key: "live", title: "Live", tagline: "Have fun in your visit" },
  { key: "love", title: "Love", tagline: "Donate for the animals" },
  { key: "learn", title: "Learn", tagline: "Get to know the animals" },
];

export const ZOO_NAV = [
  { to: "/zoo", label: "Home", end: true },
  { to: "/zoo/the-zoo", label: "The Zoo" },
  { to: "/zoo/visitors-info", label: "Visitors Info" },
  { to: "/zoo/tickets", label: "Tickets" },
  { to: "/zoo/events", label: "Events" },
  { to: "/zoo/gallery", label: "Gallery" },
  { to: "/zoo/contact", label: "Contact Us" },
];

export const CONTACT = {
  phone: "+91 80054 93617",
  email: "director.lucknowzoo@gmail.com",
  address: "Banarsi Bagh, Narhi, Hazratganj, Lucknow, Uttar Pradesh 226001",
  landmark: "4 km from Lucknow Junction · 1 km from the city centre",
};

/** Headline numbers — Wikipedia / UP Forest Department. */
export const ZOO_FACTS = [
  { value: "1921", label: "Established" },
  { value: "71.6", label: "Acres" },
  { value: "900+", label: "Animals" },
  { value: "100+", label: "Species" },
];

export const ANIMAL_CATEGORIES = ["All", "Mammals", "Birds", "Marine", "Reptiles"];

/** The gallery's nine creatures, in the template's own order. */
export const ANIMALS = [
  {
    id: "lion",
    name: "Lion",
    category: "Mammals",
    habitat: "Carnivore section",
    caption:
      "The pride is fed mid-afternoon, which is when they are awake and worth the wait.",
    image: IMG.galleryLion,
  },
  {
    id: "turtle",
    name: "Turtle",
    category: "Marine",
    habitat: "Aquarium House",
    caption: "Freshwater turtles and tortoises, some of them here for decades.",
    image: IMG.galleryTurtle,
  },
  {
    id: "elephant",
    name: "Elephant",
    category: "Mammals",
    habitat: "Elephant enclosure",
    caption: "Asian elephants, bathed each morning before the gates open.",
    image: IMG.galleryElephant,
  },
  {
    id: "penguin",
    name: "Penguin",
    category: "Birds",
    habitat: "Bird section",
    caption: "Best seen at feeding time, when the whole colony gets loud at once.",
    image: IMG.galleryPenguin,
  },
  {
    id: "dolphin",
    name: "Dolphin",
    category: "Marine",
    habitat: "Aquatic section",
    caption: "Enrichment sessions run twice daily and keepers narrate them.",
    image: IMG.galleryDolphin,
  },
  {
    id: "butterfly",
    name: "Butterfly",
    category: "Reptiles",
    habitat: "Butterfly Park",
    caption: "A planted enclosure for native species — mid-morning is the busiest.",
    image: IMG.galleryButterfly,
  },
  {
    id: "gorilla",
    name: "Gorilla",
    category: "Mammals",
    habitat: "Primate section",
    caption: "The primate section also holds an orangutan and several macaque species.",
    image: IMG.galleryGorilla,
  },
  {
    id: "owl",
    name: "Owl",
    category: "Birds",
    habitat: "Nocturnal House",
    caption: "The Nocturnal House inverts its lighting so you see them awake.",
    image: IMG.galleryOwl,
  },
  {
    id: "blue-butterfly",
    name: "Blue Butterfly",
    category: "Reptiles",
    habitat: "Butterfly Park",
    caption: "One of over ninety species recorded in the park across a season.",
    image: IMG.galleryBlueButterfly,
  },
];

/** The 98×98 thumbnail strip repeated at the foot of most template pages. */
export const FEATURED_ANIMALS = [
  { id: "penguin", name: "Penguin", image: IMG.thumbPenguin },
  { id: "elephant", name: "Elephant", image: IMG.thumbElephant },
  { id: "owl", name: "Owl", image: IMG.thumbOwl },
  { id: "butterfly", name: "Butterfly", image: IMG.thumbButterfly },
  { id: "turtle", name: "Turtle", image: IMG.thumbTurtle },
  { id: "snake", name: "Snake", image: IMG.thumbSnake },
  { id: "gorilla", name: "Gorilla", image: IMG.thumbGorilla },
];

/**
 * Ticket rates in rupees — window price and the discounted online price.
 * Sources: holidify.com and trawell.in, cross-checked.
 */
export const TICKETS = [
  {
    id: "adult",
    name: "Adult",
    eligibility: "12 years and above",
    image: IMG.ticketLion,
    window: 60,
    online: 54,
    packageWindow: 100,
    packageOnline: 90,
    blurb:
      "Covers every enclosure, the aviary, the Aquarium House, the Nocturnal House and the Nature Interpretation Centre.",
  },
  {
    id: "child",
    name: "Child",
    eligibility: "5 to 12 years",
    image: IMG.ticketDolphin,
    window: 30,
    online: 27,
    packageWindow: 50,
    packageOnline: 45,
    blurb:
      "The same access as an adult ticket. Children under five enter free, and student groups of fifty or more get 10% off.",
  },
  {
    id: "package",
    name: "Add-ons",
    eligibility: "Optional extras",
    image: IMG.ticketGorilla,
    isExtras: true,
    blurb: "Charged separately at the gate, or bundled into the package ticket.",
    extras: [
      { label: "Battery vehicle", price: "₹25" },
      { label: "Video camera", price: "₹50" },
      { label: "Morning walk pass · monthly", price: "₹100" },
      { label: "Morning walk pass · yearly", price: "₹500" },
    ],
  },
];

export const TICKET_NOTE =
  "The package ticket adds the toy train and battery vehicle to standard entry. Still photography is free; video cameras are charged. Children under five enter free.";

export const ATTRACTIONS = [
  {
    id: "toy-train",
    title: "Toy Train",
    body: "Running since 1969 on a 1.5 km circuit past most of the major enclosures. The current Shatabdi-style train replaced the original in February 2014.",
  },
  {
    id: "state-museum",
    title: "UP State Museum",
    body: "Moved into the grounds in 1963. Egyptian mummies, Awadh-period artefacts, bronzes and sculpture. Open 10:30 AM – 4:30 PM, closed Mondays and public holidays.",
  },
  {
    id: "aquarium",
    title: "Aquarium House",
    body: "Freshwater and marine tanks, included in standard entry along with the Nocturnal House.",
  },
  {
    id: "vintage-train",
    title: "Vintage Train",
    body: "A British-era locomotive from around 1924, once used to haul timber, now on static display.",
  },
  {
    id: "interpretation-centre",
    title: "Nature Interpretation Centre",
    body: "Regional wildlife and conservation exhibits. The Touch Table programme, where visitors handle specimens, runs on Fridays.",
  },
  {
    id: "butterfly-park",
    title: "Butterfly Park",
    body: "A planted enclosure for native butterfly species, best mid-morning when they are most active.",
  },
];

/** Seasonal timings — the zoo shifts its hours four times a year. */
export const VISITOR_HOURS = [
  { days: "February – April", hours: "8:30 AM – 5:30 PM" },
  { days: "May – July", hours: "8:00 AM – 6:00 PM" },
  { days: "August – October", hours: "8:30 AM – 5:30 PM" },
  { days: "November – January", hours: "8:30 AM – 5:00 PM" },
  { days: "Every Monday", hours: "Closed" },
];

export const VISITOR_FACILITIES = [
  {
    title: "Getting here",
    body: "In Banarsi Bagh, Hazratganj — about 4 km from Lucknow Junction and walking distance from the city centre.",
  },
  {
    title: "Parking",
    body: "Paid parking outside the main gate on the Hazratganj side. It fills quickly on Sundays and holidays.",
  },
  {
    title: "Battery vehicle",
    body: "₹25 per person for a driven circuit of the grounds — worth it in May and June heat.",
  },
  {
    title: "Cameras",
    body: "Still photography is free. Video cameras carry a ₹50 charge, payable at the gate.",
  },
  {
    title: "Morning walks",
    body: "Season passes for early-morning walkers: ₹100 monthly or ₹500 for the year.",
  },
  {
    title: "Best time to visit",
    body: "October to March for the weather. Arrive at opening — the animals are far more active before midday.",
  },
];

export const ZOO_RULES = [
  "Please don't feed the animals — every species here is on a managed diet.",
  "Plastic bags, polythene and single-use plastics are not permitted inside the grounds.",
  "Stay behind the barriers and keep children within arm's reach at all times.",
  "Do not tease, shout at or throw anything at any animal.",
  "Video cameras must be declared at the ticket window; drones are not allowed.",
  "The zoo is closed every Monday for animal rest and enclosure maintenance.",
];

/** The template carries three dated events; these are the zoo's real dates. */
export const EVENTS = [
  {
    id: "wildlife-week",
    date: "Oct 02",
    range: "2 – 8 October",
    title: "Wildlife Week",
    image: IMG.eventLion,
    body: "Marked at zoos across India. School competitions, keeper talks, poster and quiz events, and reduced entry for participating student groups.",
  },
  {
    id: "touch-table",
    date: "Every Fri",
    range: "Fridays, weekly",
    title: "Touch Table Programme",
    image: IMG.eventDolphin,
    body: "At the Nature Interpretation Centre. Visitors handle skulls, feathers and shed skins while staff explain what each one tells you about the animal.",
  },
  {
    id: "foundation-day",
    date: "Nov 29",
    range: "29 November",
    title: "Foundation Day",
    image: IMG.eventGorilla,
    body: "The zoo opened in 1921 to commemorate the Prince of Wales' visit to Lucknow. Foundation Day brings guided heritage walks through the older parts of the grounds.",
  },
];

/** The template's three-post blog strip. */
export const BLOG_POSTS = [
  {
    id: "prince-of-wales",
    title: "From Prince of Wales Gardens to Prani Udyan",
    date: "Heritage",
    image: IMG.blogGorilla,
    excerpt:
      "Opened in 1921 on the initiative of Sir Harcourt Butler, then Governor, to mark the Prince of Wales' visit. Renamed in 2015 after the last Nawab of Awadh.",
  },
  {
    id: "toy-train-history",
    title: "The toy train has run since 1969",
    date: "Attractions",
    image: IMG.blogSnake,
    excerpt:
      "The original retired in 2013 after forty-four years. Its Shatabdi-style replacement took over the 1.5 km circuit in February 2014.",
  },
  {
    id: "banarsi-bagh",
    title: "Why locals still call it Banarsi Bagh",
    date: "The grounds",
    image: IMG.blogButterfly,
    excerpt:
      "The 71.6-acre garden predates the zoo, and the old name has outlasted two official ones. Ask for Banarsi Bagh and any driver will know it.",
  },
];
