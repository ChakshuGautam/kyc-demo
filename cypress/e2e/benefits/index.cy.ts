import { loginPageTexts, routes, benefits } from "../../contants";

describe("Benefits Page", () => {
  const loginScenarios = loginPageTexts.loginScenarios;
  beforeEach(
    "Verify the user is able to log in and redirected to the home page.",
    () => {
      loginScenarios.forEach((scenario) => {
        cy.login(scenario.type, scenario.credentials, loginPageTexts.otpvalue);
      });
      cy.visit("http://localhost:3000/home");
      cy.get(`[href="${routes.benefits}"] > .flex > .inline-flex`).click();
    }
  );

  it("should be able to see benefits in url", () => {
    cy.url().should("contain", routes.benefits);
  });

  it("should able to see Scheme-Transaction text, toggle and its working", () => {
    cy.get("input[class='toggle toggle-primary']").should("exist").click();
    cy.get("input[class='toggle toggle-primary']").should("exist").click();
    cy.verifyTextInElement(
      ".justify-evenly > :nth-child(1)",
      benefits.schemesText
    );
  });

  it("should able to see hindi text total family benifits, Amount ,Schemes and services ", () => {
    cy.get(".justify-between > :nth-child(1) > .font-medium").should("exist");
    cy.verifyTextInElement(
      "div[class='text-white font-medium text-[12px]']",
      benefits.totalFamilyBenefitsText
    );

    cy.get("div[class='text-white font-bold']").should("exist");
    cy.verifyTextInElement(
      "div[class='text-white font-bold']",
      benefits.totalBenefitsAmount
    );

    cy.get(
      ".bg-primary > .justify-between > .justify-center > :nth-child(1)"
    ).should("exist");
    cy.verifyTextInElement(
      ".bg-primary > .justify-between > .justify-center > :nth-child(1)",
      benefits.schemesCount
    );

    cy.get(".justify-between > .justify-center > :nth-child(2)").should(
      "exist"
    );
    cy.verifyTextInElement(
      ".justify-between > .justify-center > :nth-child(2)",
      benefits.servicesText
    );
  });

  it("should able to see english text total family benifits, Amount ,Schemes and services ", () => {
    cy.get("#eng").click();
    cy.get(".justify-between > :nth-child(1) > .font-medium").should("exist");
    cy.verifyTextInElement(
      "div[class='text-white font-medium text-[12px]']",
      benefits.totalFamilyBenefitsText
    );

    cy.get("div[class='text-white font-bold']").should("exist");
    cy.verifyTextInElement(
      "div[class='text-white font-bold']",
      benefits.totalBenefitsAmount
    );

    cy.get(
      ".bg-primary > .justify-between > .justify-center > :nth-child(1)"
    ).should("exist");
    cy.verifyTextInElement(
      ".bg-primary > .justify-between > .justify-center > :nth-child(1)",
      benefits.schemesCount
    );

    cy.get(".justify-between > .justify-center > :nth-child(2)").should(
      "exist"
    );
    cy.verifyTextInElement(
      ".justify-between > .justify-center > :nth-child(2)",
      benefits.servicesText
    );
  });

  it("should able to see 3 dropdowns Benifits Type,Beneficiary,Fy", () => {
    cy.get("#benefit-type-dropdown").should("exist");
    cy.verifyTextInElement(
      "#benefit-type-dropdown",
      benefits.benifitTypeDropdownText
    );

    cy.get("#beneficiary-dropdown").should("exist");
    cy.verifyTextInElement(
      "#beneficiary-dropdown",
      benefits.beneficiaryDropdownText
    );

    cy.get("#fy-dropdown").should("exist");
    cy.verifyTextInElement("#fy-dropdown", benefits.fyDropdownText);
  });

  it("Should able to click on Benefit Type dropdown and list of options should be there and its clickable.", () => {
    cy.get("#benefit-type-dropdown").click();
    const hindiDropdown = benefits.benifitTypeDropdownHindi;
    hindiDropdown.forEach((text) => {
      cy.contains("a", text).click();
      cy.get("#benefit-type-dropdown").click();
    });
    cy.reload();
    cy.get("#eng").click();
    cy.get("#benefit-type-dropdown").click();
    const englishDropdown = benefits.benifitTypeDropdownEnglish;
    englishDropdown.forEach((text) => {
      cy.contains("a", text).click();
      cy.get("#benefit-type-dropdown").click();
    });
  });

  it("Should able to click on Beneficiary dropdown and list of options should be there and its clickable.", () => {
    cy.get("#beneficiary-dropdown").click();
    const hindiDropdown = benefits.beneficiaryDropdownHindi;
    hindiDropdown.forEach((text) => {
      cy.contains("a", text).click();
      cy.get("#beneficiary-dropdown").click();
    });
    cy.reload();
    cy.get("#eng").click();
    cy.get("#beneficiary-dropdown").click();
    const englishDropdown = benefits.beneficiaryDropdownEnglish;
    englishDropdown.forEach((text) => {
      cy.contains("a", text).click();
      cy.get("#beneficiary-dropdown").click();
    });
  });

  it("Should able to click on Fy (finacial year) dropdown and list of options should be there and its clickable.", () => {
    cy.get("#fy-dropdown").click();
    const hindiDropdown = benefits.fyDropdownHindi;
    hindiDropdown.forEach((text) => {
      cy.wait(500);
      cy.contains("a", text).click();
      cy.get("#fy-dropdown").click();
    });
    cy.reload();
    cy.get("#eng").click();
    cy.get("#fy-dropdown").click();
    const englishDropdown = benefits.fyDropdownEnglish;
    englishDropdown.forEach((text) => {
      cy.wait(500);
      cy.contains("a", text).click();
      cy.get("#fy-dropdown").click();
    });
  });

  it("Should able to see list of schemes on benefits page", () => {
    const listOfSchemes = benefits.listOfSchemes;
    for (let i = 0; i < listOfSchemes.length; i++) {
      const expectedText = listOfSchemes[i];
      cy.get(`:nth-child(${i + 4}) > .col-span-4`).should(
        "contain",
        expectedText
      );
    }
  });

  it("should able to see list of all transaction on benefits page", () => {
    cy.get(".toggle").click();
    const arrayLenth = benefits.listOfAllTransaction.length;
    for (let index = 0; index < arrayLenth; index++) {
      const element = cy.get(`.bg-tertiary > :nth-child(${index + 4})`);
      const listOfTransactions = benefits.listOfAllTransaction[index];
      element
        .find(".group.text-appGray.col-span-4")
        .should("contain", listOfTransactions.schemename);

      element.should("contain", listOfTransactions.date);
      cy.get(`:nth-child(${index + 4}) > .items-end`).should(
        "contain",
        listOfTransactions.amount
      );

      cy.get(`:nth-child(${index + 4}) > .items-end`).should(
        "contain",
        listOfTransactions.name
      );
    }
  });
});
