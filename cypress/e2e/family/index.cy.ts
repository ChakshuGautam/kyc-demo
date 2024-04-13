import { loginPageTexts, routes, familyPage } from "../../contants";

describe("Family Page", () => {
  const loginScenarios = loginPageTexts.loginScenarios;
  beforeEach(
    "Verify the user is able to log in and redirected to the home page.",
    () => {
      loginScenarios.forEach((scenario) => {
        cy.login(scenario.type, scenario.credentials, loginPageTexts.otpvalue);
      });
      cy.visit("http://localhost:3000/home");
    }
  );

  it("should be able to see family in url", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    cy.url().should("contain", routes.family);
  });

  it("should be able to see the card of all the Family Members and each card consist name in hindi.", () => {
    cy.get('[href="/family"] > .flex > .inline-flex').click();
    const expectedTextArray = familyPage.listOfFamilyMembersHindi;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        const actualText = element.text();
        const expectedText = expectedTextArray[index];
        expect(actualText).to.include(expectedText);
      });
  });

  it("should be able to see the card of all the Family Members and each card consist name in English.", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    cy.get("#eng").click();
    cy.wait(1000);
    const expectedTextArray = familyPage.listOfFamilyMembersEnglish;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        const actualText = element.text();
        const expectedText = expectedTextArray[index];
        expect(actualText).to.include(expectedText);
      });
  });

  it("Should be able to click on the card of the individual Family Member.", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    const expectedTextArray = familyPage.listOfFamilyMembersHindi;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        cy.get(
          `:nth-child(${index + 1}) > :nth-child(1) > .justify-between > .ml-4`
        ).click();
        cy.get("#back-button").click();
      });
  });

  it("If I click on the individual member card, I should be directed to a detailed view of that particular member when text in hindi", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    const expectedTextArray = familyPage.listOfFamilyMembersHindi;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        cy.get(
          `:nth-child(${index + 1}) > :nth-child(1) > .justify-between > .ml-4`
        ).click();
        cy.get(":nth-child(1) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(1) > .pt-2.text-appGray",
          familyPage.relationText
        );
        cy.get(":nth-child(2) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(2) > .pt-2.text-appGray",
          familyPage.genderText
        );
        cy.get(":nth-child(3) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(3) > .pt-2.text-appGray",
          familyPage.ageText
        );
        cy.get(":nth-child(4) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(4) > .pt-2.text-appGray",
          familyPage.dateOfBirthText
        );
        cy.get(":nth-child(5) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(5) > .pt-2.text-appGray",
          familyPage.casteText
        );
        cy.get(".mt-6").should("exist");
        cy.verifyTextInElement(".mt-6", familyPage.noteText);

        cy.get("#back-button").click();
      });
  });

  it("If I click on the individual member card, I should be directed to a detailed view of that particular member when in English", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    cy.get("#eng").click();
    cy.wait(500);
    const expectedTextArray = familyPage.listOfFamilyMembersHindi;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        cy.get(
          `:nth-child(${index + 1}) > :nth-child(1) > .justify-between > .ml-4`
        ).click();
        cy.get(":nth-child(1) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(1) > .pt-2.text-appGray",
          familyPage.relationText
        );
        cy.get(":nth-child(2) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(2) > .pt-2.text-appGray",
          familyPage.genderText
        );
        cy.get(":nth-child(3) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(3) > .pt-2.text-appGray",
          familyPage.ageText
        );
        cy.get(":nth-child(4) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(4) > .pt-2.text-appGray",
          familyPage.dateOfBirthText
        );
        cy.get(":nth-child(5) > .pt-2.text-appGray").should("exist");
        cy.verifyTextInElement(
          ":nth-child(5) > .pt-2.text-appGray",
          familyPage.casteText
        );
        cy.get(".mt-6").should("exist");
        cy.verifyTextInElement(".mt-6", familyPage.noteText);

        cy.get("#back-button").click();
      });
  });

  it("If I click on the individual member card, card should consist details like Relation, Age, Gender, DOB, Cast for all family members", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    cy.get("#eng").click();
    cy.wait(500);

    const expectedTextArray = familyPage.listOfFamilyMembersHindi;
    cy.get(".bg-tertiary")
      .find(".bg-white.px-3.py-3.rounded-md")
      .should("have.length", expectedTextArray.length)
      .each((element, index) => {
        cy.get(
          `:nth-child(${index + 1}) > :nth-child(1) > .justify-between > .ml-4`
        ).click();
        const memberData = familyPage.memberData[index];

        cy.get("tbody > :nth-child(1) > .text-primary").should(
          "contain",
          memberData.relation
        );
        cy.get(":nth-child(2) > .text-primary").should(
          "contain",
          memberData.gender
        );
        cy.get(":nth-child(3) > .text-primary").should(
          "contain",
          memberData.age
        );
        cy.get(":nth-child(4) > .text-primary").should(
          "contain",
          memberData.dateOfBirth
        );
        cy.get(":nth-child(5) > .text-primary").should(
          "contain",
          memberData.cast
        );

        cy.get("#back-button").click();
      });
  });
});
