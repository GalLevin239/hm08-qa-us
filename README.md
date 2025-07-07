Urban.Routes Test Automation Suite

Project Name

Urban.Routes

Description

This repository contains an end-to-end test automation suite for the Urban.Routes web application. Urban.Routes is a platform that allows users to request taxi rides, add payment methods, attach order requirements (such as blankets, handkerchiefs, ice cream, etc.), and track driver assignment through a dynamic UI.

Technologies & Techniques

Node.js (JavaScript runtime)

WebdriverIO (v8) for browser automation

Mocha as the test framework

Chai (via built‑in WDIO expect)

WDIO Services & Plugins

Service: @wdio/local-runner, @wdio/devtools-service, etc.

Plugins: network interception (wdio-intercept-service)

Page Object Model (POM) for maintainable selectors and actions

Dynamic waiting strategies:

waitForDisplayed, waitUntil, scrollIntoView to handle async UI updates

JavaScript execution for complex fields (e.g., custom card input)

Network interception to capture and assert payloads (e.g., phone verification code)

CSS Selector techniques:

ID selectors (#id)

Attribute selectors

:nth-of-type, :checked pseudo-classes

Scoped hierarchy selectors for deeply nested elements

Getting Started

Prerequisites

Node.js (v14 or above)

npm or yarn

Installation

# Clone the repository
git clone <repository-url>
cd Urban.Routes

# Install dependencies
npm install
# or
yarn install

Configuration

No additional configuration is required out of the box. All default settings (e.g., wdio.conf.js) are prepared for local Chrome and Firefox testing.

Running Tests

# Run the full test suite
npx wdio run wdio.conf.js
# or with npm script if defined
yarn test

Author

Gal Levin

License

This project is licensed under the MIT License.


