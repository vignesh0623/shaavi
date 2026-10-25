import { images } from "@/constants/images";

/*
 * FAQ page content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › FAQ, node 191:7386).
 * Answers keep the design's exact line breaks and spacing.
 */

export const faqIntro = {
  eyebrow: "FAQ",
  title: "Frequency Asked Questions",
  description:
    "At Shaavi Healthcare, we want to make diagnostic testing as simple, comfortable and convenient as possible. Below are answers to some of the questions we are commonly asked about our laboratory and blood testing services.",
};

/** Styled run inside an answer: `accent` is blue, `emphasis` is dark; both medium weight. */
export type FaqSegment = { text: string; tone?: "accent" | "emphasis"; href?: string };

/** An answer is one or more blocks; a block is plain text or styled segments. */
export type FaqBlock = string | FaqSegment[];

export type FaqItem = { question: string; answer: FaqBlock[] };

export const faqs: FaqItem[] = [
  {
    question: "What is Shaavi Healthcare?",
    answer: [
      "Shaavi Healthcare is an independent clinical diagnostic laboratory based in Hayes, London.\n\nWe provide a range of private laboratory and diagnostic testing services for individuals, healthcare professionals, clinics and other healthcare organisations.\n\nOur focus is on providing a professional, confidential and reliable service, supported by experienced laboratory professionals and robust quality processes.",
    ],
  },
  {
    question: "Can I have a blood test without a GP referral?",
    answer: [
      "For many of our private blood tests, you may be able to book directly without a GP referral.\n\n However, some specialised tests may require a referral, additional clinical information or consultation with an appropriate healthcare professional.\n\nPlease contact us if you are unsure which test you require",
    ],
  },
  {
    question: "What blood tests do you offer?",
    answer: [
      "We offer a wide range of routine and specialised laboratory investigations. Depending on availability, these may include:",
      "* Full Blood Count (FBC)\n * Liver Function Tests (LFT)\n * Kidney/Renal Function Tests\n * Cholesterol and Lipid Profiles\n * Diabetes and HbA1c Testing\n * Thyroid Function Tests\n * Iron and Ferritin\n * Vitamin B12 and Folate\n * Vitamin D\n * Hormone Profiles\n * Fertility-related Blood Tests\n * Men’s and Women’s Health Profiles\n * General Health and Wellness Profiles\n * Infection and Immunity Testing\n * Other specialised laboratory investigations",
      "Please contact Shaavi Healthcare for our current test menu, prices and sample requirements.",
    ],
  },
  {
    question: "Do I need to make an appointment?",
    answer: [
      "Appointments may be required for blood collection and certain specialised tests.\n\nPlease contact us or use our online booking service, where available, to arrange a suitable appointment.",
    ],
  },
  {
    question: "Do I need to fast before my blood test?",
    answer: [
      "Not all blood tests require fasting.\n\nCertain investigations may require you to avoid food for a specified period before your blood sample is collected. If fasting is required, we will provide you with appropriate instructions.\n\nUnless you have been given different medical instructions, water is generally permitted during a fasting period.\n\nIf you have eaten when you were supposed to fast, please tell our team before your sample is collected.",
    ],
  },
  {
    question: "Can I take my normal medication before my blood test?",
    answer: [
      "You should not stop taking prescribed medication unless your doctor or another appropriately qualified healthcare professional has advised you to do so.\n\nSome laboratory tests can be affected by medication, supplements or the timing of your dose.\n\nPlease tell us about any relevant medication or supplements you are taking when requested.",
    ],
  },
  {
    question: "What should I bring to my appointment?",
    answer: [
      "Depending on the test, we may ask you to bring:\n\n * Photo identification;\n * Your booking confirmation;\n * A laboratory request form if you have been referred by a doctor or clinic;\n * Details of relevant medication; and\n * Any specific test kit or documentation that has been provided to you.\n\n If you are unsure, please contact us before attending.",
    ],
  },
  {
    question: "What happens during a blood test?",
    answer: [
      "A trained healthcare professional will usually collect a small amount of blood from a vein in your arm using a sterile needle.\n\nThe procedure normally takes only a few minutes.\n\nThe collected sample is correctly identified and then processed for the laboratory tests that have been requested.",
    ],
  },
  {
    question: "I am nervous about needles. Can you help?",
    answer: [
      "Yes. Please tell our phlebotomist before your blood test if you are nervous, have previously felt faint or have had difficulty having blood taken.\n\nOur team will do their best to make the procedure as comfortable as possible.",
    ],
  },
  {
    question: "I am nervous about needles. Can you help?",
    answer: [
      "Turnaround times depend on the type of investigation requested.\n\nSome routine tests may be available relatively quickly, while specialised investigations can take several days or longer. Tests referred to a specialist external laboratory may also require additional time.\n\nWhen you book your test, we can provide an estimated turnaround time.\n\nPlease remember that turnaround times are estimates rather than guarantees. Occasionally, a sample may require repeat analysis, confirmation or further investigation before a result can safely be released.",
    ],
  },
  {
    question: "How will I receive my results?",
    answer: [
      "Results will be provided through the appropriate secure reporting method according to how your test was requested.\n\nIf your test was requested by a GP, clinic or other healthcare professional, your results may be sent directly to the requesting healthcare professional.\n\nFor eligible private/self-requested tests, results may be provided directly to you using the secure reporting method offered by Shaavi Healthcare.\n\nWe take patient confidentiality and data protection seriously and will take appropriate steps to verify identity where necessary.",
    ],
  },
  {
    question: "Can Shaavi Healthcare explain my results?",
    answer: [
      "Your laboratory report may show the result together with the applicable reference range or other laboratory information.\n\nHowever, laboratory results should be considered alongside your symptoms, medical history, medication and other clinical information.\n\nWhere medical interpretation, diagnosis or treatment is required, you should discuss your results with your GP, consultant or another appropriately qualified healthcare professional.\n\n A laboratory result should not be used by itself to make changes to prescribed medication or medical treatment",
    ],
  },
  {
    question: "What happens if my result is abnormal?",
    answer: [
      "An abnormal result does not always mean that you have a medical condition.\n\nResults can be influenced by many factors, including age, biological variation, medication, diet, exercise, timing of sample collection and your general health.\n\nWhere appropriate, we recommend discussing abnormal results with your healthcare professional, who can interpret them in the context of your overall health.\n\nIf a result meets our criteria for urgent or critical communication, we will follow our laboratory procedures for communicating the result to the appropriate person.",
    ],
  },
  {
    question: "Why might I need to repeat my blood test?",
    answer: [
      "Occasionally, a repeat sample may be necessary.\n\nThis could happen if:\n\n * There was insufficient sample;\n * The sample was haemolysed or clotted;\n * The sample was collected in an unsuitable container;\n * There was a labelling or identification issue;\n * The sample was delayed or affected during transportation;\n * The result requires confirmation; or\n * Additional testing is clinically or analytically appropriate.\n\nRequesting another sample is an important part of ensuring that the laboratory provides a reliable result.",
    ],
  },
  {
    question: "Can I bring a urine, stool or other sample to the laboratory?",
    answer: [
      "We may accept certain patient-collected samples where the relevant test has been arranged in advance.\n\nSamples must be collected in the correct container, labelled appropriately and transported according to the instructions provided.\n\nPlease contact us before bringing a sample to the laboratory, as different investigations have different collection, storage and transportation requirements.",
    ],
  },
  {
    question: "Why can a laboratory reject a sample?",
    answer: [
      "A laboratory may be unable to test a specimen if it does not meet the required acceptance criteria.\n\nExamples include an unlabelled or incorrectly labelled specimen, insufficient sample, incorrect collection container, leakage, contamination, excessive delay in transportation or a sample that is otherwise unsuitable for reliable analysis.\n\nThese requirements are designed to protect patient safety and the accuracy of laboratory results.",
    ],
  },
  {
    question: "Can you perform tests requested by my private GP or clinic?",
    answer: [
      "Yes. Shaavi Healthcare can work with private GPs, clinics and other healthcare professionals.\n\nThe referring healthcare professional should provide the appropriate patient information, clinical details and tests required.\n\nHealthcare providers interested in using our laboratory services can contact us to discuss account arrangements, test profiles, sample collection, logistics and reporting.",
    ],
  },
  {
    question: "Do you provide services to other healthcare businesses?",
    answer: [
      "Yes. In addition to individual patients, we aim to provide laboratory services to healthcare organisations including private clinics, GPs and other healthcare providers.\n\nPlease contact our team to discuss your requirements and available laboratory services.",
    ],
  },
  {
    question: "Are my personal details and test results confidential?",
    answer: [
      "Yes. Patient confidentiality is extremely important to Shaavi Healthcare.\n\nPersonal and health information is handled in accordance with applicable UK data-protection requirements and our Privacy Policy.\n\nLaboratory results are only shared with appropriate authorised individuals or organisations, subject to applicable legal and professional requirements.",
    ],
  },
  {
    question: "Do you send any tests to other laboratories?",
    answer: [
      "Some highly specialised tests may be referred to an appropriate specialist or referral laboratory if they are not performed within our own laboratory.\n\nIf a test is referred externally, this may affect the expected turnaround time.",
    ],
  },
  {
    question: "Can I request additional tests from the same blood sample?",
    answer: [
      "Some highly specialised tests may be referred to an appropriate specialist or referral laboratory if they are not performed within our own laboratory.\n\nIf a test is referred externally, this may affect the expected turnaround time.",
    ],
  },
  {
    question: "Can children have blood tests at Shaavi Healthcare?",
    answer: [
      "Please contact us before booking a blood test for a child.\n\nThe availability of paediatric blood collection may depend on the child’s age, the investigation required and whether an appropriately trained healthcare professional is available.",
    ],
  },
  {
    question: "What if I feel unwell after having my blood taken?",
    answer: [
      "Some people experience temporary bruising, discomfort, dizziness or light-headedness following a blood test.\n\nIf you feel faint or unwell during or immediately after your blood test, please tell a member of our team.\n\nIf you develop significant or persistent symptoms after leaving the clinic, seek appropriate medical advice.",
    ],
  },
  {
    question: "Can a blood test diagnose my medical condition?",
    answer: [
      "Blood tests can provide important information about your health and can assist healthcare professionals with diagnosis, monitoring and treatment.\n\nHowever, laboratory results are usually only one part of a clinical assessment.\n\nDiagnosis should be made by an appropriately qualified healthcare professional who can consider your laboratory results together with your symptoms, medical history, examination and other investigations.",
    ],
  },
  {
    question: "Can a blood test diagnose my medical condition?",
    answer: [
      "Shaavi Healthcare provides private diagnostic laboratory services.\n\nUsing our private services does not prevent you from continuing to access NHS healthcare services for which you are eligible.\n\nIf you are receiving NHS treatment, you should keep your NHS healthcare professional informed of relevant private investigations where appropriate.",
    ],
  },
  {
    question: "How do I contact Shaavi Healthcare?",
    answer: [
      [
        {
          text: "For appointments, test information, prices, sample requirements or general laboratory enquiries, please contact:\n\n",
        },
        {
          text: "Shaavi Healthcare\nDutt Limited trading as Shaavi Healthcare\nClinical Diagnostic Laboratory\nHayes, London, United Kingdom\n\nEmail: ",
          tone: "accent",
        },
        {
          text: "info@shaavihealthcare.com",
          tone: "accent",
          href: "mailto:info@shaavihealthcare.com",
        },
        { text: "\n\n" },
        {
          text: "Our team will be happy to help with general questions about our laboratory services.",
          tone: "emphasis",
        },
      ],
    ],
  },
];

export const medicalNotice = {
  title: "Important Medical Information",
  paragraphs: [
    "Information provided on our website, including these FAQs, is for general information about our laboratory services and is not a substitute for individual medical advice, diagnosis or treatment.",
    // Cut off mid-word in the design.
    "If you have symptoms or concerns about your health, please speak to an appropriately qualified healthcare pr",
    "For a medical emergency or serious symptoms, seek urgent medical assistance rather than waiting for laboratory testing or results.",
  ],
  image: images.faq.laboratory,
};
