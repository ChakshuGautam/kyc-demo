interface StepField {
  name: string;
  label: string;
  labelh: string;
  type: string;
  required: boolean;
  options?: any;
  dropdownLabel?: string;
  dropdownLabelh?: string;
  hidden?: boolean;
  answer?: string;
  disabled: boolean;
}

interface Step {
  title: string;
  fields: StepField[];
}

interface StepperFormSchema {
  steps: Step[];
}

export const discovery: StepperFormSchema = {
  steps: [
    {
      title: "Step 1",
      fields: [
        {
          name: "name",
          label: "Enter your name",
          labelh: "अपना नाम दर्ज करें",
          type: "text",
          required: false,
          answer: "",
          disabled: false,
        },
        {
          name: "gender",
          label: "Select your gender",
          labelh: "अपना लिंग चुनें",
          type: "dropdown",
          required: true,
          options: [
            { value: "Male", label: "Male", labelh: "पुरुष" },
            { value: "Female", label: "Female", labelh: "महिला" },
            { value: "Other", label: "Other", labelh: "अन्य" },
          ],
          dropdownLabel: "Select Gender",
          dropdownLabelh: "लिंग चुनें",
          answer: "",
          disabled: false,
        },
        {
          name: "age",
          label: "Enter your age",
          labelh: "अपनी आयु दर्ज करें",
          type: "number",
          required: true,
          dropdownLabel: "Select Age",
          answer: "",
          disabled: false,
        },
        {
          name: "domicileStatus",
          label: "Are you domicile of Uttar Pradesh?",
          labelh: "क्या आप उत्तर प्रदेश के निवासी हैं?",
          type: "dropdown",
          required: true,
          options: [
            { value: "Yes", label: "Yes", labelh: "हां" },
            { value: "No", label: "No", labelh: "नहीं" },
          ],
          dropdownLabel: "Select Domicile Status",
          dropdownLabelh: "निवास स्थिति चुनें",
          answer: "",
          disabled: false,
        },
      ],
    },
    {
      title: "Step 2",
      fields: [
        {
          name: "caste",
          label: "Please select your caste",
          labelh: "कृपया अपने वर्ग का चयन करें",
          type: "mcq",
          required: true,
          options: [
            { value: "General", label: "General", labelh: "सामान्य" },
            {
              value: "OBC",
              label: "Other Backward Class",
              labelh: "अन्य पिछड़ा वर्ग",
            },
            { value: "SC", label: "Scheduled Caste", labelh: "अनुसूचित जाति" },
            {
              value: "ST",
              label: "Scheduled Tribe",
              labelh: "अनुसूचित जनजाति",
            },
            // { value: "Other", label: "Other", labelh: "अन्य" },
          ],
          dropdownLabel: "Select Social Category",
          dropdownLabelh: "सामाजिक वर्ग चुनें",
          answer: "",
          disabled: false,
        },
      ],
    },
    {
      title: "Step 3",
      fields: [
        {
          name: "miniorityStatus",
          label: "Do you belong to minority?",
          labelh: "क्या आप अल्पसंख्यक समुदाय से हैं?",
          type: "mcq",
          required: true,
          options: [
            { value: "Yes", label: "Yes", labelh: "हां" },
            { value: "No", label: "No", labelh: "नहीं" },
          ],
          dropdownLabel: "Select Religion",
          dropdownLabelh: "धर्म चुनें",
          answer: "",
          disabled: false,
        },
        {
          name: "disabilityStatus",
          label: "Are you differently abled?",
          labelh: "क्या आप दिव्यांग हैं?",
          type: "mcq",
          required: true,
          options: [
            { value: "Yes", label: "Yes", labelh: "हां" },
            { value: "No", label: "No", labelh: "नहीं" },
          ],
          dropdownLabel: "Select Disability Status",
          dropdownLabelh: "विकलांगता स्थिति चुनें",
          answer: "",
          disabled: false,
        },
      ],
    },
    {
      title: "Step 4",
      fields: [
        {
          name: "occupation",
          label: "What is your occupation?",
          labelh: "आपका व्यवसाय क्या है?",
          type: "dropdown",
          required: true,
          options: [
            { value: "Student", label: "Student", labelh: "छात्र" },
            { value: "Farmer", label: "Farmer", labelh: "किसान" },
            {
              value: "Registered Labourer (UPBoCW)",
              label: "Registered Labourer (UPBoCW)",
              labelh: "पंजीकृत मजदूर (UPBoCW)",
            },
            {
              value: "Artisan, Spinners & Weaver",
              label: "Artisan, Spinners & Weaver",
              labelh: "कलाकार, धागा बुनने वाले और बुनाईकार",
            },
            {
              value: "Khadi Artisan",
              label: "Khadi Artisan",
              labelh: "खादी कलाकार",
            },
            {
              value: "Teacher/Professor/Faculty",
              label: "Teacher/Professor/Faculty",
              labelh: "शिक्षक/प्रोफेसर/शिक्षक बनाने वाले",
            },
            {
              value: "Doctor/CA/Lawyer/Engineer",
              label: "Doctor/CA/Lawyer/Engineer",
              labelh: "डॉक्टर/सीए/वकील/इंजीनियर",
            },
            {
              value: "Health Worker",
              label: "Health Worker",
              labelh: "स्वास्थ्य कर्मी",
            },
            {
              value: "Street Vendor/Hawker",
              label: "Street Vendor/Hawker",
              labelh: "स्ट्रीट वेंडर/फेरीवाला",
            },
            {
              value: "Unorganised Worker",
              label: "Unorganised Worker",
              labelh: "असंगठित श्रमिक",
            },
            {
              value: "Govt Employee",
              label: "Govt Employee",
              labelh: "सरकारी कर्मचारी",
            },
            {
              value: "Private Employee",
              label: "Private Employee",
              labelh: "निजी कर्मचारी",
            },
            {
              value: "AWWs/AWHs/ASHA Worker",
              label: "AWWs/AWHs/ASHA Worker",
              labelh: "आंगनवाड़ी कार्यकर्ता/आशा कार्यकर्ता",
            },
            {
              value: "Self Employed",
              label: "Self Employed",
              labelh: "स्वरोजगार",
            },
            { value: "Retired", label: "Retired", labelh: "सेवानिवृत्त" },
            { value: "Unemployed", label: "Unemployed", labelh: "बेरोजगार" },
            { value: "Other", label: "Other", labelh: "अन्य" },
          ],
          dropdownLabel: "Select Occupation",
          dropdownLabelh: "व्यवसाय चुनें",
          hidden: false,
          answer: "",
          disabled: false,
        },
        {
          name: "educationQualification",
          label: "In which standard you are studying?",
          labelh: "आप किस स्तर पर पढ़ाई कर रहे हैं?",
          type: "dropdown",
          required: false,
          options: [
            {
              value: "Primary (1-5)",
              label: "Primary (1-5)",
              labelh: "प्राथमिक (1-5)",
            },
            {
              value: "Middle (6-8)",
              label: "Middle (6-8)",
              labelh: "माध्यमिक (6-8)",
            },
            {
              value: "Matric (9-10)",
              label: "Matric (9-10)",
              labelh: "मैट्रिक (9-10)",
            },
            {
              value: "Postmatric (11-12)",
              label: "Postmatric (11-12)",
              labelh: "पोस्टमैट्रिक (11-12)",
            },
            {
              value: "Graduation or Equivalent",
              label: "Graduation or Equivalent",
              labelh: "स्नातक या समकक्ष",
            },
            { value: "Other", label: "Other", labelh: "अन्य" },
          ],
          dropdownLabel: "Select Academic Qualification",
          dropdownLabelh: "शैक्षिक योग्यता चुनें",
          hidden: true,
          answer: "",
          disabled: false,
        },
        {
          name: "familyIncome",
          label: "What is your family's annual income?",
          labelh: "आपके परिवार की वार्षिक आय क्या है?",
          type: "dropdown",
          required: true,
          options: [
            { value: "0-50,000", label: "0-50,000", labelh: "0-50,000" },
            {
              value: "50,001-100,000",
              label: "50,001-100,000",
              labelh: "50,001-100,000",
            },
            {
              value: "100,001-200,000",
              label: "100,001-200,000",
              labelh: "100,001-200,000",
            },
            {
              value: "200,001-300,000",
              label: "200,001-300,000",
              labelh: "200,001-300,000",
            },
            {
              value: "300,001-600,000",
              label: "300,001-600,000",
              labelh: "300,001-600,000",
            },
            {
              value: "600,001-800,000",
              label: "600,001-800,000",
              labelh: "600,001-800,000",
            },
            {
              value: "800,001-1,200,000",
              label: "800,001-1,200,000",
              labelh: "800,001-1,200,000",
            },
            {
              value: "1,200,001-1,800,000",
              label: "1,200,001-1,800,000",
              labelh: "1,200,001-1,800,000",
            },
            { value: "Other", label: "Doesn't know", labelh: "पता नहीं" },
          ],
          dropdownLabel: "Select Family Income",
          dropdownLabelh: "परिवार की आय चुनें",
          answer: "",
          disabled: false,
        },
      ],
    },
  ],
};
