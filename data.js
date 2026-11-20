// All invitation content lives here. Edit this file to change text, links or photos.

export const COUPLE = { groom: "Swapnil", bride: "Ritiksha" };

export const WEDDING_DATE = "2026-12-28T16:15:00+05:30"; // Monday, 28 Dec 2026, 4:15 PM IST

// WhatsApp number that receives RSVP replies (international format, no "+" or spaces,
// e.g. "919876543210"). Leave empty to let the guest pick the contact in WhatsApp.
export const RSVP_WHATSAPP = "";

// Google Maps links are search-based (no invented coordinates). To use an exact pin,
// open the place in Google Maps, tap Share, and paste that link into `view` / `nav`.
const mapLinks = (query) => ({
  view: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  nav: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`,
});

export const EVENTS = [
  {
    id: "haldi",
    kicker: "Sunday",
    title: "The Haldi Ceremony",
    date: "27 December 2026",
    day: "Sunday",
    time: "9:00 AM",
    venue: ["Thalpet, Post Thale,", "Taluka Alibag, District Raigad,", "Maharashtra."],
    maps: mapLinks("Thalpet, Thale, Alibag, Raigad, Maharashtra"),
  },
  {
    id: "wedding",
    kicker: "Monday",
    title: "The Wedding Ceremony",
    date: "28 December 2026",
    day: "Monday",
    time: "4:15 PM",
    venue: [
      "RCF Auditorium",
      "Sarkhel Kanhoji Angre Vasahat (RCF Colony),",
      "Kurul, Taluka Alibag,",
      "District Raigad, Maharashtra.",
    ],
    maps: mapLinks("RCF Auditorium, RCF Colony, Kurul, Alibag, Raigad, Maharashtra"),
  },
];

// Photo gallery. Leave `src` empty to show an elegant placeholder.
// To add photos: put image files in the /public/gallery folder (e.g. public/gallery/1.jpg)
// and set src: "/gallery/1.jpg". Keep each photo under ~300 KB for fast loading.
export const GALLERY = [
  { src: "", alt: "Swapnil and Ritiksha, photo 1" },
  { src: "", alt: "Swapnil and Ritiksha, photo 2" },
  { src: "", alt: "Swapnil and Ritiksha, photo 3" },
  { src: "", alt: "Swapnil and Ritiksha, photo 4" },
  { src: "", alt: "Swapnil and Ritiksha, photo 5" },
  { src: "", alt: "Swapnil and Ritiksha, photo 6" },
];

export const buildShareMessage = (url) =>
  `With immense joy, we invite you to celebrate the wedding of Swapnil & Ritiksha! ❤️\n\nJoin us as we begin our beautiful journey together.\n\nYour presence and blessings would mean the world to us.\n\n💌 Explore our wedding invitation:\n${url}`;
