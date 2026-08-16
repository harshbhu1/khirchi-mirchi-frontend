/**
 * Stand-in photos from Lorem Picsum, keyed by seed so the same image loads
 * every time. Swap `thumb`/`full` for real product photos whenever they're ready —
 * the rest of the gallery (grid, filters, lightbox) doesn't need to change.
 */
const RAW_ITEMS = [
  { seed: "km-village-1", category: "Village", caption: "Market Morning", featured: true },
  { seed: "km-village-2", category: "Village", caption: "Dusty Road Home" },
  { seed: "km-village-3", category: "Village", caption: "Harvest Season" },
  { seed: "km-snacks-1", category: "Snacks", caption: "Golden Fry Batch", featured: true },
  { seed: "km-snacks-2", category: "Snacks", caption: "Spiced & Ready" },
  { seed: "km-snacks-3", category: "Snacks", caption: "Fresh Off the Pan" },
  { seed: "km-kitchen-1", category: "Kitchen", caption: "Spice Rack" },
  { seed: "km-kitchen-2", category: "Kitchen", caption: "Prep at Dawn", featured: true },
  { seed: "km-kitchen-3", category: "Kitchen", caption: "Family Recipe" },
  { seed: "km-events-1", category: "Events", caption: "Village Feast", featured: true },
  { seed: "km-events-2", category: "Events", caption: "Festival Stall" },
  { seed: "km-events-3", category: "Events", caption: "Weekend Crowd" },
];

export const GALLERY_CATEGORIES = ["All", "Village", "Snacks", "Kitchen", "Events"];

export const GALLERY_ITEMS = RAW_ITEMS.map((item) => ({
  id: item.seed,
  category: item.category,
  caption: item.caption,
  featured: Boolean(item.featured),
  thumb: `https://picsum.photos/seed/${item.seed}/500/500`,
  full: `https://picsum.photos/seed/${item.seed}/1200/1200`,
}));

export const FEATURED_GALLERY_ITEMS = GALLERY_ITEMS.filter((photo) => photo.featured);

export default GALLERY_ITEMS;
