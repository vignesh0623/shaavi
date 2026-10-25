import { images } from "@/constants/images";

/*
 * About page content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › About, node 191:4299).
 */

export const aboutHero = {
  eyebrow: "About Us",
  title: "About Shaavi Healthcare",
  subtitle:
    "Shaavi Healthcare makes private blood testing simple and accessible across the UK through our years of expertise & great team",
};

export const leadershipStatement =
  "Our laboratory has been founded and developed under the leadership of Vishnu Dutt, a highly experienced Biomedical Scientist and Laboratory Director with more than 15 years of experience in clinical diagnostics in the UK and internationally.";

export type Highlight = { title: string; description: string };

export const highlights: Highlight[] = [
  {
    title: "Fast Turnaround",
    description: "Clear results delivered quickly, without long waiting lists.",
  },
  {
    title: "200+ tests & profiles",
    description: "From routine blood panels to specialist diagnostic profiles.",
  },
  {
    title: "Private & confidential",
    description: "Your data and results are handled with complete discretion.",
  },
];

/** Geometry is in px at the design size, relative to the 400×421 photo frame. */
export type Director = {
  role: string;
  name: string;
  bio: string[];
  /** Framed background photo. */
  photo: string;
  /** Cut-out portrait drawn over the frame; it rises above the frame's top edge. */
  cutout: {
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
    /** Clip the cut-out to the frame's rounded bottom corners. */
    roundedBottom: boolean;
  };
  badge: {
    value: string;
    caption: string;
    tone: "dark" | "primary";
    x: number;
    y: number;
  };
};

const vishnuBio = [
  "Vishnu Dutt has extensive experience in establishing and managing clinical laboratories, having previously held senior leadership positions including Laboratory Director and Co-Founder/Laboratory Director. His expertise covers laboratory setup and commissioning, quality management systems (QMS), laboratory information systems (LIS), analyser installation and integration, method validation, quality assurance, staff training and day-to-day laboratory operations.",
  "Before moving into laboratory leadership, Vishnu spent almost a decade at Health Services Laboratories in London, where he worked as a Biomedical Scientist and Night Shift Supervisor. His experience includes biochemistry, haematology, clinical result validation, quality control, analyser maintenance and laboratory automation.",
  "He holds an MSc in Biotechnology from the University of Bedfordshire and a BSc in Medical Laboratory Technology, evaluated in the UK as equivalent to a BSc in Biomedical Science.",
];

export const directors: Director[] = [
  {
    role: "Laboratory Director",
    name: "Vishnu Dutt",
    bio: vishnuBio,
    photo: images.about.vishnuDuttPhoto,
    cutout: {
      src: images.about.vishnuDutt,
      x: 0,
      y: -25,
      width: 400,
      height: 446,
      roundedBottom: true,
    },
    badge: {
      value: "20+ years",
      caption: "Clinical diagnostics expertise",
      tone: "dark",
      x: 278,
      y: 333,
    },
  },
  {
    role: "Laboratory Director",
    name: "Shivani",
    // The design currently repeats Vishnu's biography here.
    bio: vishnuBio,
    photo: images.about.shivaniPhoto,
    cutout: {
      src: images.about.shivani,
      x: 7,
      y: -56,
      width: 382,
      height: 477,
      roundedBottom: false,
    },
    badge: {
      value: "20+ years",
      caption: "Clinical diagnostics expertise",
      tone: "primary",
      x: -80,
      y: 339,
    },
  },
];

export const laboratory = {
  eyebrow: "Laboratory Director",
  title: "Our Laboratory",
  intro:
    "At Shaavi Healthcare, we have brought together this extensive scientific, technical and operational experience to build our new clinical laboratory in Hayes, London.",
  body: "Our focus is on delivering dependable diagnostic services supported by robust laboratory processes, quality assurance, modern analytical technology and efficient laboratory information systems.",
  quote:
    "We aim to work closely with patients, GPs, private clinics, healthcare professionals and other healthcare organisations, providing a professional and responsive diagnostic service tailored to their needs.",
  image: images.about.laboratory,
};

export const commitment = {
  eyebrow: "Our Commitment",
  heading: "Quality, accuracy, confidentiality and patient-centred care.",
  intro:
    "At the heart of Shaavi Healthcare is a commitment to quality, accuracy, confidentiality and patient-centred care.",
  body: "From sample collection and laboratory testing through to reporting, our goal is to provide a trusted diagnostic service where healthcare professionals and patients can have confidence in the quality of the laboratory processes behind their results.",
  tagline: {
    lead: "Shaavi Healthcare – ",
    highlight: "Quality Diagnostics. Trusted Care.",
  },
};
