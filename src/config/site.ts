import type { IconName } from "@/constants/icons";

export type SocialLink = { label: string; icon: IconName; href: string };

/** Company details shared by every page (header, footer, metadata). */
export const site = {
  name: "Shaavi Healthcare",
  description:
    "Shaavi Healthcare makes private blood testing simple and accessible across the UK through our years of expertise & great team.",
  contact: {
    phone: "+44 1234567890",
    email: "hello@shaavihealthcare.com",
    address: ["25 High Street", "Kensington, London W8 5NP", "United Kingdom"],
    /** Google Maps directions to the Shaavi Healthcare listing (maps.app.goo.gl/6iXS94q6LhfWMfa2A). */
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Shaavi%20Healthcare&destination_place_id=ChIJf4fCQNRzdkgRE8SKaMdR4Go",
  },
  socials: [
    { label: "WhatsApp", icon: "whatsapp", href: "#" },
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "LinkedIn", icon: "linkedin", href: "#" },
    { label: "Facebook", icon: "facebook", href: "#" },
    { label: "X", icon: "x", href: "#" },
  ] satisfies SocialLink[],
};
