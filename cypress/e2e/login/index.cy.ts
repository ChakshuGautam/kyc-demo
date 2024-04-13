import { loginPageTexts, routes, apiRoutes } from "../../contants";

const apiUrl = Cypress.env("API_URL");
const baseUrl = Cypress.env("BASE_URL");

const { login } = apiRoutes;

const verifyTextInElement = (elementSelector, expectedText) => {
  cy.get(elementSelector).should((element) => {
    const elementText = element.text();
    const containsExpectedValue = expectedText.some((value) =>
      elementText.includes(value)
    );
    expect(containsExpectedValue).to.be.true;
  });
};

describe("Login Page", () => {
  beforeEach(() => {
    cy.session("Login Page", () => {
      cy.visit("http://localhost:3000");
    });
    cy.visit("http://localhost:3000");
  });

  it("should display choose your language text", () => {
    cy.get("#language-selector-heading").should("exist");
    cy.should("have.text", loginPageTexts.chooseLanguage);
  });

  it("should display two language buttons having text hindi and english ", () => {
    cy.get("#language-selector-english")
      .should("exist")
      .should("have.text", "English");
    cy.get("#language-selector-hindi")
      .should("exist")
      .should("have.text", "हिन्दी");
  });

  it("should display the heading", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#login-heading").should("exist").should("be.visible");
    verifyTextInElement("#login-heading", loginPageTexts.heading);
    cy.go("back");
    cy.get("#language-selector-english").click();
    verifyTextInElement("#login-heading", loginPageTexts.heading);
  });

  it("should display the input box", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#login-input-aadhar").should("exist");
    cy.go("back");
    cy.get("#language-selector-english").click();
    cy.get("#login-input-aadhar").should("exist");
  });

  it("should display the login button", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#login-heading").should("exist").should("be.visible");
    verifyTextInElement("#login-button", loginPageTexts.button);
    cy.go("back");
    cy.get("#language-selector-english").click();
    verifyTextInElement("#login-button", loginPageTexts.button);
  });

  it("should display the text Not Registered on Family ID?", () => {
    cy.get("#language-selector-hindi").click();
    verifyTextInElement(
      "#login-registration-portal",
      loginPageTexts.registrationPortal
    );
    cy.go("back");
    cy.get("#language-selector-english").click();
    verifyTextInElement(
      "#login-registration-portal",
      loginPageTexts.registrationPortal
    );
  });

  it("should display the click here", () => {
    cy.get("#language-selector-hindi").click();
    verifyTextInElement(
      "#login-registration-portal-link",
      loginPageTexts.clickHerePortalLink
    );
    cy.go("back");
    cy.get("#language-selector-english").click();
    verifyTextInElement(
      "#login-registration-portal-link",
      loginPageTexts.clickHerePortalLink
    );
  });

  it("should be able to enter aadhaar number", () => {
    cy.get("#language-selector-hindi").click();
    const aadharNumber1 = loginPageTexts?.validAadharNumber;
    cy.get("#login-input-aadhar")
      .type(aadharNumber1)
      .should("have.value", aadharNumber1);
    cy.go("back");
    cy.get("#language-selector-english").click();
    const aadharNumber2 = loginPageTexts?.validAadharNumber;
    cy.get("#login-input-aadhar")
      .type(aadharNumber2)
      .should("have.value", aadharNumber2);
  });

  it("should not be able to enter aadhaar number more than 12 digits", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#login-input-aadhar")
      .type(loginPageTexts.invalidAadharNumber)
      .should("have.value", loginPageTexts?.validAadharNumber);
    cy.get(".swal-button").click();
    cy.go("back");
    cy.get("#language-selector-english").click();
    cy.get("#login-input-aadhar")
      .type(loginPageTexts.invalidAadharNumber)
      .should("have.value", loginPageTexts?.validAadharNumber);
  });

  it("should not be able to enter anything except numbers in Aadhar Number", () => {
    cy.get("#language-selector-hindi").click();
    const invalidAadhaarNumber = "abcd1234";
    cy.get("#login-input-aadhar")
      .type(invalidAadhaarNumber)
      .should("have.value", "1234");
  });

  it("should be able to click on Login button when user select hindi language", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#login-input-aadhar").type(loginPageTexts?.validAadharNumber);
    cy.get("#login-button").click();
  });

  it("should be able to click on Login button when user select english language", () => {
    cy.get("#language-selector-english").click();
    cy.get("#login-input-aadhar").type(loginPageTexts?.validAadharNumber);
    cy.get("#login-button").click();
  });

  it("should be display the logo UP govt", () => {
    cy.get(".justify-between > img").should("exist");
    cy.get(".justify-between > img").should("be.visible");
  });

  it("should be display the image of cm up", () => {
    cy.get("#cm_up").should("exist");
    cy.get("#cm_up").should("be.visible");
  });

  it("should be display family id logo i.e image", () => {
    cy.get(":nth-child(2) > img").should("exist");
    cy.get(":nth-child(2) > img").should("be.visible");
  });

  it("should be display find scheme button ", () => {
    cy.get("#language-selector-hindi").click();
    cy.get("#find-schemes-button").should("exist");
    cy.verifyTextInElement(
      "#find-schemes-button",
      loginPageTexts.findSchemeButtonText
    );
    cy.go("back");
    cy.get("#language-selector-english").click();
    cy.verifyTextInElement(
      "#find-schemes-button",
      loginPageTexts.findSchemeButtonText
    );
  });

  // it("registration link should redirect to familyId portal",()=>{
  //   cy.get('#login-registration-portal-link').click
  //   cy.wait(3000)
  //   cy.url().should('contain','https://familyid.up.gov.in/portal/index.html')

  // })

  // it("If Aadhaar number exists -> Moves to OTP page", () => {
  //   const aadhaarNumber = loginPageTexts?.validAadharNumber;
  //   cy.intercept(
  //     `${login?.method}`,
  //     `${apiUrl}${login?.route}${aadhaarNumber}`
  //   ).as("login");

  //   cy.get("#login-input-aadhar").type(aadhaarNumber);
  //   cy.get("#login-button").click();

  //   cy.wait("@login", { timeout: 15000 });

  //   cy.get("@login")
  //     .its("response")
  //     .then((response) => {
  //       expect(response?.statusCode).to.equal(201);
  //       cy.url().should("include", routes?.otp);
  //     });
  // });

  // it("If Aadhaar number doesn't exist  -> Gets a alert message on screen with a link to direct to registration portal", () => {
  //   const aadhaarNumber = loginPageTexts?.validAadharNumber;
  //   cy.intercept(
  //     `${login?.method}`,
  //     `${apiUrl}${login?.route}${aadhaarNumber}`
  //   ).as("login");

  //   cy.get("#login-input-aadhar").type(aadhaarNumber);
  //   cy.get("#login-button").click();

  //   cy.wait("@login", { timeout: 15000 });

  //   cy.get("@login")
  //     .its("response")
  //     .then((response) => {
  //       expect(response?.statusCode).to.equal(403);
  //       cy.url().should("include", "/");
  //       cy.contains(loginPageTexts?.registrationPortal).should("exist");
  //     });
  // });

  // it("Should be able to click on Registration Portal link", () => {
  //   cy.get("#login-registration-portal-link").click();
  //   cy.url().should("include", "");
  // });
});

export {};
