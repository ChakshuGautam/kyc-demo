import {
  loginPageTexts,
  routes,
  benefits,
  discover,
  discovery,
  familyPage,
} from "../../contants";

describe("Discovery page", () => {
  const loginScenarios = loginPageTexts.loginScenarios;
  beforeEach(
    "Verify the user is able to log in and redirected to the home page.",
    () => {
      loginScenarios.forEach((scenario) => {
        cy.login(scenario.type, scenario.credentials, loginPageTexts.otpvalue);
      });
      cy.visit("http://localhost:3000/home");
      cy.get(`[href="${routes.discover}"] > .flex > .inline-flex`).click();
    }
  );

  it("should be able to see discover in url", () => {
    cy.url().should("contain", routes.discover);
  });

  it("should be able to see 'welcome' text and 'Discover schemes you are eligible for.' text on discover page", () => {
    cy.verifyTextInElement(
      "div[class='text-appGray font-bold text-[20px]']",
      discover.welcomeText
    );
    cy.verifyTextInElement(
      "div[class='text-appGray font-medium text-[15px]']",
      discover.discoverSchemesForYouText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "div[class='text-appGray font-bold text-[20px]']",
      discover.welcomeText
    );
    cy.verifyTextInElement(
      "div[class='text-appGray font-medium text-[15px]']",
      discover.discoverSchemesForYouText
    );
  });

  it("Should be able to see find schemes for you button", () => {
    cy.get("#find-schemes-button").should("exist");
    cy.verifyTextInElement("#find-schemes-button", discover.findSchemesForYou);
    cy.get("#eng");
    cy.verifyTextInElement("#find-schemes-button", discover.findSchemesForYou);
  });

  it("Should be able to see recommended schemes text and card consist text and schemes", () => {
    cy.verifyTextInElement(
      "div[class='text-appGray font-bold text-[18px] mt-8']",
      discover.reommendedSchemesText
    );
    cy.get(
      ".bg-primary.py-4.px-3.mt-3.rounded-xl.text-appGray.text-center"
    ).should("exist");
    cy.verifyTextInElement(
      ".bg-primary > .items-center > :nth-child(1) > .ml-3 > .text-white",
      discover.yourFamilyMayBeEigibleText
    );
    cy.verifyTextInElement(
      ".bg-primary > .items-center > :nth-child(1) > .ml-3 > .font-bold",
      discover.schemesText
    );
    cy.get("#eng");
    cy.verifyTextInElement(
      "div[class='text-appGray font-bold text-[18px] mt-8']",
      discover.reommendedSchemesText
    );
    cy.verifyTextInElement(
      ".bg-primary > .items-center > :nth-child(1) > .ml-3 > .text-white",
      discover.yourFamilyMayBeEigibleText
    );
    cy.verifyTextInElement(
      ".bg-primary > .items-center > :nth-child(1) > .ml-3 > .font-bold",
      discover.schemesText
    );
  });

  it("Should be able to see Featured schemes text and card consist text and schemes", () => {
    cy.get(".bg-primary").should("exist");
    cy.verifyTextInElement(
      ".bg-tertiary > :nth-child(6)",
      discover.featuredSchemesText
    );
    cy.verifyTextInElement(".ml-3 > .text-primary", discover.onGovtPrirityText);
    cy.verifyTextInElement(
      ".border-2 > .items-center > :nth-child(1) > .ml-3 > .font-bold",
      discover.schemesText
    );
  });

  it("Should be able to see Scheme categories text and list of categories cards, also card should content img and text", () => {
    cy.verifyTextInElement(
      "body div div:nth-child(8)",
      discover.schemeCategoryText
    );
    cy.get("#eng").click();
    cy.verifyTextInElement(
      "body div div:nth-child(8)",
      discover.schemeCategoryText
    );
    const carousel = cy.get("div.carousel");
    const carouselItems = carousel.find("div.carousel-item");
    carouselItems.each((item, index) => {
      cy.wrap(item).find("img").should("exist");
      cy.wrap(item).find("div.font-demi").should("exist");
    });
  });

  it("should be redirect to all scheme page when user clicks on explore more schemes ", () => {
    cy.get("#mobile-button").click();
    cy.url().should("contain", routes.allSchemes);
    cy.get("div.bg-primary").each(($el, index) => {
      cy.wrap($el).should("exist");
    });
  });

  it("should be redirect to schemes details screen when user selects any schemes from all schemes ", () => {
    cy.get("#mobile-button").click();
    cy.get(".bg-tertiary > :nth-child(3) > :nth-child(1)").click();
    cy.get(".font-extrabold").should("not.be.empty");
    cy.verifyTextInElement(".mt-9", discovery.benefitText);
    cy.verifyTextInElement(".mt-5 > .ml-2", discovery.documentsText);
    cy.get("#eng").click();
    cy.verifyTextInElement(".mt-9", discovery.benefitText);
    cy.verifyTextInElement(".mt-5 > .ml-2", discovery.documentsText);
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).should("exist");
  });

  it("Should be redirect to 'For whom do you want to find for?' scheme screen", () => {
    cy.get("#mobile-button").click();
    cy.get(".bg-tertiary > :nth-child(3) > :nth-child(1)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.verifyTextInElement(".font-bold", discover.findSchemesForYou);
    cy.verifyTextInElement(
      ".bg-tertiary > .font-demi",
      discover.forWhomDoYouWantToFindText
    );
    cy.verifyTextInElement(".mt-6", discover.withinFamilyButton);
    cy.verifyTextInElement(".cursor-pointer.mt-4", discover.othersTextButton);
    cy.get("#eng").click();
    cy.verifyTextInElement(".font-bold", discover.findSchemesForYou);
    cy.verifyTextInElement(
      ".bg-tertiary > .font-demi",
      discover.forWhomDoYouWantToFindText
    );
    cy.verifyTextInElement(".mt-6", discover.withinFamilyButton);
    cy.verifyTextInElement(".cursor-pointer.mt-4", discover.othersTextButton);
  });

  it("Should be able to see list of family members when you trying to find scheme within family", () => {
    cy.get("#mobile-button").click();
    cy.get(".bg-tertiary > :nth-child(3) > :nth-child(1)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get(".mt-6").click();
    cy.verifyTextInElement(
      ".font-bold",
      discover.letsFindBestSchemesForYoutext
    );
    cy.verifyTextInElement(".my-4", discover.selectFamilyMember);
    const membersHindi = familyPage.listOfFamilyMembersHindi;
    for (let index = 0; index < membersHindi.length; index++) {
      cy.get(`.grip > :nth-child(${index + 1})`).should(
        "have.text",
        membersHindi[index]
      );
    }
    cy.get("#eng").click();
    cy.verifyTextInElement(
      ".font-bold",
      discover.letsFindBestSchemesForYoutext
    );
    cy.verifyTextInElement(".my-4", discover.selectFamilyMember);
    const membersEng = familyPage.listOfFamilyMembersEnglish;
    for (let index = 0; index < membersEng.length; index++) {
      cy.get(`.grip > :nth-child(${index + 1})`).should(
        "have.text",
        membersEng[index]
      );
    }
  });

  it("Family member details should be prefilled while finding scheme for family member", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get("input[name='name']")
      .should("exist")
      .should("have.value", familyPage.listOfFamilyMembersHindi[0]);
    cy.get(":nth-child(2) > .dropdown").should(
      "contain",
      discovery.genderDropdownHindi[1]
    );
    cy.get("input[name='age']").should(
      "have.value",
      familyPage.memberData[0].age
    );
    cy.get(":nth-child(4) > .dropdown").should(
      "contain",
      discovery.domicileStatusHindi[0]
    );
  });

  it("Should be able to find scheme for you and check your eligible for scheme or not(positive scenario where user are eligible for scheme)", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get(".px-7").click();
    cy.get(`div[value='OBC']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get("div[value='Yes'][name='religion']").click();
    cy.get("div[value='Yes'][name='disabilityStatus']").click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='0-50,000']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".false").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
    cy.get('[value="No"]').click();
    cy.get(".my-6").click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
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

  it("Should be able to find scheme for you and check your eligible for scheme or not(negative scenario where user are not eligible.)", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get(".px-7").click();
    cy.get(`div[value='OBC']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get("div[value='Yes'][name='religion']").click();
    cy.get("div[value='Yes'][name='disabilityStatus']").click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='0-50,000']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".false").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(
      "button[class='font-medium mt-8 mb-10 w-full rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
    cy.get('[value="No"]').click();
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
  });

  it("Explore button should be working on Congratulations screen", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get(".px-7").click();
    cy.get(`div[value='OBC']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get("div[value='Yes'][name='religion']").click();
    cy.get("div[value='Yes'][name='disabilityStatus']").click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='0-50,000']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".false").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".justify-center > .font-medium").click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
    cy.get('[value="No"]').click();
    cy.get(".my-6").click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
    cy.get(":nth-child(3) > .font-demi").click();
    cy.url().should("contain", routes.category);
  });

  it("Should be able to see Call me button,input box and it should be working on Congratulations screen", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get(".px-7").click();
    cy.get(`div[value='OBC']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get("div[value='Yes'][name='religion']").click();
    cy.get("div[value='Yes'][name='disabilityStatus']").click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='0-50,000']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".false").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".justify-center > .font-medium").click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
    cy.get('[value="No"]').click();
    cy.get(".my-6").click();
    cy.get('[value="Yes"]').click();
    cy.get(".my-6").click();
    cy.get("input[placeholder='अपना मोबाइल नंबर दर्ज करें']").type(
      loginPageTexts.mobileNumber
    );
    cy.get(".mb-10 > .font-demi").click();
  });

  it("Should be able to edit response by clicking on edit response button it should redirect to step 1", () => {
    cy.get("#find-schemes-button").click();
    cy.get(".mt-6").click();
    cy.get(".grip > :nth-child(1)").click();
    cy.wait(2000);
    cy.get(".px-7").click();
    cy.get(`div[value='OBC']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get("div[value='Yes'][name='religion']").click();
    cy.get("div[value='Yes'][name='disabilityStatus']").click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(":nth-child(1) > .dropdown").click();
    cy.get(`a[value='Farmer']`).click();
    cy.get(":nth-child(2) > .dropdown").click();
    cy.get(`a[value='0-50,000']`).click();
    cy.get(".justify-around > :nth-child(2)").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".swal-button").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".false").click();
    cy.get(".bg-white > :nth-child(2)").click();
    cy.get(".justify-center > .font-medium").click();
    cy.get('[value="No"]').click();
    cy.get(".my-6").click();
    cy.get(":nth-child(4) > .font-demi").click();
    cy.url().should("contain", routes.discovery);
  });
});
