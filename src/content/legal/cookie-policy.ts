import type { LegalDocument } from "./types";

/*
 * Cookie Policy page content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › Cookie Policy, node 191:6912).
 * Text keeps the design's line breaks and spacing; see ./types.ts.
 */
export const cookiePolicy: LegalDocument = {
  intro: {
    eyebrow: "Cookie Policy",
    title: "Cookie Policy",
    description: "Dutt Limited trading as Shaavi Healthcare\n Last Updated: 5 September 2026",
  },
  sections: [
    {
      title: "1. Introduction",
      body: [
        "This Cookie Policy explains how Dutt Limited trading as Shaavi Healthcare (“Shaavi Healthcare”, “we”, “us” or “our”) uses cookies and similar technologies when you visit our website.\n\nShaavi Healthcare operates a clinical diagnostic laboratory in Hayes, London and is committed to protecting the privacy and confidentiality of visitors to our website.\n\nThis Cookie Policy should be read alongside our Privacy Policy, which provides further information about how we collect, use and protect personal data.",
      ],
    },
    {
      title: "2. What Are Cookies?",
      body: [
        "Cookies are small text files that are placed on your computer, smartphone, tablet or other device when you visit a website.\n\nCookies can help websites operate correctly, remember preferences, improve functionality and provide information about how visitors use a website.\n\nSome cookies are necessary for a website to function, while others require your consent before they can be placed on your device.",
      ],
    },
    {
      title: "3. How We Use Cookies",
      body: [
        "Shaavi Healthcare may use cookies and similar technologies to:\n\n * Ensure our website functions securely and correctly;\n * Remember your preferences and cookie choices;\n * Improve website functionality and user experience;\n * Understand how visitors interact with our website;\n * Monitor website performance and identify technical problems;\n * Support online forms, appointment or service-related functionality where applicable; and\n * Measure the effectiveness of our website and communications, where you have provided the necessary consent.\n\n We will not use non-essential cookies without obtaining consent where consent is legally required.",
      ],
    },
    {
      title: "4. Types of Cookies We May Use",
      body: [
        [
          { text: "Strictly Necessary Cookies", weight: "semibold" },
          "\n\nThese cookies are required for the website to operate properly and securely.\n\nThey may be used for functions such as website security, maintaining sessions, remembering privacy choices and enabling essential website functionality.\n\nBecause these cookies are necessary for the operation of the website, they may not require your consent.\n\n",
          { text: "Functional Cookies", weight: "bold" },
          "\n\nFunctional cookies allow the website to remember choices you make and provide enhanced functionality.\n\nFor example, they may remember certain website preferences or settings.\n\nWhere required by applicable law, these cookies will only be activated after you have provided consent.\n\n",
          { text: "Analytics and Performance Cookies", weight: "semibold" },
          "\n\nAnalytics cookies help us understand how visitors use our website.\n\nThey may provide information such as which pages are visited, how visitors navigate through the website and whether technical errors occur.\n\nThis information can help us improve the performance and usability of our website.\n\nWhere consent is required, analytics cookies will not be activated until you have accepted them.\n\nMarketing and Advertising Cookies\n\nIf Shaavi Healthcare uses advertising, social media or marketing technologies, cookies may be used to understand the effectiveness of advertising or to provide more relevant communications.\n\nWe will seek your consent before using marketing or advertising cookies where required.\n\nIf our website does not use marketing or advertising cookies, this category may not apply.",
        ],
      ],
    },
    {
      title: "5. Third-Party Cookies",
      body: [
        "Some functionality on our website may be provided by third-party service providers.\n\nFor example, depending on the services incorporated into our website, third-party technologies could include website analytics, maps, videos, appointment systems, payment services or other embedded content.\n\nThese third parties may place or access cookies on your device.\n\nWhere applicable, information about these cookies should be provided through our website’s cookie consent tool, including their purpose and duration.\n\nThird-party providers are responsible for their own privacy and cookie practices.",
      ],
    },
    {
      title: "6. Cookies and Health Information",
      body: [
        "Shaavi Healthcare recognises the particularly sensitive nature of health-related information.\n\nWe do not intend to use advertising or analytics cookies to disclose confidential medical information, diagnostic test results or other health information to advertising platforms.\n\nInformation relating to patients and diagnostic services is handled in accordance with our applicable privacy, confidentiality and data-protection obligations.",
      ],
    },
    {
      title: "7. Your Cookie Choices",
      body: [
        "When you first visit our website, you may be presented with a cookie banner or consent management tool.\n\nWhere applicable, you can:\n\n * Accept all optional cookies;\n * Reject all non-essential cookies; or\n * Manage your preferences and select which categories of optional cookies you wish to allow.\n\nYou can change or withdraw your consent at any time through the cookie settings available on our website.\n\nWithdrawing consent will not affect the lawfulness of any processing that took place before consent was withdrawn.",
      ],
    },
    {
      title: "8. Managing Cookies Through Your Browser",
      body: [
        "Most internet browsers allow you to control cookies through their settings.\n\nYou can normally configure your browser to block or delete cookies. However, disabling strictly necessary cookies may affect the functionality of certain parts of the website.\n\nBrowser providers offer their own instructions explaining how cookie settings can be managed.",
      ],
    },
    {
      title: "9. How Long Are Cookies Stored?",
      body: [
        "Cookies may be either:\n\nSession cookies – temporary cookies that normally expire when you close your browser; or\n\nPersistent cookies – cookies that remain on your device for a defined period or until you delete them.\n\nThe duration of individual cookies depends on their purpose and the technology or service that sets them.\n\nWhere applicable, details of individual cookies and their duration should be available through our website’s cookie settings or consent management tool.",
      ],
    },
    {
      title: "10. Legal Requirements",
      body: [
        "Our use of cookies and similar technologies is intended to comply with applicable UK privacy and electronic communications requirements, including the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and applicable UK rules governing the use of cookies and similar technologies.\n\nWhere the use of a cookie involves processing personal data, our Privacy Policy provides further information about the relevant processing and your data-protection rights.",
      ],
    },
    {
      title: "11. Changes to This Cookie Policy",
      body: [
        "We may update this Cookie Policy periodically to reflect changes to our website, the technologies we use, our services, or applicable legal and regulatory requirements.\n\nWhen we make significant changes, we may provide an appropriate notice on our website.\n\nThe date at the top of this policy indicates when it was last updated.",
      ],
    },
    {
      title: "12. Contact Us",
      body: [
        [
          "If you have any questions about this Cookie Policy, our use of cookies or how we handle your personal information, please contact:\n",
          {
            text: "\nDutt Limited trading as Shaavi Healthcare\nShaavi Healthcare\nHayes, London, United Kingdom\nEmail: info@shaavihealthcare.com",
            weight: "medium",
          },
        ],
      ],
    },
  ],
  closing: "For further information about how we process personal data, please refer to our Privacy Policy.",
};
