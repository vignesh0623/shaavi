import type { LegalDocument } from "./types";

/*
 * Terms and Conditions page content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › Terms and Conditions, node 191:6687).
 * Text keeps the design's line breaks and spacing; see ./types.ts.
 */
export const termsOfService: LegalDocument = {
  intro: {
    eyebrow: "Terms and Conditions",
    title: "Terms And Conditions Of Laboratory Services",
    description: " Dutt Limited trading as Shaavi Healthcare\n Effective Date: 5 September 2026",
  },
  preamble: " These Terms and Conditions govern the provision of clinical laboratory, pathology, specimen collection and related diagnostic services by Dutt Limited trading as Shaavi Healthcare (“Shaavi Healthcare”, “we”, “us” or “our”).\n\nBy requesting, purchasing, booking or using our services, the patient, healthcare professional, clinic, laboratory or other organisation requesting the service (“Client”, “you” or “your”) agrees to these Terms and Conditions.\n\nThese Terms should be read together with our Privacy Policy, Cookie Policy and any applicable patient consent or specimen collection information.",
  sections: [
    {
      title: "1. Our Services",
      body: [
        "Shaavi Healthcare provides private clinical laboratory and diagnostic testing services from its laboratory in Hayes, London.\n\nOur services may include laboratory testing, pathology services, blood and other biological specimen collection, processing and analysis, diagnostic test profiles and associated reporting services.\n\nServices may be provided directly to members of the public and/or through healthcare professionals, clinics, hospitals, laboratories and other healthcare organisations.\n\nWe will take reasonable care to ensure that laboratory services are performed by appropriately trained and competent personnel using appropriate laboratory procedures, equipment and quality-control processes.\n\nThe availability of individual tests may change from time to time.",
      ],
    },
    {
      title: "2. Requests for Laboratory Testing",
      body: [
        "Laboratory tests may be requested by an authorised healthcare professional, clinic, laboratory or other permitted healthcare provider or, where appropriate, directly by a patient through self-referral.\n\nThe person requesting a test is responsible for providing complete and accurate information necessary for us to perform and report the requested investigation.\n\nThis may include:\n\n * Patient’s full name;\n * Date of birth;\n * Sex where clinically relevant;\n * Contact information;\n * Details of the requesting clinician or organisation;\n * Date and time of specimen collection;\n * Type and source of specimen;\n * Tests requested;\n * Relevant clinical information where required; and\n * Any other information reasonably required by the laboratory.\n\nIncomplete, inaccurate or inconsistent information may result in testing being delayed, cancelled or the specimen being rejected.",
      ],
    },
    {
      title: "3. Specimen Identification and Acceptance",
      body: [
        "All specimens submitted to Shaavi Healthcare must be correctly identified and appropriately collected, labelled, packaged, stored and transported.\n\nSpecimens should contain sufficient patient identifiers to allow the laboratory to establish that the specimen belongs to the correct patient.\n\nWhere a specimen does not meet our acceptance criteria, we reserve the right to reject the specimen or request a replacement specimen.\n\nReasons may include, but are not limited to:\n\n * Incorrect or insufficient patient identification;\n * Unlabelled or incorrectly labelled specimens;\n * Incorrect specimen type or collection container;\n * Insufficient specimen volume;\n * Leaking or damaged containers;\n * Improper storage or transportation;\n * Excessively haemolysed, clotted or otherwise unsuitable specimens;\n * Specimens received outside appropriate stability requirements; or\n * Missing or incomplete request information.\n\nWhere appropriate, the requesting healthcare professional or patient will be informed that recollection is required.",
      ],
    },
    {
      title: "4. Collection of Blood and Other Specimens",
      body: [
        "Where Shaavi Healthcare provides specimen collection services, the patient consents to the collection of blood and/or other biological specimens required for the tests requested.\n\nProcedures such as venepuncture are routinely performed and are generally considered low risk. However, possible effects can include temporary discomfort, bruising, bleeding, swelling, dizziness, fainting and, less commonly, infection or other complications.\n\nPatients should inform the person collecting their specimen of any relevant medical condition, previous difficulties with blood collection, allergies, medication or other information that may affect the procedure.",
      ],
    },
    {
      title: "5. Patient Consent",
      body: [
        "By proceeding with testing, the patient confirms that they have voluntarily consented to the collection, processing and analysis of the relevant specimen.\n\nWhere testing has been requested by a healthcare professional or organisation, that referrer is responsible for ensuring that appropriate patient consent has been obtained where required.\n\nCertain specialised investigations may require additional consent or clinical information before testing can proceed.",
      ],
    },
    {
      title: "6. Clinical Information",
      body: [
        "Accurate clinical and patient information can be important for appropriate testing and interpretation.\n\nThe Client or referring healthcare professional must provide relevant clinical information where reasonably required by Shaavi Healthcare.\n\nShaavi Healthcare cannot accept responsibility for an incorrect, incomplete or misleading result or interpretation to the extent that it results from inaccurate, incomplete or misleading information supplied to us.",
      ],
    },
    {
      title: "7. Turnaround Times",
      body: [
        "Any turnaround time provided by Shaavi Healthcare is an estimated or indicative turnaround time and is not guaranteed, unless expressly agreed otherwise in writing.\n\nTurnaround time may be affected by circumstances including:\n\n * The nature or complexity of the test;\n * The time the specimen is received;\n * Specimen quality;\n * Repeat or confirmatory testing;\n * Instrument or technical issues;\n * Reagent or consumable availability;\n * Referral to a specialist or external laboratory;\n * Public holidays and weekends;\n * Additional clinical information being required; or\n * Circumstances outside our reasonable control.\n\nPatient care and analytical accuracy take priority over estimated reporting times.",
      ],
    },
    {
      title: "8. Laboratory Results",
      body: [
        "Results will be issued through an appropriate secure reporting method to the patient, referring healthcare professional or authorised organisation, as applicable.\n\nLaboratory results must be interpreted in the context of the patient’s clinical history, symptoms, examination and other relevant medical information.\n\nA laboratory result alone may not establish or exclude a diagnosis.\n\nWhere testing has been requested by a healthcare professional, patients should discuss the results and any appropriate treatment or further investigation with their healthcare professional.\n\nShaavi Healthcare does not replace a patient’s GP, consultant or other treating healthcare professional.",
      ],
    },
    {
      title: "9. Critical or Significantly Abnormal Results",
      body: [
        "Where a result meets our criteria for urgent or critical communication, Shaavi Healthcare may attempt to contact the referring healthcare professional, patient or another appropriate authorised person using the contact information supplied to us.\n\nIt is therefore important that accurate and current contact information is provided.\n\nPatients experiencing serious or urgent symptoms should not wait for laboratory results and should seek appropriate urgent medical assistance.",
      ],
    },
    {
      title: "10. Repeat and Confirmatory Testing",
      body: [
        "Shaavi Healthcare may repeat a test where reasonably necessary for quality assurance, verification, confirmation or investigation of an unexpected result.\n\nIn some circumstances, additional testing or a new specimen may be required before a result can be issued.\n\nWhere clinically or analytically appropriate, a specimen may also be referred to another specialist laboratory.",
      ],
    },
    {
      title: "11. Referral Laboratories",
      body: [
        "Shaavi Healthcare may use appropriately selected third-party or specialist referral laboratories for tests that are not performed within our own laboratory or where confirmatory or specialist testing is required.\n\nBy requesting laboratory services from us, the Client acknowledges that certain investigations may be referred to another laboratory where appropriate.\n\nWhere referral testing is required, turnaround times may be dependent upon the external laboratory and may therefore be longer than our standard laboratory turnaround times.",
      ],
    },
    {
      title: "12. Storage and Disposal of Specimens",
      body: [
        "Following completion of testing, specimens may be retained for an appropriate period in accordance with laboratory requirements, applicable standards, clinical requirements and our internal retention policies.\n\nDuring an appropriate retention period, a specimen may be used for repeat or confirmatory testing, quality assurance or other legitimate laboratory purposes where permitted.\n\nAfter the applicable retention period, specimens will be securely destroyed or disposed of in accordance with applicable requirements and laboratory procedures.\n\nNot all specimen types can be retained for additional testing.",
      ],
    },
    {
      title: "13. Prices and Payment",
      body: [
        "The price payable for laboratory services will normally be the price displayed, quoted or otherwise agreed at the time the service is requested.\n\nPrices may be amended from time to time.\n\nPrivate patients may be required to pay for services before specimen collection or testing.\n\nFor healthcare organisations, clinics, laboratories and other approved account customers, invoices will be issued in accordance with the agreed commercial arrangements and payment terms.\n\nAdditional charges may apply for services such as specimen collection, courier services, urgent testing, specialist referral testing or other additional services where applicable.\n\nWhere VAT is legally applicable to a service, it will be charged at the appropriate rate.",
      ],
    },
    {
      title: "14. Cancellation and Refunds",
      body: [
        "Where a patient has purchased or booked a laboratory service but wishes to cancel, any refund will depend on whether specimen collection, laboratory processing or other services have already commenced.\n\nOnce a specimen has been collected or laboratory testing has commenced, the cost of the test may be non-refundable.\n\nWhere Shaavi Healthcare is unable to perform a test for reasons attributable to us and no suitable alternative can be provided, an appropriate refund or alternative arrangement may be offered.\n\nThis section does not affect any statutory rights that a consumer may have under applicable UK law.",
      ],
    },
    {
      title: "15. Referring Healthcare Professionals and Organisations",
      body: [
        "Healthcare professionals, clinics, laboratories and other organisations referring specimens to Shaavi Healthcare are responsible for:\n\n * Correct patient identification;\n * Obtaining appropriate patient consent;\n * Providing complete and accurate request information;\n * Appropriate specimen collection and labelling;\n * Appropriate packaging, storage and transportation prior to receipt by Shaavi Healthcare;\n * Providing relevant clinical information;\n * Providing reliable contact information;\n * Reviewing results provided to them; and\n * Taking appropriate clinical action where required.\n\n The referrer must promptly notify Shaavi Healthcare if any information provided with a request is discovered to be incorrect.",
      ],
    },
    {
      title: "16. Quality and Accuracy",
      body: [
        "Shaavi Healthcare aims to provide accurate and reliable laboratory results through appropriate analytical procedures, internal quality control and quality-management processes.\n\nHowever, laboratory testing is subject to recognised biological, pre-analytical, analytical and post-analytical limitations.\n\nResults may be affected by factors including specimen collection, timing, patient preparation, medication, transport conditions, biological variation and analytical limitations.\n\nWhere there is a significant discrepancy between a laboratory result and the patient’s clinical condition, appropriate medical advice should be obtained and repeat or alternative testing may be required.",
      ],
    },
    {
      title: "17. Website Information",
      body: [
        "Information provided on the Shaavi Healthcare website is intended for general information about our services and should not be regarded as individual medical advice.\n\nInformation on the website should not be used as a substitute for consultation with an appropriately qualified healthcare professional.\n\nWe make reasonable efforts to keep information accurate and current but cannot guarantee that every page will always be complete, error-free or immediately updated.",
      ],
    },
    {
      title: "18. Limitation of Liability",
      body: [
        "Nothing in these Terms excludes or limits liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation.\n\nSubject to applicable law, Shaavi Healthcare will not be responsible for loss or damage arising from circumstances outside our reasonable control or from inaccurate, incomplete or misleading information supplied by the Client or another party.\n\nFor business Clients, Shaavi Healthcare will not, to the extent permitted by law, be responsible for indirect or consequential business losses including loss of profit, revenue, business opportunity or anticipated savings.\n\nNothing in these Terms affects a consumer’s statutory rights.",
      ],
    },
    {
      title: "19. Confidentiality and Data Protection",
      body: [
        "Shaavi Healthcare recognises that laboratory and health information is confidential and requires appropriate protection.\n\nPersonal data, including health information, will be processed in accordance with applicable UK data-protection legislation and our Privacy Policy.\n\nInformation may be shared with appropriate healthcare professionals, referral laboratories, service providers or other authorised parties where this is necessary for providing laboratory services or where required or permitted by law.\n\nFurther information about how we collect, use, retain and protect personal information is available in our Privacy Policy.",
      ],
    },
    {
      title: "20. Complaints",
      body: [
        "Shaavi Healthcare aims to provide a high standard of service.\n\nIf you have a concern or complaint regarding our laboratory services, please contact us as soon as possible so that the matter can be investigated.\n\nComplaints should include sufficient information for us to identify the relevant service, patient or laboratory request.\n\nEmail: info@shaavihealthcare.com\n\nWe will aim to acknowledge, investigate and respond to complaints in accordance with our complaints procedure.",
      ],
    },
    {
      title: "21. Events Outside Our Reasonable Control",
      body: [
        "Shaavi Healthcare will not be responsible for delays or failure to provide services caused by circumstances reasonably outside our control.\n\nThese may include severe weather, transport disruption, power or telecommunications failure, equipment failure, supply-chain disruption, infectious disease outbreaks, governmental restrictions, industrial action or other exceptional events.\n\nWhere reasonably possible, we will take appropriate steps to minimise disruption to laboratory services.",
      ],
    },
    {
      title: "22. Changes to These Terms",
      body: [
        "We may amend these Terms and Conditions from time to time to reflect changes in our laboratory services, operational procedures, regulatory requirements or applicable law.\n\nThe version applicable to a service will normally be the version in force when that service is requested, unless a change is required by law or regulation.\n\nThe latest version will be published on the Shaavi Healthcare website.",
      ],
    },
    {
      title: "23. Severability",
      body: [
        "If any provision of these Terms is found to be invalid, unlawful or unenforceable, the remaining provisions will continue to apply.",
      ],
    },
    {
      title: "24. Entire Agreement – Business Clients",
      body: [
        "For healthcare organisations, clinics, laboratories and other business Clients, these Terms together with any written service agreement, quotation, account terms or other documents expressly incorporated into the agreement constitute the agreement between the parties in relation to the relevant services.\n\nWhere a separate written service agreement has been entered into and conflicts with these Terms, the expressly agreed provisions of that service agreement will take precedence.",
      ],
    },
    {
      title: "25. Governing Law and Jurisdiction",
      body: [
        "These Terms and Conditions and any dispute or claim arising from them or the provision of our services will be governed by the laws of England and Wales.\n\nThe courts of England and Wales will have jurisdiction in relation to disputes, subject to any mandatory rights available to consumers under applicable law.",
      ],
    },
    {
      title: "26. Contact Details",
      body: [
        {
          text: "Dutt Limited trading as Shaavi Healthcare\nShaavi Healthcare\nClinical Diagnostic Laboratory\nHayes, London\nUnited Kingdom\n\nEmail: info@shaavihealthcare.com",
          semibold: true,
        },
      ],
    },
  ],
  closing: "For questions concerning laboratory services, test requirements, specimens, results or these Terms and Conditions, please contact Shaavi Healthcare using the details above.",
};
