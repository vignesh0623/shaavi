import { catalogueImage } from "@/constants/images";
import type { LabTest } from "./types";

/*
 * Single tests, from the SHAAVI B2C Price Booklet (tests 1–70, in the
 * booklet's order). The booklet doesn't give report times, categories or
 * sample tubes: every test uses the design's 48 hours and a category chosen
 * to suit the filters. Tests it describes as blood tests show "Blood" as
 * their sample; the four STI PCR tests (no sample given) show none. Photos
 * come from the Figma file, one per test (`public/images/tests/<slug>.jpg`).
 */

const measures = "What this test measures";
const blood = "Blood";

const booklet: Omit<LabTest, "image">[] = [
  {
    slug: "albumin",
    name: "Albumin",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring albumin, an important protein in the blood, as part of general biochemical and liver-related assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Albumin levels"] },
    goodFor: [
      "General health assessment",
      "Liver-related assessment",
      "Nutritional and protein-status assessment",
    ],
    related: {
      tests: [
        "total-protein",
        "total-bilirubin",
        "alkaline-phosphatase",
        "alanine-transferase",
        "aspartate-transferase",
      ],
      profiles: ["liver-function-test", "general-biochemistry", "general-sh-profile"],
    },
  },
  {
    slug: "alkaline-phosphatase",
    name: "Alkaline Phosphatase",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring alkaline phosphatase, an enzyme included in liver and bone-related biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Alkaline Phosphatase levels"] },
    goodFor: [
      "Liver-related assessment",
      "Bone and mineral health assessment",
      "General biochemical screening",
    ],
    related: {
      tests: [
        "alanine-transferase",
        "aspartate-transferase",
        "gamma-glutamyl-transferase",
        "total-bilirubin",
        "calcium",
      ],
      profiles: ["liver-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "alanine-transferase",
    name: "Alanine Transferase",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring alanine transferase, an enzyme commonly included in liver function assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Alanine Transferase levels"] },
    goodFor: [
      "Liver health assessment",
      "General biochemical screening",
      "Monitoring liver-related markers",
    ],
    related: {
      tests: [
        "aspartate-transferase",
        "alkaline-phosphatase",
        "gamma-glutamyl-transferase",
        "total-bilirubin",
        "albumin",
      ],
      profiles: ["liver-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "aspartate-transferase",
    name: "Aspartate Transferase",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring aspartate transferase, an enzyme included in liver and general biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Aspartate Transferase levels"] },
    goodFor: [
      "Liver-related assessment",
      "General biochemical screening",
      "Monitoring relevant enzyme levels",
    ],
    related: {
      tests: [
        "alanine-transferase",
        "alkaline-phosphatase",
        "gamma-glutamyl-transferase",
        "total-bilirubin",
        "albumin",
      ],
      profiles: ["liver-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "gamma-glutamyl-transferase",
    name: "Gamma-Glutamyl Transferase",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring Gamma-Glutamyl Transferase, an enzyme included in liver-related biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Gamma-Glutamyl Transferase levels"] },
    goodFor: [
      "Liver health assessment",
      "General biochemical screening",
      "Monitoring liver-related markers",
    ],
    related: {
      tests: [
        "alanine-transferase",
        "aspartate-transferase",
        "alkaline-phosphatase",
        "total-bilirubin",
        "albumin",
      ],
      profiles: ["liver-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "total-bilirubin",
    name: "Total Bilirubin",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring total bilirubin as part of liver and general biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Total Bilirubin"] },
    goodFor: [
      "Liver-related assessment",
      "General biochemical screening",
      "Monitoring bilirubin levels",
    ],
    related: {
      tests: [
        "albumin",
        "alanine-transferase",
        "aspartate-transferase",
        "alkaline-phosphatase",
        "gamma-glutamyl-transferase",
      ],
      profiles: ["liver-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "total-protein",
    name: "Total Protein",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring total protein levels as part of general biochemical and nutritional assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Total Protein"] },
    goodFor: ["General health screening", "Protein-status assessment", "Liver-related assessment"],
    related: {
      tests: ["albumin", "total-bilirubin", "alkaline-phosphatase", "creatinine"],
      profiles: ["liver-function-test", "general-biochemistry", "general-sh-profile"],
    },
  },
  {
    slug: "sodium",
    name: "Sodium",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring sodium, an important electrolyte included in renal and biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Sodium levels"] },
    goodFor: [
      "Electrolyte assessment",
      "Kidney-related assessment",
      "General biochemical screening",
    ],
    related: {
      tests: ["potassium", "chloride", "bicarbonate", "urea", "creatinine"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "potassium",
    name: "Potassium",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring potassium levels as part of electrolyte and renal assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Potassium levels"] },
    goodFor: [
      "Electrolyte assessment",
      "Kidney-related assessment",
      "General biochemical screening",
    ],
    related: {
      tests: ["sodium", "chloride", "bicarbonate", "urea", "creatinine"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "chloride",
    name: "Chloride",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring chloride levels as part of electrolyte and biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Chloride levels"] },
    goodFor: [
      "Electrolyte assessment",
      "Kidney-related assessment",
      "General biochemical screening",
    ],
    related: {
      tests: ["sodium", "potassium", "bicarbonate", "urea", "creatinine"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "bicarbonate",
    name: "Bicarbonate",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring bicarbonate levels as part of electrolyte and biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Bicarbonate levels"] },
    goodFor: [
      "Electrolyte assessment",
      "General biochemical screening",
      "Renal-related assessment",
    ],
    related: {
      tests: ["sodium", "potassium", "chloride", "urea", "creatinine"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "creatinine",
    name: "Creatinine",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring creatinine as an important marker included in kidney function assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Creatinine levels"] },
    goodFor: ["Kidney function assessment", "General biochemical screening", "Renal monitoring"],
    related: {
      tests: ["urea", "sodium", "potassium", "chloride", "uric-acid"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "urea",
    name: "Urea",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring urea as part of kidney and general biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Urea levels"] },
    goodFor: ["Kidney function assessment", "General biochemical screening", "Renal monitoring"],
    related: {
      tests: ["creatinine", "sodium", "potassium", "chloride", "uric-acid"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "cholesterol",
    name: "Cholesterol",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring cholesterol as part of lipid and cardiovascular health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Cholesterol levels"] },
    goodFor: [
      "Routine cholesterol screening",
      "Lipid assessment",
      "General cardiovascular health assessment",
    ],
    related: {
      tests: ["triglycerides", "high-density-lipoprotein", "glucose"],
      profiles: ["lipid-profile", "general-biochemistry", "general-sh-profile"],
    },
  },
  {
    slug: "triglycerides",
    name: "Triglycerides",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring triglycerides, a type of fat found in the blood, as part of lipid assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Triglycerides"] },
    goodFor: ["Lipid screening", "Routine health assessment", "Cardiovascular risk assessment"],
    related: {
      tests: ["cholesterol", "high-density-lipoprotein", "glucose"],
      profiles: ["lipid-profile", "general-biochemistry"],
    },
  },
  {
    slug: "high-density-lipoprotein",
    name: "High Density Lipoprotein",
    shortName: "HDL",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring High Density Lipoprotein (HDL) as part of a cholesterol and lipid assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["High Density Lipoprotein"] },
    goodFor: [
      "Lipid screening",
      "Cholesterol assessment",
      "Routine cardiovascular health assessment",
    ],
    related: {
      tests: ["cholesterol", "triglycerides", "glucose"],
      profiles: ["lipid-profile", "general-biochemistry"],
    },
  },
  {
    slug: "calcium",
    name: "Calcium",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring calcium levels as part of bone, muscle and biochemical health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Calcium levels"] },
    goodFor: [
      "Bone health assessment",
      "Muscle-related assessment",
      "General biochemical screening",
    ],
    related: {
      tests: ["phosphorus", "uric-acid", "creatinine-kinase", "creatinine"],
      profiles: ["general-biochemistry", "renal-function-test"],
    },
  },
  {
    slug: "phosphorus",
    name: "Phosphorus",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring phosphorus levels as part of mineral and biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Phosphorus levels"] },
    goodFor: [
      "Mineral health assessment",
      "Bone health assessment",
      "General biochemical screening",
    ],
    related: {
      tests: ["calcium", "uric-acid", "creatinine"],
      profiles: ["general-biochemistry"],
    },
  },
  {
    slug: "uric-acid",
    name: "Uric Acid",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring uric acid levels as part of biochemical and renal assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Uric Acid"] },
    goodFor: [
      "General biochemical assessment",
      "Renal-related assessment",
      "Monitoring uric acid levels",
    ],
    related: {
      tests: ["creatinine", "urea", "calcium", "sodium"],
      profiles: ["renal-function-test", "general-biochemistry"],
    },
  },
  {
    slug: "lactate-dehydrogenase",
    name: "Lactate Dehydrogenase",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring lactate dehydrogenase, an enzyme included in certain biochemical assessments.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Lactate Dehydrogenase"] },
    goodFor: ["General biochemical assessment", "Further clinical assessment where recommended"],
    related: {
      tests: ["creatinine-kinase", "c-reactive-protein", "full-blood-count"],
      profiles: ["general-biochemistry", "general-haematology"],
    },
  },
  {
    slug: "creatinine-kinase",
    name: "Creatinine Kinase",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring creatinine kinase as part of muscle and biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Creatinine Kinase"] },
    goodFor: [
      "Muscle-related assessment",
      "General biochemical screening",
      "Further clinical evaluation where recommended",
    ],
    related: {
      tests: ["calcium", "lactate-dehydrogenase", "uric-acid"],
      profiles: ["general-biochemistry"],
    },
  },
  {
    slug: "iron",
    name: "Iron",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring iron levels as part of iron-status and nutritional assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Iron levels"] },
    goodFor: ["Iron-status assessment", "Nutritional screening", "Blood-health assessment"],
    related: {
      tests: ["total-iron-binding-capacity", "ferritin", "folate", "vitamin-b12"],
      profiles: ["iron-studies", "anemia-profile", "fatigue-profile", "vitamins"],
    },
  },
  {
    slug: "total-iron-binding-capacity",
    name: "Total Iron Binding Capacity",
    price: 20,
    sample: blood,
    description:
      "A blood test measuring Total Iron Binding Capacity as part of iron-status assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Total Iron Binding Capacity"] },
    goodFor: [
      "Iron-status assessment",
      "Nutritional assessment",
      "Further evaluation of iron-related markers",
    ],
    related: {
      tests: ["iron", "ferritin", "folate", "vitamin-b12"],
      profiles: ["iron-studies", "anemia-profile", "fatigue-profile"],
    },
  },
  {
    slug: "glucose",
    name: "Glucose",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring glucose levels as part of blood sugar and metabolic assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Glucose levels"] },
    goodFor: [
      "Routine blood glucose screening",
      "Metabolic health assessment",
      "Monitoring blood glucose levels",
    ],
    related: {
      tests: ["glycated-haemoglobin-hba1c", "insulin", "cholesterol"],
      profiles: ["general-biochemistry", "fatigue-profile", "pcos-short", "pcos-extended"],
    },
  },
  {
    slug: "c-reactive-protein",
    name: "C-Reactive Protein",
    price: 40,
    sample: blood,
    description:
      "A blood test measuring C-Reactive Protein as a marker used in inflammation-related assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["C-Reactive Protein"] },
    goodFor: [
      "Inflammation-related assessment",
      "General health evaluation",
      "Further clinical assessment where recommended",
    ],
    related: {
      tests: [
        "rheumatoid-factor",
        "erythrocyte-sedimentation-rate",
        "full-blood-count",
        "ferritin",
      ],
      profiles: ["general-haematology", "wellman", "wellwoman", "anemia-profile"],
    },
  },
  {
    slug: "rheumatoid-factor",
    name: "Rheumatoid Factor",
    price: 40,
    sample: blood,
    description: "A blood test measuring Rheumatoid Factor as part of clinical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Rheumatoid Factor"] },
    goodFor: [
      "Rheumatological assessment",
      "Inflammation-related evaluation",
      "Further testing where recommended",
    ],
    related: {
      tests: ["c-reactive-protein", "erythrocyte-sedimentation-rate", "full-blood-count"],
      profiles: ["general-haematology", "general-sh-profile"],
    },
  },
  {
    slug: "amylase",
    name: "Amylase",
    price: 40,
    sample: blood,
    description: "A blood test measuring amylase as part of biochemical assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Amylase"] },
    goodFor: ["General biochemical assessment", "Further clinical assessment where recommended"],
    related: {
      tests: ["glucose", "total-protein", "albumin"],
      profiles: ["general-biochemistry", "general-sh-profile"],
    },
  },
  {
    slug: "thyroid-stimulating-hormone",
    name: "Thyroid Stimulating Hormone",
    shortName: "TSH",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Thyroid Stimulating Hormone as part of thyroid function assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Thyroid Stimulating Hormone"] },
    goodFor: ["Thyroid function assessment", "Routine thyroid screening", "Thyroid monitoring"],
    related: {
      tests: [
        "free-thyroxine",
        "free-triiodothyronine",
        "thyroxine",
        "triiodothyronine",
        "anti-thyroid-peroxidase",
      ],
      profiles: ["thyroid-profile", "full-thyroid", "fatigue-profile"],
    },
  },
  {
    slug: "free-triiodothyronine",
    name: "Free Triiodothyronine",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Free Triiodothyronine as part of thyroid hormone assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Free Triiodothyronine"] },
    goodFor: ["Thyroid function assessment", "Thyroid hormone monitoring"],
    related: {
      tests: ["thyroid-stimulating-hormone", "free-thyroxine", "thyroxine", "triiodothyronine"],
      profiles: ["thyroid-profile", "full-thyroid"],
    },
  },
  {
    slug: "triiodothyronine",
    name: "Triiodothyronine",
    price: 25,
    sample: blood,
    description: "A blood test measuring Triiodothyronine as part of thyroid function assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Triiodothyronine"] },
    goodFor: ["Thyroid function assessment", "Thyroid hormone monitoring"],
    related: {
      tests: [
        "thyroid-stimulating-hormone",
        "free-triiodothyronine",
        "thyroxine",
        "free-thyroxine",
      ],
      profiles: ["thyroid-profile", "full-thyroid"],
    },
  },
  {
    slug: "thyroxine",
    name: "Thyroxine",
    price: 25,
    sample: blood,
    description: "A blood test measuring Thyroxine as part of thyroid function assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Thyroxine"] },
    goodFor: ["Thyroid function assessment", "Thyroid hormone monitoring"],
    related: {
      tests: [
        "thyroid-stimulating-hormone",
        "triiodothyronine",
        "free-thyroxine",
        "free-triiodothyronine",
      ],
      profiles: ["thyroid-profile", "full-thyroid"],
    },
  },
  {
    slug: "free-thyroxine",
    name: "Free Thyroxine",
    price: 25,
    sample: blood,
    description: "A blood test measuring Free Thyroxine as part of thyroid function assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Free Thyroxine"] },
    goodFor: ["Thyroid function assessment", "Thyroid hormone monitoring"],
    related: {
      tests: [
        "thyroid-stimulating-hormone",
        "free-triiodothyronine",
        "thyroxine",
        "triiodothyronine",
      ],
      profiles: ["thyroid-profile", "full-thyroid"],
    },
  },
  {
    slug: "anti-thyroglobulin-antibodies",
    name: "Anti-Thyroglobulin Antibodies",
    price: 90,
    sample: blood,
    description:
      "A blood test measuring Anti-Thyroglobulin Antibodies as part of thyroid antibody assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Anti-Thyroglobulin Antibodies"] },
    goodFor: ["Thyroid antibody assessment", "Further thyroid evaluation where recommended"],
    related: {
      tests: ["anti-thyroid-peroxidase", "thyroid-stimulating-hormone", "free-thyroxine"],
      profiles: ["full-thyroid", "thyroid-profile"],
    },
  },
  {
    slug: "anti-thyroid-peroxidase",
    name: "Anti-Thyroid Peroxidase",
    price: 90,
    sample: blood,
    description:
      "A blood test measuring Anti-Thyroid Peroxidase antibodies as part of thyroid antibody assessment.",
    categories: ["general-wellness", "hormones"],
    measures: { title: measures, items: ["Anti-Thyroid Peroxidase"] },
    goodFor: ["Thyroid antibody assessment", "Further thyroid evaluation where recommended"],
    related: {
      tests: ["anti-thyroglobulin-antibodies", "thyroid-stimulating-hormone", "free-thyroxine"],
      profiles: ["full-thyroid", "thyroid-profile"],
    },
  },
  {
    slug: "ferritin",
    name: "Ferritin",
    price: 35,
    sample: blood,
    description:
      "A blood test measuring ferritin as part of iron-storage and nutritional assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Ferritin"] },
    goodFor: ["Iron-status assessment", "Nutritional screening", "Blood-health assessment"],
    related: {
      tests: ["iron", "total-iron-binding-capacity", "folate", "vitamin-b12", "c-reactive-protein"],
      profiles: ["iron-studies", "anemia-profile", "fatigue-profile", "vitamins"],
    },
  },
  {
    slug: "folate",
    name: "Folate",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring folate levels as part of nutritional and blood-health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Folate"] },
    goodFor: ["Nutritional screening", "Blood-health assessment", "Vitamin-status assessment"],
    related: {
      tests: ["vitamin-b12", "ferritin", "iron", "total-iron-binding-capacity"],
      profiles: ["vitamins", "anemia-profile", "fatigue-profile"],
    },
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Vitamin B12 levels as part of nutritional and blood-health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Vitamin B12"] },
    goodFor: ["Nutritional screening", "Vitamin-status assessment", "Blood-health assessment"],
    related: {
      tests: ["folate", "ferritin", "iron", "vitamin-d"],
      profiles: ["vitamins", "anemia-profile", "fatigue-profile"],
    },
  },
  {
    slug: "vitamin-d",
    name: "Vitamin D",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Vitamin D levels as part of nutritional and general health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Vitamin D"] },
    goodFor: ["Vitamin-status screening", "Nutritional assessment", "General health monitoring"],
    related: {
      tests: ["vitamin-b12", "folate", "calcium", "ferritin"],
      profiles: ["vitamins", "fatigue-profile", "wellwoman", "wellman"],
    },
  },
  {
    slug: "luteinizing-hormone",
    name: "Luteinizing Hormone",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Luteinizing Hormone as part of reproductive hormone assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Luteinizing Hormone"] },
    goodFor: [
      "Reproductive hormone assessment",
      "Female hormone evaluation",
      "Hormonal monitoring",
    ],
    related: {
      tests: ["follicle-stimulating-hormone", "progesterone", "prolactin", "oestradiol"],
      profiles: ["female-hormones-profile", "wellwoman", "extended-wellwoman", "pcos-short"],
    },
  },
  {
    slug: "follicle-stimulating-hormone",
    name: "Follicle Stimulating Hormone",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Follicle Stimulating Hormone as part of reproductive hormone assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Follicle Stimulating Hormone"] },
    goodFor: [
      "Reproductive hormone assessment",
      "Female hormone evaluation",
      "Hormonal monitoring",
    ],
    related: {
      tests: ["luteinizing-hormone", "progesterone", "prolactin", "oestradiol"],
      profiles: ["female-hormones-profile", "wellwoman", "extended-wellwoman", "pcos-short"],
    },
  },
  {
    slug: "progesterone",
    name: "Progesterone",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Progesterone as part of female reproductive hormone assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Progesterone"] },
    goodFor: [
      "Female hormone assessment",
      "Reproductive hormone evaluation",
      "Hormonal monitoring",
    ],
    related: {
      tests: ["luteinizing-hormone", "follicle-stimulating-hormone", "prolactin", "oestradiol"],
      profiles: ["female-hormones-profile", "wellwoman", "extended-wellwoman"],
    },
  },
  {
    slug: "prolactin",
    name: "Prolactin",
    price: 25,
    sample: blood,
    description: "A blood test measuring Prolactin as part of hormone assessment.",
    // In both the female and the male hormone profiles.
    categories: ["hormones", "womens-health", "mens-health", "fertility"],
    measures: { title: measures, items: ["Prolactin"] },
    goodFor: ["Hormone assessment", "Reproductive hormone evaluation", "Hormonal monitoring"],
    related: {
      tests: ["luteinizing-hormone", "follicle-stimulating-hormone", "progesterone", "oestradiol"],
      profiles: ["female-hormones-profile", "male-hormones-profile", "pcos-extended"],
    },
  },
  {
    slug: "oestradiol",
    name: "Oestradiol",
    price: 25,
    sample: blood,
    description:
      "A blood test measuring Oestradiol as part of female reproductive hormone assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Oestradiol"] },
    goodFor: [
      "Female hormone assessment",
      "Reproductive hormone evaluation",
      "Hormonal monitoring",
    ],
    related: {
      tests: ["luteinizing-hormone", "follicle-stimulating-hormone", "progesterone", "prolactin"],
      profiles: ["female-hormones-profile", "wellwoman", "extended-wellwoman"],
    },
  },
  {
    slug: "anti-mullerian-hormone",
    name: "Anti Mullerian Hormone",
    price: 90,
    sample: blood,
    description:
      "A blood test measuring Anti Mullerian Hormone as part of reproductive hormone assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Anti Mullerian Hormone"] },
    goodFor: [
      "Reproductive hormone assessment",
      "Female hormonal evaluation",
      "Testing where clinically recommended",
    ],
    related: {
      tests: ["luteinizing-hormone", "follicle-stimulating-hormone", "oestradiol", "progesterone"],
      profiles: ["female-hormones-profile", "pcos-extended", "extended-wellwoman"],
    },
  },
  {
    slug: "alpha-feto-protein",
    name: "Alpha Feto Protein",
    price: 90,
    sample: blood,
    description:
      "A blood test measuring Alpha Feto Protein as a tumour marker used in appropriate clinical assessment.",
    categories: ["cancer-markers", "mens-health", "womens-health"],
    measures: { title: measures, items: ["Alpha Feto Protein"] },
    goodFor: ["Tumour-marker assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["carcino-embryonic-antigen", "c-199", "c125", "c153"],
      profiles: ["cancer-marker-female", "cancer-marker-male"],
    },
  },
  {
    slug: "carcino-embryonic-antigen",
    name: "Carcino Embryonic Antigen",
    shortName: "CEA",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Carcino Embryonic Antigen (CEA), a tumour marker used as part of appropriate clinical assessment.",
    categories: ["cancer-markers", "mens-health", "womens-health"],
    measures: { title: measures, items: ["Carcino Embryonic Antigen"] },
    goodFor: ["Tumour-marker assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["alpha-feto-protein", "c-199", "c125", "c153"],
      profiles: ["cancer-marker-female", "cancer-marker-male"],
    },
  },
  {
    slug: "c-199",
    name: "C-199",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring C-199 as a tumour marker used as part of appropriate clinical assessment.",
    categories: ["cancer-markers", "mens-health", "womens-health"],
    measures: { title: measures, items: ["C-199"] },
    goodFor: ["Tumour-marker assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["carcino-embryonic-antigen", "c125", "c153", "alpha-feto-protein"],
      profiles: ["cancer-marker-female", "cancer-marker-male"],
    },
  },
  {
    slug: "c125",
    name: "C125",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring C125 as a tumour marker used as part of appropriate clinical assessment.",
    categories: ["cancer-markers", "womens-health"],
    measures: { title: measures, items: ["C125"] },
    goodFor: ["Tumour-marker assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["c153", "c-199", "carcino-embryonic-antigen", "alpha-feto-protein"],
      profiles: ["cancer-marker-female", "cancer-marker-male"],
    },
  },
  {
    slug: "c153",
    name: "C153",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring C153 as a tumour marker used as part of appropriate clinical assessment.",
    categories: ["cancer-markers", "womens-health"],
    measures: { title: measures, items: ["C153"] },
    goodFor: ["Tumour-marker assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["c125", "c-199", "carcino-embryonic-antigen", "alpha-feto-protein"],
      profiles: ["cancer-marker-female", "cancer-marker-male"],
    },
  },
  {
    slug: "prostate-specific-antigen",
    name: "Prostate Specific Antigen",
    shortName: "PSA",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Prostate Specific Antigen (PSA) as part of prostate health assessment.",
    categories: ["mens-health"],
    measures: { title: measures, items: ["Prostate Specific Antigen"] },
    goodFor: [
      "Prostate health assessment",
      "PSA monitoring",
      "Further prostate evaluation where recommended",
    ],
    related: {
      tests: ["free-prostate-specific-antigen", "testosterone", "sex-hormone-binding-globulin"],
      profiles: ["prostate", "cancer-marker-male", "male-hormones-profile", "wellman"],
    },
  },
  {
    slug: "free-prostate-specific-antigen",
    name: "Free Prostate Specific Antigen",
    shortName: "Free PSA",
    price: 90,
    sample: blood,
    description:
      "A blood test measuring Free Prostate Specific Antigen as part of prostate-related assessment.",
    categories: ["mens-health"],
    measures: { title: measures, items: ["Free Prostate Specific Antigen"] },
    goodFor: ["Prostate health assessment", "Further PSA-related evaluation where recommended"],
    related: {
      tests: ["prostate-specific-antigen", "testosterone", "sex-hormone-binding-globulin"],
      profiles: ["prostate", "cancer-marker-male", "male-hormones-profile"],
    },
  },
  {
    slug: "testosterone",
    name: "Testosterone",
    price: 35,
    sample: blood,
    description: "A blood test measuring Testosterone as part of male hormone assessment.",
    categories: ["mens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Testosterone"] },
    goodFor: [
      "Male hormone assessment",
      "Hormonal monitoring",
      "Further clinical evaluation where recommended",
    ],
    related: {
      tests: [
        "sex-hormone-binding-globulin",
        "prolactin",
        "luteinizing-hormone",
        "follicle-stimulating-hormone",
        "prostate-specific-antigen",
      ],
      profiles: ["male-hormones-profile", "wellman", "extended-wellman", "erectile-dysfunction"],
    },
  },
  {
    slug: "sex-hormone-binding-globulin",
    name: "Sex Hormone Binding Globulin",
    shortName: "SHBG",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Sex Hormone Binding Globulin as part of male hormone assessment.",
    categories: ["mens-health", "hormones"],
    measures: { title: measures, items: ["Sex Hormone Binding Globulin"] },
    goodFor: [
      "Male hormone assessment",
      "Hormonal evaluation",
      "Further clinical assessment where recommended",
    ],
    related: {
      tests: ["testosterone", "prolactin", "luteinizing-hormone", "follicle-stimulating-hormone"],
      profiles: ["male-hormones-profile", "wellman", "erectile-dysfunction"],
    },
  },
  {
    slug: "dehydroepiandrosterone",
    name: "Dehydroepiandrosterone",
    price: 75,
    sample: blood,
    description: "A blood test measuring Dehydroepiandrosterone as part of hormone assessment.",
    categories: ["hormones"],
    measures: { title: measures, items: ["Dehydroepiandrosterone"] },
    goodFor: ["Hormonal assessment", "Further endocrine evaluation where recommended"],
    related: {
      tests: [
        "testosterone",
        "sex-hormone-binding-globulin",
        "luteinizing-hormone",
        "follicle-stimulating-hormone",
        "prolactin",
      ],
      profiles: ["pcos-extended", "male-hormones-profile", "female-hormones-profile"],
    },
  },
  {
    slug: "human-chorionic-gonadotropin",
    name: "Human Chorionic Gonadotropin",
    shortName: "hCG",
    price: 50,
    sample: blood,
    description:
      "A blood test measuring Human Chorionic Gonadotropin (hCG) as part of appropriate clinical assessment.",
    categories: ["womens-health", "fertility", "hormones"],
    measures: { title: measures, items: ["Human Chorionic Gonadotropin"] },
    goodFor: ["Hormonal assessment", "Testing where recommended by a healthcare professional"],
    related: {
      tests: ["progesterone", "oestradiol", "luteinizing-hormone"],
      profiles: ["female-hormones-profile", "wellwoman", "extended-wellwoman"],
    },
  },
  {
    slug: "cortisol",
    name: "Cortisol",
    price: 90,
    sample: blood,
    description: "A blood test measuring Cortisol as part of hormone and biochemical assessment.",
    categories: ["hormones"],
    measures: { title: measures, items: ["Cortisol"] },
    goodFor: ["Hormonal assessment", "Further clinical evaluation where recommended"],
    related: {
      tests: ["glucose", "insulin", "thyroid-stimulating-hormone", "testosterone"],
      profiles: ["pcos-extended", "female-hormones-profile", "male-hormones-profile"],
    },
  },
  {
    slug: "insulin",
    name: "Insulin",
    price: 90,
    sample: blood,
    description: "A blood test measuring Insulin as part of metabolic and hormonal assessment.",
    categories: ["hormones", "general-wellness"],
    measures: { title: measures, items: ["Insulin"] },
    goodFor: [
      "Metabolic assessment",
      "Hormonal evaluation",
      "Testing where clinically recommended",
    ],
    related: {
      tests: ["glucose", "glycated-haemoglobin-hba1c", "cortisol"],
      profiles: ["pcos-short", "pcos-extended", "general-biochemistry", "fatigue-profile"],
    },
  },
  {
    slug: "hepatitis-b-surface-antigen",
    name: "Hepatitis B Surface Antigen",
    price: 75,
    sample: blood,
    description:
      "A blood test measuring Hepatitis B Surface Antigen as part of hepatitis and infection screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Hepatitis B Surface Antigen"] },
    goodFor: ["Hepatitis screening", "Infection screening", "Testing where recommended"],
    related: {
      tests: [
        "anti-hepatitis-b-surface-antibodies",
        "anti-hepatitis-b-core-antibodies",
        "anti-hepatitis-c-antibodies",
        "human-immunodeficiency-virus",
        "syphilis",
      ],
      profiles: ["hepatitis", "sti-blood"],
    },
  },
  {
    slug: "anti-hepatitis-b-surface-antibodies",
    name: "Anti Hepatitis B Surface Antibodies",
    price: 75,
    sample: blood,
    description: "A blood test measuring antibodies against Hepatitis B Surface Antigen.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Anti Hepatitis B Surface Antibodies"] },
    goodFor: ["Hepatitis B-related assessment", "Infection screening", "Testing where recommended"],
    related: {
      tests: [
        "hepatitis-b-surface-antigen",
        "anti-hepatitis-b-core-antibodies",
        "anti-hepatitis-c-antibodies",
      ],
      profiles: ["hepatitis", "sti-blood"],
    },
  },
  {
    slug: "anti-hepatitis-b-core-antibodies",
    name: "Anti Hepatitis B Core Antibodies",
    price: 75,
    sample: blood,
    description: "A blood test measuring antibodies against Hepatitis B Core Antigen.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Anti Hepatitis B Core Antibodies"] },
    goodFor: ["Hepatitis B-related assessment", "Infection screening", "Testing where recommended"],
    related: {
      tests: [
        "hepatitis-b-surface-antigen",
        "anti-hepatitis-b-surface-antibodies",
        "anti-hepatitis-c-antibodies",
      ],
      profiles: ["hepatitis", "sti-blood"],
    },
  },
  {
    slug: "anti-hepatitis-c-antibodies",
    name: "Anti Hepatitis C Antibodies",
    price: 75,
    sample: blood,
    description:
      "A blood test measuring antibodies associated with Hepatitis C as part of infection screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Anti Hepatitis C Antibodies"] },
    goodFor: ["Hepatitis C screening", "Infection assessment", "Testing where recommended"],
    related: {
      tests: [
        "hepatitis-b-surface-antigen",
        "anti-hepatitis-b-surface-antibodies",
        "anti-hepatitis-b-core-antibodies",
        "human-immunodeficiency-virus",
      ],
      profiles: ["hepatitis", "sti-blood"],
    },
  },
  {
    slug: "human-immunodeficiency-virus",
    name: "Human Immunodeficiency Virus",
    shortName: "HIV",
    price: 75,
    sample: blood,
    description: "A blood test for Human Immunodeficiency Virus (HIV) screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Human Immunodeficiency Virus"] },
    goodFor: ["HIV screening", "Sexual health screening", "Testing where recommended"],
    related: {
      tests: ["syphilis", "hepatitis-b-surface-antigen", "anti-hepatitis-c-antibodies"],
      profiles: ["sti-blood", "sti-pcr", "hepatitis"],
    },
  },
  {
    slug: "syphilis",
    name: "Syphilis",
    price: 75,
    sample: blood,
    description: "A blood test for Syphilis screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Syphilis"] },
    goodFor: ["Sexual health screening", "Infection screening", "Testing where recommended"],
    related: {
      tests: [
        "human-immunodeficiency-virus",
        "hepatitis-b-surface-antigen",
        "anti-hepatitis-c-antibodies",
      ],
      profiles: ["sti-blood", "sti-pcr"],
    },
  },
  {
    slug: "full-blood-count",
    name: "Full Blood Count",
    price: 20,
    sample: blood,
    description:
      "A blood test assessing the main components of blood as part of general haematological health assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Full Blood Count"] },
    goodFor: ["General blood screening", "Haematological assessment", "Routine health assessment"],
    related: {
      tests: [
        "erythrocyte-sedimentation-rate",
        "c-reactive-protein",
        "ferritin",
        "iron",
        "vitamin-b12",
      ],
      profiles: ["general-haematology", "anemia-profile", "fatigue-profile", "general-sh-profile"],
    },
  },
  {
    slug: "erythrocyte-sedimentation-rate",
    name: "Erythrocyte Sedimentation Rate",
    price: 15,
    sample: blood,
    description:
      "A blood test measuring Erythrocyte Sedimentation Rate as part of inflammation-related assessment.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Erythrocyte Sedimentation Rate"] },
    goodFor: [
      "Inflammation-related assessment",
      "General haematological evaluation",
      "Further testing where recommended",
    ],
    related: {
      tests: ["full-blood-count", "c-reactive-protein", "rheumatoid-factor", "ferritin"],
      profiles: ["general-haematology", "anemia-profile", "general-sh-profile"],
    },
  },
  {
    slug: "glycated-haemoglobin-hba1c",
    name: "Glycated Haemoglobin (HbA1c)",
    shortName: "HbA1c",
    price: 45,
    sample: blood,
    description:
      "A blood test measuring glycated haemoglobin as a marker of longer-term blood glucose levels.",
    categories: ["general-wellness"],
    measures: { title: measures, items: ["Glycated Haemoglobin (HbA1c)"] },
    goodFor: [
      "Blood glucose assessment",
      "Metabolic health screening",
      "Monitoring glucose levels over time",
    ],
    related: {
      tests: ["glucose", "insulin", "cholesterol", "triglycerides"],
      profiles: [
        "general-biochemistry",
        "fatigue-profile",
        "pcos-short",
        "pcos-extended",
        "extended-wellman",
        "extended-wellwoman",
      ],
    },
  },
  {
    slug: "chlamydia-trachomatis",
    name: "Chlamydia Trachomatis",
    price: 85,
    description: "A diagnostic test for Chlamydia Trachomatis as part of sexual health screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Chlamydia Trachomatis"] },
    goodFor: ["Sexual health screening", "STI testing", "Testing where recommended"],
    related: {
      tests: [
        "neisseria-gonorrhoeae",
        "mycoplasma-genitalium",
        "trichomonas-vaginalis",
        "human-immunodeficiency-virus",
        "syphilis",
      ],
      profiles: ["sti-pcr", "sti-blood", "hepatitis"],
    },
  },
  {
    slug: "neisseria-gonorrhoeae",
    name: "Neisseria Gonorrhoeae",
    price: 85,
    description: "A diagnostic test for Neisseria Gonorrhoeae as part of sexual health screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Neisseria Gonorrhoeae"] },
    goodFor: ["Sexual health screening", "STI testing", "Testing where recommended"],
    related: {
      tests: [
        "chlamydia-trachomatis",
        "mycoplasma-genitalium",
        "trichomonas-vaginalis",
        "human-immunodeficiency-virus",
        "syphilis",
      ],
      profiles: ["sti-pcr", "sti-blood"],
    },
  },
  {
    slug: "mycoplasma-genitalium",
    name: "Mycoplasma Genitalium",
    price: 85,
    description: "A diagnostic test for Mycoplasma Genitalium as part of sexual health screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Mycoplasma Genitalium"] },
    goodFor: ["Sexual health screening", "STI testing", "Testing where recommended"],
    related: {
      tests: [
        "chlamydia-trachomatis",
        "neisseria-gonorrhoeae",
        "trichomonas-vaginalis",
        "human-immunodeficiency-virus",
        "syphilis",
      ],
      profiles: ["sti-pcr", "sti-blood"],
    },
  },
  {
    slug: "trichomonas-vaginalis",
    name: "Trichomonas Vaginalis",
    price: 85,
    description: "A diagnostic test for Trichomonas Vaginalis as part of sexual health screening.",
    categories: ["sexual-health"],
    measures: { title: measures, items: ["Trichomonas Vaginalis"] },
    goodFor: ["Sexual health screening", "STI testing", "Testing where recommended"],
    related: {
      tests: [
        "chlamydia-trachomatis",
        "neisseria-gonorrhoeae",
        "mycoplasma-genitalium",
        "human-immunodeficiency-virus",
        "syphilis",
      ],
      profiles: ["sti-pcr", "sti-blood"],
    },
  },
];

/** Each one's photo is named after its slug (`catalogueImage`). */
export const tests: LabTest[] = booklet.map((entry) => ({
  ...entry,
  image: catalogueImage("tests", entry.slug),
}));
