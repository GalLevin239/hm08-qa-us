const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })
    it('should set the address', async () => {
        await browser.url(`/`);
        await page.fillAddresses('123 Main Street', '456 Elm Street');  
        const toField = await $(page.toField);
        await expect(toField).toHaveValueContaining('456 Elm Street');
    });

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    it('should selecting supportive plan', async () => {
    await browser.url(`/`);
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const supportiveButton = await $(page.supportiveButton);
    await supportiveButton.click();
    await expect(supportiveButton).toHaveElementClassContaining('active');
    });
    it('should select payment method', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard('1123456780000', '45');
    });
    it('should add comment', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const comment = 'This is a test comment';
        await page.wiritComent(comment);
        const commentInput = await $(page.CommentInput);
        await expect(commentInput).toHaveValueContaining(comment);
    });

    it('should order blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderBlanket();
        const toggle = await $(page.blanketToggleChecked);
        await expect(toggle).toBeExisting();
        await page.ordeHankerchiefs();
        const soundproofCurtainToggle = await $(page.soundproofCurtainToggleChecked);
        await expect(soundproofCurtainToggle).toBeExisting();   
    });
});