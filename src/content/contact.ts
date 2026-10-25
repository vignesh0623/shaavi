import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";

/*
 * Contact Us content, copied verbatim from the Figma design ("Website" ›
 * Contact Us). Its email and address differ from the footer's (`site.contact`);
 * both are kept as designed.
 */

export const contactIntro = {
  eyebrow: "Get In Touch",
  title: "We're Here To Help",
  description:
    "Questions about a test, a profile or a home collection? Send us a message and our team will reply within one working day.",
};

/** `href` turns the value into a link (email, phone). */
export type ContactDetail = { icon: IconName; label: string; value: string; href?: string };

export const contactDetails: ContactDetail[] = [
  {
    icon: "mail",
    label: "Email",
    value: "info@shaavihealthcare.com",
    href: "mailto:info@shaavihealthcare.com",
  },
  { icon: "phone", label: "Phone", value: "+44 1234 567890", href: "tel:+441234567890" },
  { icon: "locationPin", label: "Address", value: "Hayes, London, United Kingdom" },
  { icon: "clock", label: "Opening hours", value: "Mon–Sat, 8:00 – 18:00" },
];

export type DialCode = { country: string; code: string; flag: string };

/**
 * Dialling codes for the mobile number, the first chosen by default. The
 * design shows India's; the lab is in the UK, so the UK comes first.
 */
export const dialCodes: DialCode[] = [
  { country: "United Kingdom", code: "+44", flag: images.flags.gb },
  { country: "India", code: "+91", flag: images.flags.in },
];

/** The form's placeholders (also its fields' labels) and its messages. */
export const contactForm = {
  fields: {
    firstName: "First name",
    surname: "Surname",
    email: "Your email address",
    age: "Your age",
    dialCode: "Country code",
    phone: "Your mobile number",
    message: "How can we help?",
    whatsapp: "Also send to WhatsApp",
  },
  submit: "Send Message",
  // Not in the design.
  sending: "Sending…",
  errors: {
    firstName: "Enter your first name",
    email: "Enter your email address",
    emailFormat: "Enter an email address like name@example.com",
    age: "Enter your age in years",
    phone: "Enter a mobile number of 7 to 15 digits",
    phoneForWhatsapp: "Enter your mobile number for a WhatsApp reply",
    message: "Tell us how we can help",
    failed: "Your message couldn't be sent. Please try again, or email or call us.",
  },
  sent: {
    title: "Message Sent",
    description: "Thank you. Our team will reply within one working day.",
    again: "Send Another Message",
  },
};
