import { catalogueImage } from "@/constants/images";
import type { LabProfile } from "./types";

/*
 * Profiles, from the SHAAVI B2C Price Booklet (profiles 01–27, in the
 * booklet's order). The booklet doesn't give report times or categories:
 * every profile uses the design's 48 hours and a category chosen to suit the
 * filters. Photos come from the Figma file, one per profile
 * (`public/images/profiles/<slug>.jpg`).
 */

const profileCovers = "What this profile covers";
const testMeasures = "What this test measures";

const booklet: Omit<LabProfile, "image">[] = [
  {
    slug: "general-biochemistry",
    name: "General Biochemistry",
    price: 45,
    sample: "1 SST",
    description:
      "A broad blood-testing profile covering key areas of kidney, liver, cholesterol, bone, iron and glucose health. It provides a general overview of important biochemical markers.",
    categories: ["general-wellness"],
    measures: {
      title: profileCovers,
      items: [
        "Kidney function",
        "Liver function",
        "Cholesterol and lipid levels",
        "Bone and muscle health",
        "Iron levels",
        "Blood glucose",
      ],
    },
    includedTests: [
      {
        name: "Renal Function Test",
        tests: [
          "Sodium",
          "Potassium",
          "Chloride",
          "Urea",
          "Creatinine",
          "Estimated Glomerular Filtration Rate",
        ],
      },
      {
        name: "Liver Function Test",
        tests: [
          "Total Protein",
          "Albumin",
          "Globulin",
          "Bilirubin",
          "Gamma-Glutamyl Transferase",
          "Alanine Transferase",
          "Aspartate Transferase",
          "Alkaline Phosphatase",
        ],
      },
      {
        name: "Lipid Profile",
        tests: [
          "Cholesterol",
          "HDL",
          "Triglycerides",
          "LDL",
          "Cholesterol/HDL",
          "Non-HDL Cholesterol",
        ],
      },
      { name: "Bone & Muscle Health", tests: ["Calcium", "Creatinine Kinase", "Uric Acid/Urate"] },
      { name: "Iron Levels", tests: ["Iron"] },
      { name: "Diabetes", tests: ["Glucose"] },
    ],
    goodFor: [
      "General health screening",
      "Routine health monitoring",
      "Reviewing multiple key health markers together",
    ],
    related: {
      profiles: [
        "general-sh-profile",
        "liver-function-test",
        "renal-function-test",
        "lipid-profile",
        "wellman",
      ],
    },
  },
  {
    slug: "general-haematology",
    name: "General Haematology",
    price: 25,
    sample: "1 EDTA",
    description:
      "A blood profile focused on blood cell health and inflammation-related assessment through a Full Blood Count and Erythrocyte Sedimentation Rate.",
    categories: ["general-wellness"],
    measures: {
      title: profileCovers,
      items: ["Blood cell counts", "General haematological health", "Inflammation assessment"],
    },
    includedTests: ["Full Blood Count", "Erythrocyte Sedimentation Rate"],
    goodFor: [
      "Routine blood screening",
      "General health checks",
      "Monitoring blood-related changes",
    ],
    related: {
      profiles: [
        "general-sh-profile",
        "anemia-profile",
        "fatigue-profile",
        "iron-studies",
        "wellwoman",
      ],
    },
  },
  {
    slug: "general-sh-profile",
    name: "General SH Profile",
    price: 60,
    sample: "1 SST, 1 Flox, 1 EDTA",
    description:
      "A broader health screening profile combining General Haematology and General Biochemistry for a wider overview of blood and biochemical health.",
    categories: ["general-wellness"],
    measures: {
      title: profileCovers,
      items: [
        "General haematology",
        "Kidney function",
        "Liver function",
        "Lipid health",
        "Bone and muscle markers",
        "Iron",
        "Glucose",
      ],
    },
    includedTests: ["General Haematology", "General Biochemistry"],
    goodFor: [
      "Comprehensive routine screening",
      "General health assessment",
      "Individuals wanting a broader blood-health overview",
    ],
    related: {
      profiles: [
        "general-biochemistry",
        "wellman",
        "wellwoman",
        "fatigue-profile",
        "anemia-profile",
      ],
    },
  },
  {
    slug: "wellman",
    name: "Wellman",
    price: 130,
    sample: "2 SST, 1 EDTA",
    description:
      "A men’s health screening profile combining general haematology and biochemistry with additional markers including inflammation, thyroid, ferritin and testosterone.",
    categories: ["mens-health"],
    measures: {
      title: profileCovers,
      items: [
        "General blood health",
        "Biochemical health",
        "Inflammation",
        "Thyroid function",
        "Iron stores",
        "Testosterone",
      ],
    },
    includedTests: [
      "General Haematology",
      "General Biochemistry",
      "C-Reactive Protein",
      "Thyroid Profile",
      "Ferritin",
      "Testosterone",
    ],
    goodFor: [
      "Men’s general health screening",
      "Routine wellness assessment",
      "Monitoring key men’s health markers",
    ],
    related: {
      profiles: [
        "extended-wellman",
        "general-sh-profile",
        "male-hormones-profile",
        "lipid-profile",
        "thyroid-profile",
      ],
    },
  },
  {
    slug: "wellwoman",
    name: "Wellwoman",
    price: 145,
    sample: "2 SST, 1 EDTA",
    description:
      "A women’s health screening profile combining general haematology and biochemistry with thyroid, inflammation, iron and female hormone markers.",
    categories: ["womens-health"],
    measures: {
      title: profileCovers,
      items: [
        "General blood health",
        "Biochemical health",
        "Inflammation",
        "Thyroid function",
        "Ferritin",
        "Female hormone markers",
      ],
    },
    includedTests: [
      "General Haematology",
      "General Biochemistry",
      "C-Reactive Protein",
      "Thyroid Profile",
      "Ferritin",
      "Follicle Stimulating Hormone",
      "Luteinizing Hormone",
      "Oestradiol",
    ],
    goodFor: [
      "Women’s general health screening",
      "Routine wellness assessment",
      "Monitoring selected female hormone markers",
    ],
    related: {
      profiles: [
        "extended-wellwoman",
        "general-sh-profile",
        "female-hormones-profile",
        "thyroid-profile",
        "vitamins",
      ],
    },
  },
  {
    slug: "extended-wellman",
    name: "Extended Wellman",
    price: 175,
    sample: "2 SST, 1 EDTA",
    description:
      "An extended men’s health profile combining general health screening with inflammation, thyroid, ferritin, testosterone, HbA1c and vitamins.",
    categories: ["mens-health"],
    measures: {
      title: profileCovers,
      items: [
        "General haematology",
        "General biochemistry",
        "Inflammation",
        "Thyroid",
        "Iron stores",
        "Testosterone",
        "Long-term glucose marker",
        "Vitamins",
      ],
    },
    includedTests: [
      "General Haematology",
      "General Biochemistry",
      "C-Reactive Protein",
      "Thyroid Profile",
      "Ferritin",
      "Testosterone",
      "Glycated Haemoglobin (HbA1c)",
      "Vitamins",
    ],
    goodFor: [
      "Extended men’s wellness screening",
      "Broader routine health assessment",
      "Monitoring metabolic and hormonal markers",
    ],
    related: {
      profiles: [
        "wellman",
        "male-hormones-profile",
        "thyroid-profile",
        "lipid-profile",
        "fatigue-profile",
      ],
    },
  },
  {
    slug: "extended-wellwoman",
    name: "Extended Wellwoman",
    price: 190,
    sample: "2 SST, 1 EDTA",
    description:
      "An extended women’s health screening profile covering general health, inflammation, thyroid, iron, female hormones, HbA1c and vitamins.",
    categories: ["womens-health"],
    measures: {
      title: profileCovers,
      items: [
        "General haematology",
        "General biochemistry",
        "Inflammation",
        "Thyroid",
        "Ferritin",
        "Female hormones",
        "HbA1c",
        "Vitamins",
      ],
    },
    includedTests: [
      "General Haematology",
      "General Biochemistry",
      "C-Reactive Protein",
      "Thyroid Profile",
      "Ferritin",
      "Follicle Stimulating Hormone",
      "Luteinizing Hormone",
      "Oestradiol",
      "Glycated Haemoglobin (HbA1c)",
      "Vitamins",
    ],
    goodFor: [
      "Extended women’s wellness screening",
      "Broader routine health assessment",
      "Monitoring hormonal and metabolic markers",
    ],
    related: {
      profiles: [
        "wellwoman",
        "female-hormones-profile",
        "thyroid-profile",
        "vitamins",
        "fatigue-profile",
      ],
    },
  },
  {
    slug: "liver-function-test",
    name: "Liver Function Test",
    price: 30,
    sample: "1 SST",
    description: "A blood profile assessing key markers associated with liver function and health.",
    categories: ["general-wellness"],
    measures: {
      title: testMeasures,
      items: ["Protein levels", "Albumin", "Bilirubin", "Liver enzymes"],
    },
    includedTests: [
      "Total Protein",
      "Albumin",
      "Globulin",
      "Bilirubin",
      "Gamma-Glutamyl Transferase",
      "Alanine Transferase",
      "Aspartate Transferase",
      "Alkaline Phosphatase",
    ],
    goodFor: [
      "Liver health monitoring",
      "Routine health screening",
      "Monitoring liver-related markers",
    ],
    related: {
      profiles: [
        "general-biochemistry",
        "renal-function-test",
        "lipid-profile",
        "hepatitis",
        "general-sh-profile",
      ],
    },
  },
  {
    slug: "renal-function-test",
    name: "Renal Function Test",
    price: 30,
    sample: "1 SST",
    description:
      "A blood profile assessing key markers associated with kidney function and filtration.",
    categories: ["general-wellness"],
    measures: {
      title: testMeasures,
      items: ["Electrolytes", "Urea", "Creatinine", "Estimated kidney filtration"],
    },
    includedTests: [
      "Sodium",
      "Potassium",
      "Chloride",
      "Urea",
      "Creatinine",
      "Estimated Glomerular Filtration Rate",
    ],
    goodFor: ["Kidney health monitoring", "Routine screening", "Monitoring renal function"],
    related: {
      profiles: [
        "general-biochemistry",
        "liver-function-test",
        "lipid-profile",
        "general-sh-profile",
        "wellman",
      ],
    },
  },
  {
    slug: "lipid-profile",
    name: "Lipid Profile",
    price: 30,
    sample: "1 SST",
    description:
      "A blood test assessing key fats and cholesterol-related markers to provide an overview of lipid levels.",
    categories: ["general-wellness"],
    measures: {
      title: testMeasures,
      items: [
        "Total cholesterol",
        "HDL cholesterol",
        "Triglycerides",
        "LDL cholesterol",
        "Cholesterol/HDL",
        "Non-HDL cholesterol",
      ],
    },
    includedTests: [
      "Cholesterol",
      "High Density Lipoprotein",
      "Triglycerides",
      "Low Density Lipoprotein",
      "Cholesterol: High Density Lipoprotein",
      "Non High Density Lipoprotein Cholesterol",
    ],
    goodFor: [
      "Routine cholesterol screening",
      "Monitoring lipid levels",
      "General cardiovascular risk assessment",
    ],
    related: {
      profiles: [
        "general-biochemistry",
        "renal-function-test",
        "liver-function-test",
        "wellman",
        "extended-wellman",
      ],
    },
  },
  {
    slug: "iron-studies",
    name: "Iron Studies",
    price: 30,
    sample: "1 SST",
    description:
      "A blood profile assessing iron and key markers involved in iron transport and availability.",
    categories: ["general-wellness"],
    measures: {
      title: testMeasures,
      items: ["Iron", "Total Iron Binding Capacity", "Transferrin"],
    },
    goodFor: [
      "Assessing iron status",
      "Routine nutritional screening",
      "Monitoring iron-related markers",
    ],
    related: {
      profiles: [
        "anemia-profile",
        "fatigue-profile",
        "vitamins",
        "general-haematology",
        "general-sh-profile",
      ],
    },
  },
  {
    slug: "vitamins",
    name: "Vitamins",
    price: 75,
    sample: "1 SST",
    description:
      "A blood profile assessing important vitamin levels including vitamin B12, vitamin D and folate.",
    categories: ["general-wellness"],
    measures: { title: testMeasures, items: ["Vitamin B12", "Vitamin D", "Folate"] },
    goodFor: [
      "Routine vitamin screening",
      "Monitoring vitamin levels",
      "General nutritional assessment",
    ],
    related: {
      profiles: [
        "fatigue-profile",
        "anemia-profile",
        "wellwoman",
        "extended-wellwoman",
        "extended-wellman",
      ],
    },
  },
  {
    slug: "hepatitis",
    name: "Hepatitis",
    price: 150,
    sample: "1 SST",
    description: "A blood profile covering key hepatitis B and hepatitis C markers.",
    categories: ["sexual-health"],
    measures: {
      title: testMeasures,
      items: [
        "Hepatitis B surface antibodies",
        "Hepatitis B surface antigen",
        "Hepatitis B core antibodies",
        "Hepatitis C antibodies",
        "Liver function",
      ],
    },
    goodFor: [
      "Hepatitis screening",
      "Monitoring hepatitis-related markers",
      "Clinical assessment where recommended",
    ],
    related: {
      profiles: ["liver-function-test", "general-biochemistry", "sti-blood", "general-sh-profile"],
      tests: ["hepatitis-b-surface-antigen"],
    },
  },
  {
    slug: "sti-blood",
    name: "Sexually Transmitted Infection Blood",
    price: 175,
    sample: "1 SST",
    description:
      "A blood-based screening profile covering selected infections including hepatitis B, hepatitis C, HIV and syphilis.",
    categories: ["sexual-health"],
    measures: {
      title: testMeasures,
      items: [
        "Hepatitis B Surface Antigen",
        "Anti-Hepatitis C Virus Antibody",
        "Human Immunodeficiency Virus",
        "Syphilis",
      ],
    },
    goodFor: [
      "STI blood screening",
      "Sexual health screening",
      "Testing where recommended by a healthcare professional",
    ],
    related: {
      profiles: ["sti-pcr", "hepatitis"],
      tests: ["hepatitis-b-surface-antigen", "human-immunodeficiency-virus", "syphilis"],
    },
  },
  {
    slug: "sti-pcr",
    name: "Sexually Transmitted Infection PCR",
    price: 150,
    sample: "Swab, Urine",
    specimen: "swab or urine",
    description: "A PCR-based screening profile covering selected sexually transmitted infections.",
    categories: ["sexual-health"],
    measures: {
      title: testMeasures,
      items: [
        "Chlamydia Trachomatis",
        "Neisseria Gonorrhoeae",
        "Mycoplasma Genitalium",
        "Trichomonas Vaginalis",
      ],
    },
    goodFor: ["STI screening", "Sexual health assessment", "Testing where recommended"],
    related: {
      profiles: ["sti-blood", "hepatitis"],
      tests: ["chlamydia-trachomatis", "neisseria-gonorrhoeae", "mycoplasma-genitalium"],
    },
  },
  {
    slug: "cancer-marker-female",
    name: "Cancer Marker Female",
    price: 125,
    sample: "1 SST",
    description:
      "A blood profile measuring selected tumour markers used as part of appropriate clinical assessment.",
    categories: ["womens-health", "cancer-markers"],
    measures: {
      title: testMeasures,
      items: ["CA-125", "CA-153", "CA-199", "Carcino Embryonic Antigen (CEA)"],
    },
    goodFor: [
      "Female-focused tumour marker assessment",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "female-hormones-profile",
        "wellwoman",
        "extended-wellwoman",
        "thyroid-profile",
        "vitamins",
      ],
    },
  },
  {
    slug: "cancer-marker-male",
    name: "Cancer Marker Male",
    price: 125,
    sample: "1 SST",
    description:
      "A blood profile measuring selected tumour markers used as part of appropriate clinical assessment.",
    categories: ["mens-health", "cancer-markers"],
    measures: {
      title: testMeasures,
      items: ["Carcino Embryonic Antigen", "Prostate Specific Antigen", "CA-199"],
    },
    goodFor: [
      "Male-focused tumour marker assessment",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "prostate",
        "male-hormones-profile",
        "wellman",
        "extended-wellman",
        "thyroid-profile",
      ],
    },
  },
  {
    slug: "prostate",
    name: "Prostate",
    price: 50,
    sample: "1 SST",
    description:
      "A blood test measuring Prostate Specific Antigen as a marker used in prostate health assessment.",
    categories: ["mens-health"],
    measures: { title: testMeasures, items: ["Prostate Specific Antigen"] },
    goodFor: ["Prostate health assessment", "PSA monitoring where clinically appropriate"],
    related: {
      profiles: [
        "cancer-marker-male",
        "male-hormones-profile",
        "wellman",
        "extended-wellman",
        "erectile-dysfunction",
      ],
    },
  },
  {
    slug: "thyroid-profile",
    name: "Thyroid Profile",
    price: 65,
    sample: "1 SST",
    description: "A thyroid blood profile measuring key hormones involved in thyroid function.",
    categories: ["general-wellness", "hormones"],
    measures: {
      title: testMeasures,
      items: ["Thyroid Stimulating Hormone", "Free Thyroxine", "Free Triiodothyronine"],
    },
    goodFor: [
      "Thyroid function assessment",
      "Routine thyroid monitoring",
      "Follow-up testing where recommended",
    ],
    related: {
      profiles: [
        "full-thyroid",
        "wellman",
        "wellwoman",
        "fatigue-profile",
        "female-hormones-profile",
      ],
    },
  },
  {
    slug: "full-thyroid",
    name: "Full Thyroid",
    price: 175,
    sample: "1 SST",
    description:
      "An extended thyroid profile combining thyroid hormones with thyroid antibody markers.",
    categories: ["general-wellness", "hormones"],
    measures: {
      title: testMeasures,
      items: [
        "Thyroid Profile",
        "Thyroxine",
        "Triiodothyronine",
        "Anti Thyroglobulin Antibodies",
        "Anti Thyroid Peroxidase",
      ],
    },
    goodFor: [
      "Extended thyroid assessment",
      "Monitoring thyroid-related markers",
      "Further thyroid evaluation where recommended",
    ],
    related: {
      profiles: [
        "thyroid-profile",
        "wellwoman",
        "wellman",
        "fatigue-profile",
        "female-hormones-profile",
      ],
    },
  },
  {
    slug: "female-hormones-profile",
    name: "Female Hormones Profile",
    price: 90,
    sample: "1 SST",
    description: "A hormone profile measuring key female reproductive and hormonal markers.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: {
      title: testMeasures,
      items: [
        "Luteinizing Hormone",
        "Follicle Stimulating Hormone",
        "Prolactin",
        "Progesterone",
        "Oestradiol",
      ],
    },
    goodFor: [
      "Female hormone assessment",
      "Hormonal monitoring",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "wellwoman",
        "extended-wellwoman",
        "pcos-short",
        "pcos-extended",
        "thyroid-profile",
      ],
    },
  },
  {
    slug: "male-hormones-profile",
    name: "Male Hormones Profile",
    price: 125,
    sample: "1 SST",
    description: "A male hormone profile covering testosterone and related hormone markers.",
    categories: ["mens-health", "fertility", "hormones"],
    measures: {
      title: testMeasures,
      items: [
        "Albumin",
        "Testosterone",
        "Sex Hormone Binding Globulin",
        "Free Testosterone",
        "Free Androgen Index",
        "Luteinizing Hormone",
        "Follicle Stimulating Hormone",
        "Prolactin",
      ],
    },
    goodFor: [
      "Male hormone assessment",
      "Hormonal monitoring",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "wellman",
        "extended-wellman",
        "erectile-dysfunction",
        "prostate",
        "thyroid-profile",
      ],
    },
  },
  {
    slug: "fatigue-profile",
    name: "Fatigue Profile",
    price: 100,
    sample: "1 SST, 1 EDTA",
    description:
      "A multi-marker profile covering blood health, iron status, glucose control, thyroid function and key vitamins.",
    categories: ["general-wellness"],
    measures: {
      title: profileCovers,
      items: [
        "General haematology",
        "Iron studies",
        "HbA1c",
        "Ferritin",
        "Thyroid Stimulating Hormone",
        "Vitamin D",
        "Vitamin B12",
      ],
    },
    goodFor: [
      "General fatigue-related health assessment",
      "Nutritional marker screening",
      "Reviewing multiple potential contributing health markers",
    ],
    related: {
      profiles: [
        "anemia-profile",
        "iron-studies",
        "vitamins",
        "thyroid-profile",
        "general-haematology",
      ],
    },
  },
  {
    slug: "anemia-profile",
    name: "Anemia Profile",
    price: 140,
    sample: "1 SST, 1 EDTA",
    description:
      "A blood profile covering blood count, iron-related markers, inflammation and key vitamins associated with blood health.",
    categories: ["general-wellness"],
    measures: {
      title: profileCovers,
      items: [
        "Full Blood Count",
        "Iron Studies",
        "C-Reactive Protein",
        "Ferritin",
        "Folate",
        "Vitamin B12",
      ],
    },
    goodFor: [
      "Anaemia-related assessment",
      "Iron and vitamin status assessment",
      "Further investigation where recommended",
    ],
    related: {
      profiles: [
        "iron-studies",
        "general-haematology",
        "fatigue-profile",
        "vitamins",
        "general-sh-profile",
      ],
    },
  },
  {
    slug: "erectile-dysfunction",
    name: "Erectile Dysfunction",
    price: 150,
    sample: "1 SST, 1 EDTA",
    description:
      "A multi-marker profile covering lipid, hormone, prostate, thyroid and glucose-related markers relevant to men’s health assessment.",
    categories: ["mens-health", "hormones"],
    measures: {
      title: profileCovers,
      items: [
        "Lipid Profile",
        "Albumin",
        "Testosterone",
        "Sex Hormone Binding Globulin",
        "Free Testosterone",
        "Free Androgen Index",
        "Prolactin",
        "Prostate Specific Antigen",
        "Thyroid Profile",
        "HbA1c",
      ],
    },
    goodFor: [
      "Men’s hormonal assessment",
      "Broader health screening related to erectile dysfunction",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "male-hormones-profile",
        "prostate",
        "wellman",
        "extended-wellman",
        "lipid-profile",
      ],
    },
  },
  {
    slug: "pcos-short",
    name: "Polycystic Ovary Syndrome: Short",
    price: 145,
    sample: "2 SST, 1 Flox",
    description:
      "A focused PCOS profile combining lipid, glucose, hormone, insulin and thyroid markers.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: {
      title: profileCovers,
      items: [
        "Lipid Profile",
        "Glucose",
        "Testosterone",
        "Sex Hormone Binding Hormone",
        "Free Androgen Index",
        "Follicle Stimulating Hormone",
        "Luteinizing Hormone",
        "Insulin",
        "Thyroid Profile",
      ],
    },
    goodFor: [
      "PCOS-related assessment",
      "Hormonal and metabolic screening",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "pcos-extended",
        "female-hormones-profile",
        "extended-wellwoman",
        "wellwoman",
        "thyroid-profile",
      ],
    },
  },
  {
    slug: "pcos-extended",
    name: "Polycystic Ovary Syndrome: Extended",
    price: 450,
    sample: "2 SST, 1 Flox, 1 EDTA",
    description:
      "An extended PCOS profile covering a broad range of metabolic, hormonal, thyroid and reproductive markers.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: {
      title: profileCovers,
      items: [
        "Lipid Profile",
        "Glucose",
        "HbA1c",
        "Insulin",
        "Cortisol",
        "Thyroid Stimulating Hormone",
        "Testosterone",
        "Sex Hormone Binding Hormone",
        "Dehydroepiandrosterone Sulfate",
        "Follicle Stimulating Hormone",
        "Luteinizing Hormone",
        "Prolactin",
        "Anti Mullerian Hormone",
        "17-Hydroxyprogesterone",
        "Androstenedione",
      ],
    },
    goodFor: [
      "Extended PCOS-related assessment",
      "Hormonal and metabolic evaluation",
      "Testing recommended as part of clinical evaluation",
    ],
    related: {
      profiles: [
        "pcos-short",
        "female-hormones-profile",
        "extended-wellwoman",
        "wellwoman",
        "thyroid-profile",
      ],
    },
  },
];

/** Each one's photo is named after its slug (`catalogueImage`). */
export const profiles: LabProfile[] = booklet.map((entry) => ({
  ...entry,
  image: catalogueImage("profiles", entry.slug),
}));
