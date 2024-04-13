import { verifyOTPWithNumber } from "../../../apps/passbook/src/api";
import { loginPageTexts, routes, discovery } from "../../contants";

describe("Discovery find schemes flow without login", () => {
  const loginScenarios = loginPageTexts.loginScenarios;

  beforeEach(() => {
    cy.session("Login Page", () => {
      cy.visit("http://localhost:3000/login");
      cy.get("#find-schemes-button").click();
    });
    cy.visit("http://localhost:3000/discovery");
  });

  it("Url should be contain discovery", () => {
    cy.url().should("contain", routes.discovery);
  });

  it("Should be able to see 'Find eligible schemes for you' text label and progress bar on step 1 page", () => {
    cy.get(".mb-2 > div > .text-xs").should("have.text", "step_text 1 of 4");
    cy.verifyTextInElement(
      "h1[class='font-extrabold hi text-[24px] text-center pb-3 text-appGray']",
      discovery.findEligibleSchemesForYouText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "h1[class='font-demi text-[24px] text-center pb-3 text-appGray']",
      discovery.findEligibleSchemesForYouText
    );
  });

  it("Should be able to see Enter your name text and input box on step 1 page", () => {
    cy.verifyTextInElement("label[for='name']", discovery.enterYourNAmeText);
    cy.get("#eng").click();
    cy.verifyTextInElement("label[for='name']", discovery.enterYourNAmeText);
    cy.get("input[name='name']")
      .type("Aakash Satpute")
      .should("have.value", "Aakash Satpute");
  });

  it("Should be able to see select your gender text and dropdown is working on step 1 page", () => {
    const element = "label[for='gender']";
    cy.verifyTextInElement(element, discovery.selectYourGenderText);
    cy.get("#eng").click();
    cy.verifyTextInElement(element, discovery.selectYourGenderText);
    cy.get("#hindi").click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(".dropdown-content li a").each((option, index) => {
      cy.wrap(option).should("have.text", discovery.genderDropdownHindi[index]);
      cy.get("#eng").click();
      cy.wrap(option).should("have.text", discovery.genderDropdownEng[index]);
      cy.get("#hindi").click();
    });
    for (let index = 0; index < discovery.genderDropdownEng.length; index++) {
      cy.reload();
      cy.get(":nth-child(2) > .dropdown").click();
      cy.get(`a[value='${discovery.genderDropdownEng[index]}']`).click();
    }
  });

  it("Should be able to see Enter your age label and input box on step 1 page", () => {
    cy.verifyTextInElement("label[for='age']", discovery.enterYourAgeText);
    cy.get("#eng").click();
    cy.verifyTextInElement("label[for='age']", discovery.enterYourAgeText);
    cy.get("input[name='age']").type("18").should("have.value", "18");
  });

  it("Should be able to see 'Are you domicile of Uttar Pradesh' and dropdown is working on step 1 page", () => {
    const element = "label[for='domicileStatus']";
    cy.verifyTextInElement(element, discovery.areYouDomicileOfUttarpradeshText);
    cy.get("#eng").click();
    cy.verifyTextInElement(element, discovery.areYouDomicileOfUttarpradeshText);
    cy.get("#hindi").click();
    cy.get(":nth-child(4) > .dropdown").click();
    cy.get(".dropdown-content li a").each((option, index) => {
      cy.wrap(option).should("have.text", discovery.domicileStatusHindi[index]);
      cy.get("#eng").click();
      cy.wrap(option).should("have.text", discovery.domicileStatusEng[index]);
      cy.get("#hindi").click();
    });
    for (let index = 0; index < discovery.domicileStatusEng.length; index++) {
      cy.reload();
      cy.get(":nth-child(4) > .dropdown").click();
      cy.get(`a[value='${discovery.domicileStatusEng[index]}']`).click();
    }
  });

  it("Should be able to see 'reset form' button and clicking on it i should reset the form on step 1 page", () => {
    cy.get("input[name='name']")
      .type("Aakash Satpute")
      .should("have.value", "Aakash Satpute");
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='Male']`).click();
    cy.get("input[name='age']").type("18");
    cy.get(":nth-child(4) > .dropdown").click();
    cy.get(`a[value='Yes']`).click();
    cy.get("div[class='mt-[-3px] text-[14px]']").click();
    cy.get("input[name='name']").should("be.empty");
    cy.get("input[name='age']").should("be.empty");
  });

  it("Should be able to fill the step 1 form and click on next should redirect to step 2 page", () => {
    cy.discoveryStep1;
    cy.get(".mb-2 > div > .text-xs").should("have.text", "स्टेप 1 में से 4");
  });

  it("Should be able see 'Find eligible schemes for you' text label and step progress bar on step 2 page", () => {
    cy.discoveryStep1();
    const element = ".text-[24px]";
    cy.verifyTextInElement(
      ".font-extrabold",
      discovery.findEligibleSchemesForYouText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "h1[class='font-demi text-[24px] text-center pb-3 text-appGray']",
      discovery.findEligibleSchemesForYouText
    );
    cy.get(".overflow-hidden").should("be.visible");
  });

  it("should be able to see 'Please select your caste' text label on step 2 page ", () => {
    cy.discoveryStep1();
    const element = "label[for='caste']";
    cy.verifyTextInElement(element, discovery.pleaseSelectYourCaste);
    cy.get("#eng").click();
    cy.verifyTextInElement(element, discovery.pleaseSelectYourCaste);
  });

  it("Should be able to see list of cast selection options and it is clickable on step 2 page ", () => {
    cy.discoveryStep1();
    for (let index = 0; index < discovery.listOfCastsEng.length; index++) {
      cy.get("#hindi").click();
      cy.get(`div[value='${discovery.listOfCast[index]}']`).click();
      const element = `div[value='${discovery.listOfCast[index]}']`;
      cy.verifyTextInElement(element, discovery.listOfCastsHindi);
      cy.get("#eng").click();
      cy.verifyTextInElement(element, discovery.listOfCastsEng);
    }
  });

  it("Should be able to see Previous and Next button on step 2 page and its working", () => {
    cy.discoveryStep1();
    cy.get(".mt-6 > .justify-around > :nth-child(1)").click();
    cy.get(".px-7").click();
  });

  it("Should reset button is working on step 2 page.", () => {
    cy.discoveryStep1();
    cy.get(`div[value='SC']`).click();
    cy.get("div[class='mt-[-3px] text-[14px]']").click();
  });

  it("Should be able see 'Find eligible schemes for you' text label and step progress bar on step 3 page", () => {
    cy.discoveryStep2();
    cy.verifyTextInElement(
      ".font-extrabold",
      discovery.findEligibleSchemesForYouText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "h1[class='font-demi text-[24px] text-center pb-3 text-appGray']",
      discovery.findEligibleSchemesForYouText
    );
    cy.get(".overflow-hidden").should("be.visible");
  });

  it("Should be able to see 'Do you belong to minority?' text lable with Yes No option and its clickable on step 3 page", () => {
    cy.discoveryStep2();
    cy.verifyTextInElement(
      "label[for='religion']",
      discovery.doYouBelongToMinority
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "label[for='religion']",
      discovery.doYouBelongToMinority
    );
    for (let index = 0; index < discovery.yesNoOptionEng.length; index++) {
      cy.get(
        `div[value='${discovery.yesNoOptionEng[index]}'][name='religion']`
      ).click();
      cy.get("#eng").click();
    }
  });

  it("Should be able to see 'Are you differently abled?' text lable with Yes No option and its clickable on step 3 page", () => {
    cy.discoveryStep2();
    cy.verifyTextInElement(
      "label[for='disabilityStatus']",
      discovery.areYouDifferentlyAbled
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "label[for='disabilityStatus']",
      discovery.areYouDifferentlyAbled
    );
    for (let index = 0; index < discovery.yesNoOptionEng.length; index++) {
      cy.get(
        `div[value='${discovery.yesNoOptionEng[index]}'][name='disabilityStatus']`
      ).click();
      cy.get("#eng").click();
    }
  });

  it("Should be able to see Previous and Next button on step 3 page and its working", () => {
    cy.discoveryStep2();
    cy.get(".mt-6 > .justify-around > :nth-child(1)").click();
    cy.get(".justify-around > :nth-child(2)").click();
  });

  it("Should be able to redirect to step 4 page,after filling step 3 form and clicking on next button ", () => {
    cy.discoveryStep3();
    cy.get(".mb-2 > div > .text-xs").should("have.text", "स्टेप 4 में से 4");
  });

  it("Should be able see 'Find eligible schemes for you' text label and step progress bar on step 4 page", () => {
    cy.discoveryStep3();
    cy.verifyTextInElement(
      ".font-extrabold",
      discovery.findEligibleSchemesForYouText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "h1[class='font-demi text-[24px] text-center pb-3 text-appGray']",
      discovery.findEligibleSchemesForYouText
    );
    cy.get(".overflow-hidden").should("be.visible");
  });

  it("Should be able to see 'What is your occupation?' label text and drowpdown ,also verify dropdown is clickable for select occupation", () => {
    cy.discoveryStep3();
    cy.verifyTextInElement("label[for='occupation']", discovery.occupationText);
    cy.get("#eng").click();
    cy.verifyTextInElement("label[for='occupation']", discovery.occupationText);
    for (
      let index = 0;
      index < discovery.occupationDropdownEng.length;
      index++
    ) {
      cy.get("#eng").click();
      cy.get(":nth-child(1) > .dropdown").click();
      cy.get(`a[value='${discovery.occupationDropdownEng[index]}']`).should(
        "contain",
        discovery.occupationDropdownEng[index]
      );
      cy.get(`a[value='${discovery.occupationDropdownEng[index]}']`).click();
    }
    cy.get("#hindi").click();
    for (
      let index = 0;
      index < discovery.occupationDropdownEng.length;
      index++
    ) {
      cy.get(":nth-child(1) > .dropdown").click();
      cy.get(`a[value='${discovery.occupationDropdownEng[index]}']`).should(
        "have.text",
        discovery.occupationDropdownHindi[index]
      );
      cy.get(`a[value='${discovery.occupationDropdownEng[index]}']`).click();
    }
  });

  it("Should be able to see 'What is your family's annual income?' label text and drowpdown ,also verify dropdown is clickable for select income", () => {
    cy.discoveryStep3();
    cy.verifyTextInElement(
      "label[for='familyIncome']",
      discovery.annualIncomeText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "label[for='familyIncome']",
      discovery.annualIncomeText
    );
    cy.get("#hindi").click();
    for (let index = 0; index < discovery.incomeDropdownEng.length; index++) {
      cy.get(":nth-child(2) > .dropdown").click();
      cy.get(`a[value='${discovery.incomeDropdownEng[index]}']`).should(
        "contain",
        discovery.incomeDropdownHindi[index]
      );
      cy.get(`a[value='${discovery.incomeDropdownEng[index]}']`).click();
    }
  });

  it("Should be able to see Previous and Next button on step 4 page and its working ", () => {
    cy.discoveryStep3();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='50,001-100,000']`).click();
    cy.get(".mt-6 > .justify-around > :nth-child(1)").click();
    cy.get(".justify-around > :nth-child(2)").click();
  });

  it("Should be redirect to select scheme category page, after filling step 4 form and clicking on next button.", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(
      "h1[class='font-extrabold hi text-[24px] text-center pb-3 text-appGray']",
      discovery.eligibleSchemeText
    );
  });

  it("User should gets 'Schemes found successfully' popup with okay button after filling form if any schemes are available", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
  });

  it("Should be able see this text 'Select one or more categories to view' on category selection page", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
  });

  it("Should be able see this schemes categories and able to select it and submit", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
  });

  it("User should be redirect to 'Select scheme to confirm your eligibility' page,after selecting scheme categories.", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
  });

  it("Should be able to see 'Select scheme to confirm your eligibility' on scheme selection page.", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.verifyTextInElement(
      ".font-semibold",
      discovery.selectSchemeToConfirmYourEligibilityText
    );
  });

  it("Should be able to see 'You might be eligible for the following schemes' on scheme selection page.", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.verifyTextInElement(
      ".font-extrabold",
      discovery.youMightBeEligibleForTheFollowingSchemesText
    );
  });

  it("Should be able to select scheme and redirect to scheme details screen,screen should content benefits,document required and confirm Eligibility button.", () => {
    cy.discoveryStep4();
    cy.verifyTextInElement(".swal-text", discovery.schemesFoundTextOnPopup);
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".font-extrabold").should("not.be.empty");
    cy.verifyTextInElement(".mt-9", discovery.benefitText);
    cy.verifyTextInElement(".mt-5 > .ml-2", discovery.documentsText);
    cy.get("#eng").click();
    cy.verifyTextInElement(".mt-9", discovery.benefitText);
    cy.verifyTextInElement(".mt-5 > .ml-2", discovery.documentsText);
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).should("exist");
    cy.url().should("contain", routes.schemes);
  });

  it("Should be able get Scheme specific questionnaire after selecting a specific scheme for check eligibility.", () => {
    cy.discoveryStep4();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get(".mb-5").should("exist");
    cy.get(".my-6").click();
  });

  it("Should be able see pop screen having message 'Sorry, you are not eligible' If user select any option that is different from the eligible option/value", () => {
    cy.discoveryStep4();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get(".my-6").click();
    cy.get(
      "h1[class='text-[20px] text-center mt-4 mb-2 font-demi text-appGray border-[#DC6127] border-b pb-2']"
    ).should("contain", discovery.youAreNotEligibleText);
    cy.get(
      "div[class='font-regular text-center text-appGray text-[14px] mb-6']"
    ).should("contain", discovery.NotEligibleText);
    cy.get(":nth-child(4) > .font-demi")
      .should("exist")
      .should("contain", discovery.editResponseText);
    cy.get(
      "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > button:nth-child(1)"
    )
      .should("exist")
      .should("contain", discovery.exploreOtherSchemesText);
    cy.get(".justify-end").should("exist");
    cy.get(".w-full.px-10[src='/images/schemes/notEligible.svg']").should(
      "be.visible"
    );
  });

  it("Should be able to edit response by clicking on edit response button it should redirect to step 1", () => {
    cy.discoveryStep4();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get(".my-6").click();

    cy.get(":nth-child(4) > .font-demi").click();
    cy.get(
      "button[class='font-demi mt-2 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
  });

  it("Should be able to explore other schemes by clicking on explore other schemes button", () => {
    cy.discoveryStep4();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").should("be.visible").click();
    cy.get(".justify-between > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get(".my-6").click();
    cy.get(
      "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > button:nth-child(1)"
    ).click();
    cy.get(
      "h1[class='font-extrabold hi text-[24px] text-center pb-3 text-appGray']"
    ).should("exist");
  });

  it("Should be able see Congratulations!!! screen ,when user are eligible for scheme", () => {
    cy.discoveryPositiveScenario();
    cy.url().should("contain", routes.eligible);
    cy.verifyTextInElement(
      "h1[class='font-extrabold hi text-[24px] pb-3 text-appGray border-[#DC6127] border-b mt-5']",
      discovery.congratulationsText
    );
    cy.verifyTextInElement(
      "div[class='font-regular text-appGray text-[14px] mb-8 mt-3']",
      discovery.basedOnInputText
    );
    cy.verifyTextInElement(
      ":nth-child(3) > .font-demi",
      discovery.exploreOtherSchemesButtonText
    );
    cy.verifyTextInElement(".text-black", discovery.enterYourMobileNo);
    cy.verifyTextInElement(".mb-10 > .font-demi", discovery.callMeText);
    cy.get("input[placeholder='अपना मोबाइल नंबर दर्ज करें']").type(
      loginPageTexts.mobileNumber
    );
  });

  it("Explore button should be working on Congratulations screen ", () => {
    cy.discoveryPositiveScenario();
    cy.get(":nth-child(3) > .font-demi").click();
    cy.url().should("contain", routes.category);
  });

  it("Should be able to see Call me button,input box and it should be working on Congratulations screen", () => {
    cy.discoveryPositiveScenario();
    cy.get("input[placeholder='अपना मोबाइल नंबर दर्ज करें']").type(
      loginPageTexts.mobileNumber
    );
    cy.get(".mb-10 > .font-demi").click();
  });
});
