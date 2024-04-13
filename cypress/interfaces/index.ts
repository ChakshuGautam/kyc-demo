export interface Routes {
  login: string;
  otp: string;
  home: string;
  family: string;
  benefits: string;
  discover: string;
  discovery: string;
  notifications: string;
  about: string;
  help: string;
  feedback: string;
  terms: string;
  category: string;
  eligible: string;
  schemes: string;
  allSchemes: string;
}

export interface LoginPageTexts {
  heading: string[];
  validAadharNumber: string;
  invalidAadharNumber: string;
  registrationPortal: string[];
  button: string[];
  otpvalue: string[];
  chooseLanguage: string;
  clickHerePortalLink: string[];
  mobileNumber: string;
  findSchemeButtonText: string[];
  loginScenarios: [
    {
      type: string;

      credentials: string;
    },
    {
      type: string;
      credentials: string;
    }
  ];
}

export interface ApiRoutes {
  login: {
    method: string;
    route: string;
  };
}

export interface HomePage {
  title: string;
  cardHeading: string[];
  familyIdNumber: string[];
  myName: string[];
  address: string[];
  noFamilyMember: string[];
  finacialYear: string[];
  benifitsFromGovttext: string[];
  benifitsAmount: string;
  noOfSchemes: string;
  noOfSchemesText: string[];
  homeButtonText: string[];
  familyButtonText: string[];
  benefitsButtonText: string[];
  discoverButtonText: string[];
  about: string[];
  help: string[];
  feedback: string[];
  terms: string[];
  logout: string[];
}

export interface FamilyPage {
  listOfFamilyMembersHindi: string[];
  listOfFamilyMembersEnglish: string[];
  relationText: string[];
  genderText: string[];
  ageText: string[];
  dateOfBirthText: string[];
  casteText: string[];
  noteText: string[];
  memberData: [
    {
      relation: string;
      gender: string;
      age: string;
      dateOfBirth: string;
      cast: string;
    },
    {
      relation: string;
      gender: string;
      age: string;
      dateOfBirth: string;
      cast: string;
    },
    {
      relation: string;
      gender: string;
      age: string;
      dateOfBirth: string;
      cast: string;
    },
    {
      relation: string;
      gender: string;
      age: string;
      dateOfBirth: string;
      cast: string;
    },
    {
      relation: string;
      gender: string;
      age: string;
      dateOfBirth: string;
      cast: string;
    }
  ];
}

export interface Benefits {
  schemesText: string[];
  transactionsText: string[];
  totalFamilyBenefitsText: string[];
  totalBenefitsAmount: string[];
  schemesCount: string[];
  servicesText: string[];
  benifitTypeDropdownText: string[];
  beneficiaryDropdownText: string[];
  fyDropdownText: string[];
  benifitTypeDropdownHindi: string[];
  benifitTypeDropdownEnglish: string[];
  beneficiaryDropdownHindi: string[];
  beneficiaryDropdownEnglish: string[];
  fyDropdownHindi: string[];
  fyDropdownEnglish: string[];
  listOfSchemes: string[];

  listOfAllTransaction: [
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string },
    { schemename: string; date: string; amount: string; name: string }
  ];
}

export interface Discovery {
  findEligibleSchemesForYouText: string[];
  enterYourNAmeText: string[];
  selectYourGenderText: string[];
  enterYourAgeText: string[];
  areYouDomicileOfUttarpradeshText: string[];
  genderDropdownHindi: string[];
  genderDropdownEng: string[];
  domicileStatusHindi: string[];
  domicileStatusEng: string[];
  pleaseSelectYourCaste: string[];
  listOfCastsHindi: string[];
  listOfCastsEng: string[];
  listOfCast: string[];
  doYouBelongToMinority: string[];
  areYouDifferentlyAbled: string[];
  yesNoOptionHindi: string[];
  yesNoOptionEng: string[];
  occupationText: string[];
  annualIncomeText: string[];
  occupationDropdownEng: string[];
  occupationDropdownHindi: string[];
  incomeDropdownEng: string[];
  incomeDropdownHindi: string[];
  eligibleSchemeText: string[];
  schemesFoundTextOnPopup: string[];
  selectOneMoreCategoriesToView: string[];
  youMightBeEligibleForTheFollowingSchemesText: string[];
  selectSchemeToConfirmYourEligibilityText: string[];
  benefitText: string[];
  documentsText: string[];
  youAreNotEligibleText: string;
  NotEligibleText: string;
  editResponseText: string;
  exploreOtherSchemesText: string;
  congratulationsText: string[];
  basedOnInputText: string[];
  exploreOtherSchemesButtonText: string[];
  enterYourMobileNo: string[];
  callMeText: string[];
}
export interface Discover {
  welcomeText: string[];
  discoverSchemesForYouText: string[];
  findSchemesForYou: string[];
  reommendedSchemesText: string[];
  featuredSchemesText: string[];
  schemeCategoryText: string[];
  exploreMoreSchemesText: string[];
  yourFamilyMayBeEigibleText: string[];
  onGovtPrirityText: string[];
  schemesText: string[];
  forWhomDoYouWantToFindText: string[];
  withinFamilyButton: string[];
  othersTextButton: string[];
  letsFindBestSchemesForYoutext: string[];
  selectFamilyMember: string[];
}
