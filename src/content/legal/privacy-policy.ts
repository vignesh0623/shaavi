import type { LegalDocument } from "./types";

/*
 * Privacy Policy page content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › Privacy Policy, node 191:7094).
 * Text keeps the design's line breaks and spacing; see ./types.ts.
 */
export const privacyPolicy: LegalDocument = {
  intro: {
    eyebrow: "Privacy Policy",
    title: "Privacy Policy",
    description: "Dutt Limited trading as Shaavi Healthcare\n Last Updated: 5 September 2026",
  },
  summary: {
    title: "Patient, Laboratory & Healthcare Data\u00a0",
    rows: [
      ["Effective date", "11 November 2025"],
      ["Last reviewed", "27 August 2026"],
      ["Next scheduled review", "August 2027"],
      [
        "Data Protection / ICO Officer",
        "Vishnu Dutt - Data Protection / ICO Officer",
      ],
      [
        "Business address",
        "Unit C, Ground Floor, Front, Charlton House, Springfield Road, Hayes, United Kingdom, UB4 0LG",
      ],
      ["Telephone", "+44 20 3876 0187"],
      ["ICO registration number", "To be inserted / confirmed"],
      ["Privacy email", "info@shaavihealthcare.com"],
    ],
    note: "Governing legislation: UK GDPR and Data Protection Act 2018; EU\u00a0GDPR where\u00a0applicable.\u00a0",
  },
  sections: [
    {
      title: "1. Introduction,\u00a0Scope\u00a0and Commitment",
      body: [
        {
          subheading: "Purpose",
          text: "This Privacy Policy explains how Dutt Limited trading as\u00a0Shaavi\u00a0Healthcare (\"Shaavi Healthcare\", \"we\", \"us\" or \"our\") collects, uses, processes, stores, shares and protects personal data when a healthcare professional, clinic, hospital, insurer or other healthcare provider (a \"Referrer\"), or a patient directly, requests pathology, diagnostic laboratory, health screening or related healthcare services from us.\u00a0",
        },
        {
          subheading: "Our commitment",
          text: "Shaavi Healthcare takes patient privacy, medical\u00a0confidentiality\u00a0and data protection seriously. Because our services involve sensitive health information, we use appropriate\u00a0organisational\u00a0and technical measures designed to protect personal data against\u00a0unauthorised\u00a0access, disclosure, alteration,\u00a0loss\u00a0or misuse. Staff,\u00a0contractors\u00a0and relevant service providers are expected to\u00a0maintain\u00a0appropriate standards\u00a0of confidentiality and data protection.\u00a0",
        },
        {
          subheading: "Changes to this policy",
          text: "We may update this policy to reflect changes in our services, legal obligations,\u00a0technology\u00a0or data-processing activities. The latest version will be made available through our website or other\u00a0appropriate communication\u00a0channels. Where\u00a0appropriate, we may notify affected individuals of significant changes.\u00a0",
        },
      ],
    },
    {
      title: "2. Contact Information and Data Protection Responsibilities",
      body: [
        {
          text: "Legal Entity: Dutt Limited\u00a0\nTrading As: Shaavi Healthcare\u00a0\nData Protection / ICO Officer: Vishnu Dutt\u00a0\nAddress: Unit C, Ground Floor, Front, Charlton House, Springfield Road, Hayes, United Kingdom, UB4 0LG\u00a0\nTelephone: +44 20 3876 0187\u00a0\nICO Registration Number: To\u00a0be inserted\u00a0/\u00a0confirmed\u00a0before publication.\u00a0\nPrivacy/Data Protection Email: info@shaavihealthcare.com\u00a0\nQuestions about this policy, our processing of personal data, or requests to exercise data protection rights should be directed to the Data Protection / ICO Officer.\u00a0",
          relaxed: true,
        },
      ],
    },
    {
      title: "3. Our Role as Data Controller and Data Processor",
      body: [
        {
          text: "Shaavi Healthcare’s role depends on how the service is requested and the circumstances of the processing. Where a patient\u00a0purchases\u00a0or requests a service directly from us,\u00a0Shaavi\u00a0Healthcare will\u00a0generally act\u00a0as a Data Controller for the information necessary to provide and administer that service.\u00a0",
          relaxed: true,
        },
        {
          text: "Where a healthcare professional, clinic, hospital, insurer or other\u00a0organisation\u00a0sends a patient sample or information to us for testing, Shaavi Healthcare may act as a Data Processor, independent Data Controller or joint Data Controller for particular activities, depending on the circumstances and applicable law. Where we act solely as a Processor, we process personal data according to the documented instructions of the relevant Controller, subject to legal and regulatory requirements.\u00a0",
          relaxed: true,
        },
        {
          text: "We may act as an independent Controller for our own legal,\u00a0regulatory\u00a0and\u00a0organisational\u00a0responsibilities, including laboratory and clinical record keeping, mandatory public-health reporting, quality assurance, complaints and incidents, legal claims, financial records, information security, fraud\u00a0prevention\u00a0and business administration.\u00a0",
          relaxed: true,
        },
      ],
    },
    {
      title: "4. Personal Data We May Collect",
      body: [
        {
          text: "The information we process may include Special Category Personal Data, particularly health and genetic information. Depending on the service, we may process:\u00a0",
          relaxed: true,
        },
        {
          list: [
            "Identity data: name, date of birth, sex/gender where clinically relevant, NHS number, patient/laboratory identifiers, sample\u00a0identifiers\u00a0and identification documents where\u00a0required.\u00a0",
            "Contact data: postal address, email address, telephone number and\u00a0authorised\u00a0or emergency contact information where appropriate.\u00a0",
            "Clinical and health data: symptoms, relevant medical history, treatments, medication, diagnostic\u00a0information\u00a0and other information needed to request or interpret tests.\u00a0",
            "Laboratory data: test requests, sample information, laboratory measurements, pathology findings, results, clinical comments,\u00a0reports\u00a0and quality-control/audit information.\u00a0",
            "Referrer\u00a0data: clinician/referrer name, professional contact details,\u00a0organisation, specialty and relevant professional information.\u00a0",
            "Transaction and financial data: orders, invoices, billing details, payment status, insurer\u00a0information\u00a0and transaction information.\u00a0",
            "Technical and website data: IP address, browser/device information, operating system, cookie identifiers, website\u00a0usage\u00a0and analytics information, subject to applicable consent requirements.\u00a0",
            "Other Special Category Data where genuinely necessary and lawful, such as racial or ethnic origin, sex\u00a0life\u00a0or sexual orientation where clinically relevant.\u00a0",
            "Aggregated or\u00a0anonymised\u00a0data used for quality improvement, audit, service planning,\u00a0research\u00a0or analysis where individuals are no longer identifiable.\u00a0",
          ],
          relaxed: true,
        },
      ],
    },
    {
      title: "5. How We Obtain Personal Data",
      body: [
        "We may obtain information directly from patients through registration, test requests, consent forms, samples, enquiries, telephone or email communications, website use, payments,\u00a0complaints\u00a0and data-rights requests. We may also receive information from GPs, consultants, hospitals, clinics, pharmacies, healthcare professionals, corporate healthcare providers,\u00a0insurers\u00a0and other\u00a0authorised\u00a0Referrers.\u00a0",
        "Technical information may be collected automatically through cookies and similar technologies. Transaction information may be received from\u00a0authorised\u00a0payment providers. We also create laboratory information when receiving specimens,\u00a0analysing\u00a0samples,\u00a0validating\u00a0tests\u00a0and producing reports.\u00a0",
        "Where information is\u00a0required\u00a0to fulfil a contract, provide a healthcare service or meet a legal requirement, failure to provide it may mean that we cannot provide some or\u00a0all of\u00a0the requested service.\u00a0",
      ],
    },
    {
      title: "6. Purposes and Lawful Bases for Processing",
      body: [
        "We process personal data only where\u00a0an appropriate lawful\u00a0basis applies. Depending on the activity, these may include performance of a contract, compliance with a legal obligation, legitimate interests, and the UK GDPR conditions that permit processing of Special Category Data for medical diagnosis, provision or management of health or social care, public health, or the establishment, exercise or\u00a0defence\u00a0of legal claims.\u00a0",
        {
          subheading: "Healthcare and laboratory services",
          text: "We process information to register patients,\u00a0receive\u00a0and\u00a0identify\u00a0samples, perform and\u00a0validate\u00a0pathology or diagnostic tests, produce reports, deliver results, communicate with patients and Referrers, and administer payments and invoices.\u00a0",
        },
        {
          subheading: "Service communications and administration",
          text: "We may process information for appointments, sample requirements, test status, delays, results, payments, service issues, customer service, IT and cyber security, system maintenance, troubleshooting, fraud prevention, quality assurance, audit, reporting,\u00a0hosting\u00a0and service improvement.\u00a0",
        },
        {
          subheading: "Public health,\u00a0records\u00a0and legal claims",
          text: "We may\u00a0retain\u00a0clinical and laboratory records for continuity of care, quality,\u00a0regulatory\u00a0and medico-legal purposes. Where legally required, certain results may be reported to competent\u00a0public-health\u00a0authorities such as the UK Health Security Agency (UKHSA). Information may also be processed where necessary to\u00a0establish, exercise or defend legal claims.\u00a0",
        },
        {
          subheading: "Marketing",
          text: "Where required by law, we will obtain\u00a0appropriate consent\u00a0before sending direct electronic marketing. Marketing consent may be withdrawn at any time.\u00a0",
        },
      ],
    },
    {
      title: "7. Sharing Personal Data",
      body: [
        "Shaavi Healthcare does not sell patient or customer personal data. Where necessary and lawful, we may share information with:\u00a0",
        {
          list: [
            "Referrers and healthcare professionals involved in the requested service or patient care.\u00a0",
            "Specialist or referral laboratories where\u00a0specialised,\u00a0confirmatory\u00a0or other testing is\u00a0required.\u00a0",
            "Healthcare providers and health insurers where necessary and lawful.\u00a0",
            "IT, LIMS, secure data-hosting, cybersecurity, document-management\u00a0and communication providers acting under\u00a0appropriate contractual\u00a0safeguards.\u00a0",
            "Payment processors, accounting\u00a0providers\u00a0and other financial service providers.\u00a0",
            "Professional advisers,\u00a0auditors\u00a0and insurers.\u00a0",
            "UKHSA, NHS\u00a0organisations, regulators, courts,\u00a0law-enforcement\u00a0authorities\u00a0or other competent bodies where disclosure is\u00a0required\u00a0or\u00a0permitted\u00a0by law.\u00a0",
            "Authorised\u00a0debt-recovery providers where invoices\u00a0remain\u00a0unpaid\u00a0and disclosure is lawful and necessary.\u00a0",
            "A purchaser or successor\u00a0organisation\u00a0in connection with a lawful merger, restructuring,\u00a0acquisition\u00a0or sale, subject to\u00a0appropriate safeguards.\u00a0",
          ],
          relaxed: true,
        },
      ],
    },
    {
      title: "8. International Data Transfers",
      body: [
        "We intend to store and process personal data primarily within the United Kingdom. Personal data may occasionally be transferred outside the UK where, for example, a specialist referral laboratory,\u00a0Referrer\u00a0or\u00a0authorised\u00a0technology provider is\u00a0located\u00a0overseas.\u00a0",
        "Where UK GDPR restricted-transfer rules apply, we will use an appropriate lawful transfer mechanism, which may include UK adequacy regulations, the UK International Data Transfer Agreement (IDTA), the UK Addendum to approved EU Standard Contractual Clauses, or another legally\u00a0recognised\u00a0safeguard or derogation.\u00a0Additional\u00a0technical and\u00a0organisational\u00a0safeguards may be used where\u00a0appropriate.\u00a0",
      ],
    },
    {
      title: "9. Data Security",
      body: [
        "We intend to store and process personal data primarily within the United Kingdom. Personal data may occasionally be transferred outside the UK where, for example, a specialist referral laboratory,\u00a0Referrer\u00a0or\u00a0authorised\u00a0technology provider is\u00a0located\u00a0overseas.\u00a0",
        "Third-party processors handling personal information on our behalf are\u00a0required, where applicable, to\u00a0enter into\u00a0appropriate\u00a0data-protection\u00a0and confidentiality arrangements. We\u00a0maintain\u00a0procedures for\u00a0identifying, assessing,\u00a0managing\u00a0and documenting\u00a0personal-data\u00a0breaches. Where legally required, reportable breaches will be notified to the ICO within the applicable statutory\u00a0timeframe\u00a0and affected individuals will be informed where required by law.\u00a0",
      ],
    },
    {
      title: "10. Data Retention",
      body: [
        "We\u00a0retain\u00a0personal information only for as long as reasonably necessary for the purpose for which it was collected and to meet applicable clinical, laboratory, legal, regulatory, tax, accounting,\u00a0insurance\u00a0and medico-legal requirements.",
        "Pathology records,\u00a0reports\u00a0and specimens may be\u00a0retained\u00a0in accordance with\u00a0applicable professional guidance, including relevant recommendations of the Royal College of Pathologists where\u00a0appropriate to\u00a0our services.\u00a0Different categories\u00a0of records may therefore have different retention periods. When information is no longer\u00a0required, it will be securely\u00a0deleted,\u00a0destroyed\u00a0or\u00a0anonymised, subject to applicable legal and technical requirements.\u00a0",
      ],
    },
    {
      title: "11. Your Data Protection Rights",
      body: [
        "Subject to applicable legal limitations and exemptions, individuals may have the following rights:\u00a0",
        {
          list: [
            "Access:\u00a0to request\u00a0confirmation of processing and a copy of personal information held about you (a Data Subject Access Request or DSAR). A reasonable fee may be charged, or a request refused, only\u00a0where\u00a0permitted\u00a0by law, for example where a request is manifestly unfounded or excessive.\u00a0",
            "Rectification:\u00a0to request\u00a0correction of inaccurate data or completion of incomplete data.\u00a0",
            "Erasure: to request deletion in certain circumstances. This right is not\u00a0absolute\u00a0and\u00a0medical\u00a0or laboratory records may need to be\u00a0retained\u00a0for lawful clinical,\u00a0regulatory\u00a0or legal reasons.\u00a0",
            "Restriction:\u00a0to request\u00a0restriction of processing in certain circumstances.\u00a0",
            "Objection: to\u00a0object to certain processing based on legitimate interests or other applicable grounds.\u00a0",
            "Data portability: where applicable, to receive certain data in a structured, commonly\u00a0used\u00a0and machine-readable format or request transfer to another\u00a0organisation.\u00a0",
            "Withdrawal of consent: where consent is the lawful basis, to withdraw it at any time without affecting processing carried out before withdrawal.\u00a0",
            "Automated decision-making: where applicable, rights concerning decisions based solely on automated processing that produce legal or similarly significant effects.\u00a0",
          ],
        },
        "To exercise these rights, contact Vishnu Dutt, Data Protection / ICO Officer,\u00a0Shaavi\u00a0Healthcare. We may need to verify identity before releasing personal or medical information.\u00a0",
      ],
    },
    {
      title: "12. Complaints and the Information Commissioner’s Office",
      body: [
        "If you have concerns about how Shaavi Healthcare handles personal information, please contact Vishnu Dutt, Data Protection / ICO Officer, at the\u00a0Shaavi\u00a0Healthcare address shown in this policy. We\u00a0would welcome\u00a0the opportunity to investigate and address your concerns.\u00a0",
        "You also have the right to complain to the Information Commissioner’s Office (ICO), the UK’s independent data-protection regulator. Complaining to Shaavi Healthcare first does not affect your right to contact the ICO.\u00a0",
      ],
    },
    {
      title: "13. Cookies and Website Technologies\u00a0d the Information Commissioner’s Office",
      body: [
        "Our website may use cookies and similar technologies for essential functions, security, analytics, preferences and, where applicable and consented to, marketing. Where required under UK privacy and electronic-communications law, non-essential cookies will not be placed without\u00a0appropriate consent. Browser settings may also be used to control cookies, although blocking some cookies can affect website functionality. A separate Cookie Policy should describe the cookies used by Shaavi Healthcare.\u00a0",
      ],
    },
    {
      title: "14. Third-Party Websites",
      body: [
        "Our website may\u00a0contain\u00a0links to external websites,\u00a0applications\u00a0or services. These third parties\u00a0operate\u00a0independently and may process information under their own privacy policies. Shaavi Healthcare is not responsible for the privacy practices of independent third-party websites. Users should review the relevant privacy information before\u00a0submitting\u00a0personal information.\u00a0",
      ],
    },
    {
      title: "15. Confidentiality of Patient Information",
      body: [
        "Shaavi Healthcare\u00a0recognises\u00a0that laboratory results and medical information are confidential. Patient results will only be disclosed to\u00a0authorised\u00a0recipients, healthcare professionals, Referrers or other parties where disclosure is necessary for the requested service, appropriately\u00a0authorised, necessary for healthcare, required by law, required for public-health purposes, or otherwise permitted by applicable law.\u00a0Appropriate procedures are maintained to help verify identity and authority before confidential information is disclosed.\u00a0",
      ],
    },
    {
      title: "16. Policy Ownership and Review",
      body: [
        "This Privacy Policy is owned and overseen by Dutt\u00a0Limited\u00a0trading as\u00a0Shaavi\u00a0Healthcare. The Data Protection / ICO Officer is Vishnu Dutt. The policy will be reviewed periodically and updated where necessary following changes in legislation, regulatory guidance, Shaavi Healthcare services or processing activities.\u00a0",
      ],
    },
  ],
  record: [
    ["Policy owner", "Vishnu Dutt - Data Protection / ICO Officer"],
    ["Effective date", "11 November 2025"],
    ["Last review", "27 August 2026"],
    ["Next scheduled review", "August 2027"],
  ],
};
