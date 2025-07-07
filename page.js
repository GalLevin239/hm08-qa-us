module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberInput: '#number',
    cardCodeInput: '.card-code-input input[name="code"]',
    CommentInput: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div.tcard:nth-child(5)',
    paymentMethodButton: 'div.pp-button.filled', 
    addCardButton: 'div.pp-title=Add card',
    linkButton: 'button=Link',
    iceCreamPlusButton: 'div.r-grup:nth-child(1) .count-plus',
    // Toggles
    blanketToggle: 'div.reqs-body div.r-type-switch:nth-of-type(1) span.slider.round',
    soundproofCurtainToggle: 'div.reqs-body div.r-type-switch:nth-of-type(2) span.slider.round',
    // Checked Toggles
    blanketToggleChecked: 'div.reqs-body div.r-type-switch:nth-of-type(1) input.switch-input:checked',
    soundproofCurtainToggleChecked: 'div.reqs-body div.r-type-switch:nth-of-type(2) input.switch-input',
    iceCreamValue: 'div.r-grup:nth-child(1) .counter-value',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
         await fromField.waitForDisplayed({ timeout: 10000 });
        await fromField.setValue(from);
        
        const toField = await $(this.toField);
         await toField.waitForDisplayed({ timeout: 10000 });
        await toField.setValue(to);
       await browser.waitUntil(
        async () => (await toField.getValue()) === to,
        {
            timeout: 10000,
            timeoutMsg: 'toField value was not set as expected'
        }
    );
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed({ timeout: 10000 });
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
   addCreditCard: async function(cardNumber, cardCode) {
  const paymentMethodButton = await $(this.paymentMethodButton);
  await paymentMethodButton.waitForDisplayed();
  await paymentMethodButton.click();

  const addCardButton = await $(this.addCardButton);
  await addCardButton.waitForDisplayed();
  await addCardButton.click();

  const cardNumberInput = await $(this.cardNumberInput);
  await cardNumberInput.waitForDisplayed();
  await cardNumberInput.scrollIntoView();
  await cardNumberInput.click();
  await cardNumberInput.clearValue();
  await cardNumberInput.addValue(cardNumber);

  await browser.waitUntil(
    async () => (await $(this.cardCodeInput)).isExisting(),
    { timeout: 10000, timeoutMsg: '#code input did not exist' }
  );

    const codeInput = await $(this.cardCodeInput)
    await codeInput.waitForDisplayed({ timeout: 10_000 })
    await codeInput.click()
    await codeInput.setValue(cardCode)
    await browser.keys('\uE004')

    const linkBtn = await $(this.linkButton)
    await linkBtn.waitForEnabled({ timeout: 10_000 })
    await linkBtn.click()
  },
    selectSupportivePlan: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
    },
   wiritComent:async function(comment) {
        const commentInput = await $(this.CommentInput);
        await commentInput.waitForDisplayed();
        await commentInput.setValue(comment);
    },
    orderBlanket: async function() {
        const toggle = await $(this.blanketToggle);
        await toggle.scrollIntoView();
        await toggle.waitForDisplayed();
        await toggle.click();
    },
    ordeHankerchiefs: async function() {
        const toggle = await $(this.soundproofCurtainToggle);
        await toggle.scrollIntoView();
        await toggle.waitForDisplayed();
        await toggle.click();
    },
    orderIceCream: async function() {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.scrollIntoView();
        await iceCreamPlusButton.waitForDisplayed();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
    
    }
};
