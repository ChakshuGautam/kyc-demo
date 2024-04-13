import { loginPageTexts, routes, apiRoutes, homePage } from "../../contants";

const apiUrl = Cypress.env("API_URL");
const baseUrl = Cypress.env("BASE_URL");
describe("Home Page", () => {
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

  it("Should be able to see home page URL", () => {
    cy.url().should("contain", routes.home);
  });

  it("Should be able to see govt logo is displayed on home page", () => {
    cy.get("img[alt='govtLogo']").should("exist").should("be.visible");
  });

  it("Should be able to see cm logo is displayed on home page", () => {
    cy.get("rect").should("exist").should("be.visible");
  });

  it("Should be able to see familyId logo is displayed on home page", () => {
    cy.get("img[alt='familyID Logo']").should("exist").should("be.visible");
  });

  it("Should be able to see a card consist Card heading.", () => {
    cy.verifyTextInElement(
      ".bg-summary-card > :nth-child(1) > .font-demi",
      homePage.cardHeading
    );
    cy.get("#eng").click();
    cy.get(".bg-summary-card > :nth-child(1) > .font-demi").should(
      "be.visible"
    );
    cy.verifyTextInElement(
      ".bg-summary-card > :nth-child(1) > .font-demi",
      homePage.cardHeading
    );
  });

  it("Should be able to see a card consist My family Id number.", () => {
    const familyIdNumber = homePage.familyIdNumber;
    familyIdNumber.forEach((value) => {
      cy.get("h1[class='font-demi text-[24px] mt-6']")
        .should("exist")
        .should("contain", value);
    });
  });

  it("Should be able to see a card consist My Name.", () => {
    cy.get("h1[class='font-demi text-[20px] mt-6']")
      .should("exist")
      .should("be.visible");
    const myName = homePage.myName;
    cy.verifyTextInElement(
      "h1[class='font-demi text-[20px] mt-6']",
      homePage.myName
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      "h1[class='font-demi text-[20px] mt-6']",
      homePage.myName
    );
  });

  it("Should be able to see a card consist My Block,District.", () => {
    cy.get(".bg-summary-card > :nth-child(4)").should("be.visible");
    cy.verifyTextInElement(
      ".bg-summary-card > :nth-child(4)",
      homePage.address
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      ".bg-summary-card > :nth-child(4)",
      homePage.address
    );
  });

  it("Should be able to see a card consist Number of Members in my family.", () => {
    cy.get(".mt-1 > .font-medium").should("be.visible");
    cy.verifyTextInElement(".mt-1 > .font-medium", homePage.noFamilyMember);
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(".mt-1 > .font-medium", homePage.noFamilyMember);
  });

  it("Should be able to see a card consist Finacial Year.", () => {
    cy.get(
      "div[class='flex justify-between mt-1'] div[class='font-regular text-[11px]']"
    ).should("be.visible");
    cy.verifyTextInElement(
      "div[class='flex justify-between mt-1'] div[class='font-regular text-[11px]']",
      homePage.finacialYear
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      "div[class='flex justify-between mt-1'] div[class='font-regular text-[11px]']",
      homePage.finacialYear
    );
  });

  it("Should be able to see a total benfit amount", () => {
    cy.get(".bg-tertiary > .flex > .font-bold")
      .should("exist")
      .should("contain", homePage.benifitsAmount);
  });

  it("Should be able to see a total benfit text.", () => {
    cy.get(
      "div[class='bg-tertiary py-4 px-3 mt-10 mx-5 rounded-lg text-appGray text-center'] div[class='font-regular text-[11px]']"
    )
      .should("exist")
      .should("be.visible");
    cy.verifyTextInElement(
      "div[class='bg-tertiary py-4 px-3 mt-10 mx-5 rounded-lg text-appGray text-center'] div[class='font-regular text-[11px]']",
      homePage.benifitsFromGovttext
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      "div[class='bg-tertiary py-4 px-3 mt-10 mx-5 rounded-lg text-appGray text-center'] div[class='font-regular text-[11px]']",
      homePage.benifitsFromGovttext
    );
  });

  it("Should be able to see a number of scheme avaialable text.", () => {
    cy.get("span[class='ml-2 font-demi text-[12px]']").should("exist");
    cy.verifyTextInElement(
      "span[class='ml-2 font-demi text-[12px]']",
      homePage.noOfSchemesText
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      "span[class='ml-2 font-demi text-[12px]']",
      homePage.noOfSchemesText
    );
  });

  it("Should be able to see a number of schemes available", () => {
    cy.get(".py-2 > .font-bold")
      .should("exist")
      .should("contain", homePage.noOfSchemes);
  });

  it("Should be able to click on family and it should redirect to family page.", () => {
    cy.get(".bg-summary-card.py-7.px-5.mx-5.rounded-lg.text-white")
      .should("exist")
      .click();
    cy.url().should("contain", routes.family);
  });

  it("Should be able to click on the total schemes availed & gets directed to benefit's Scheme screen.", () => {
    cy.get(
      ".py-2.px-3.mt-4.mx-5.rounded-lg.text-center.bg-tertiary.font-regular.uppercase.text-appGray.flex.justify-center.items-center"
    )
      .should("exist")
      .click();
    cy.url().should("contain", routes.benefits);
  });

  it("Should be able to click on the total benefit amount & gets directed to benefit's Transaction screen", () => {
    cy.get('[href="/benefits?transactions=true"] > .bg-tertiary')
      .should("exist")
      .click();
    cy.url().should("contain", routes.benefits + "?transactions=true");
  });

  it("Should be able to see the home button at bottom of home page and it should be clickable.", () => {
    cy.get(`[href="${routes.home}"] > .flex`)
      .should("exist")
      .should("be.visible");
    cy.verifyTextInElement(
      `[href="${routes.home}"] > .flex`,
      homePage.homeButtonText
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      `[href="${routes.home}"] > .flex`,
      homePage.homeButtonText
    );
  });

  it("Should be able to see the Family button at bottom of home page and it should be clickable.", () => {
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`)
      .should("exist")
      .should("be.visible");
    cy.verifyTextInElement(
      `[href="${routes.family}"] > .flex`,
      homePage.familyButtonText
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      `[href="${routes.family}"] > .flex`,
      homePage.familyButtonText
    );
    cy.get(`[href="${routes.family}"] > .flex > .inline-flex`).click();
    cy.url().should("contain", routes.family);
    cy.go("back");
  });

  it("Should be able to see the Benefits button at bottom of home page and it should be clickable.", () => {
    cy.get(`.grid > [href="${routes.benefits}"] > .flex`)
      .should("exist")
      .should("be.visible");
    cy.verifyTextInElement(
      `[href="${routes.benefits}"] > .flex`,
      homePage.benefitsButtonText
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      `[href="${routes.benefits}"] > .flex`,
      homePage.benefitsButtonText
    );
    cy.get(`.grid > [href="${routes.benefits}"] > .flex`).click();
    cy.url().should("contain", routes.benefits);
    cy.go("back");
  });

  it("Should be able to see the Discover button at bottom of home page and it should be clickable.", () => {
    cy.get(`[href="${routes.discover}"] > .flex > .inline-flex`)
      .should("exist")
      .should("be.visible");
    cy.verifyTextInElement(
      `[href="${routes.discover}"] > .flex`,
      homePage.discoverButtonText
    );
    cy.get("#eng").click();
    cy.wait(1000);
    cy.verifyTextInElement(
      `[href="${routes.discover}"] > .flex`,
      homePage.discoverButtonText
    );
    cy.get(`[href="${routes.discover}"] > .flex > .inline-flex`).click();
    cy.url().should("contain", routes.discover);
    cy.go("back");
  });

  it("Should be able to see the hamburger and notifications bell icon at top of home page and it should be clickable", () => {
    cy.get("label[class='drawer-button w-5 cursor-pointer']")
      .should("exist")
      .should("be.visible")
      .click();
    cy.get(".w-fit").click();

    cy.get(`a[href="${routes.notifications}"]`)
      .should("exist")
      .should("be.visible")
      .click();
    cy.url().should("contain", routes.notifications);
    cy.get(
      "button[class='font-medium mt-4 rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]']"
    ).click();
  });
});
