// All invitation content lives here. Edit this file to change text, links or phone numbers.

export const WEDDING_DATE = "2026-12-28T16:15:00+05:30"; // 28 Dec 2026, 4:15 PM IST

// ---- Fill these in when you have the numbers. Leave empty ("") to hide them. ----
// Use international format without "+" or spaces, e.g. "919876543210"
export const CONTACTS = [
  { name: "नाव येथे लिहा", role: "संपर्क १", phone: "" },
  { name: "नाव येथे लिहा", role: "संपर्क २", phone: "" },
];
// WhatsApp number that receives RSVP messages (same format). Empty = opens WhatsApp contact picker.
export const RSVP_WHATSAPP = "";

export const VENUE_NAME = "आर.सी.एफ. सभागृह";
export const VENUE_ADDRESS = [
  "सरखेल कान्होजी आंग्रे वसाहत",
  "(आर.सी.एफ. कॉलनी), कुरुळ,",
  "ता. अलिबाग, जि. रायगड.",
];
// Search-based map links (no coordinates invented). Replace with your exact Google Maps share link if you like.
const MAP_QUERY = "RCF Sabhagruh, RCF Colony, Kurul, Alibag, Raigad, Maharashtra";
export const MAP_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_NAV_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

export const EVENTS = [
  {
    id: "haldi",
    title: "हळदी समारंभ",
    day: "रविवार दि. २७ डिसेंबर २०२६",
    time: "सकाळी ९.०० वा.",
    placeLabel: "स्थळ",
    place: ["मु. थळपेट, पो. थळे,", "ता. अलिबाग, जि. रायगड."],
    icon: "haldi",
  },
  {
    id: "wedding",
    title: "शुभविवाह",
    day: "सोमवार दि. २८ डिसेंबर २०२६",
    time: "सायंकाळी ०४:१५ वा.",
    placeLabel: "विवाह स्थळ",
    place: [VENUE_NAME, ...VENUE_ADDRESS],
    icon: "wedding",
    maps: true,
  },
];

export const FAMILY_LEFT = [
  "श्री. विजय पांडुरंग माळी",
  "श्री. नितीन नामदेव माळी",
  "श्रीमती प्रभावती पांडुरंग माळी",
];
export const FAMILY_RIGHT = [
  "सौ. मधु विजय माळी",
  "सौ. नमिता नितीन माळी",
  "श्रीमती सुनंदा रामकृष्ण पाटील",
];
export const FAMILY_ALL = "समस्त माळी, गडबळ, गाडे, नाईक, पाटील, बर्तक, कुकळे परिवार";

export const BLESSING_POEM = [
  "सजलेल्या मंडपाला आज सावली लाभावी,",
  "दोन मनांच्या बंधनाला आज पालवी फुटावी,",
  "आनंदाच्या सोहळ्यात एक सूर गाण्यास यावे,",
  "दोघांच्या संसाराला तुम्ही आशीर्वाद द्यावे ।",
];

// Message sent from the WhatsApp share button. The public link is appended below the text.
export const SHARE_INTRO =
  "॥ श्री गणेशाय नमः ॥\n\n💐 सस्नेह निमंत्रण 💐\n\nस्वप्निल ❤️ रितिक्षा\n\nआमच्या शुभविवाह सोहळ्यास आपण सहकुटुंब उपस्थित राहून वधू-वरांस शुभाशीर्वाद द्यावेत, ही नम्र विनंती.\n\n📅 सोमवार, २८ डिसेंबर २०२६\n📍 आर.सी.एफ. सभागृह, कुरुळ, अलिबाग.\n\n💌 संपूर्ण डिजिटल लग्नपत्रिका पाहण्यासाठी खालील लिंक उघडा:";
export const SHARE_OUTRO = "आपली उपस्थिती हीच आमच्यासाठी आनंदाची गोष्ट असेल! ❤️";
export const buildShareMessage = (url) => `${SHARE_INTRO}\n\n${url}\n\n${SHARE_OUTRO}`;

const MARATHI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
export const toMarathi = (n) => String(n).replace(/\d/g, (d) => MARATHI_DIGITS[d]);
