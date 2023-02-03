# Quick Start
After cloning the project:
1. create a .env file at the root of the project with the following entries:
```
PLAYWRIGHT_URL=http://jupiter2.cloud.planittesting.com
PLAYWRIGHT_BROWSER=chromium
PLAYWRIGHT_HEADLESS=true
```
2. run `yarn install`
3. run `yarn playwright install`
4. run `yarn test`


# Environment setup
This template follows https://12factor.net/config and as a consequence it reads configuration information from environment variables.

These are the environment variables that can be set to configure the template:
* **PLAYWRIGHT_URL** -> Mandatory. The URL of the system under test
* **PLAYWRIGHT_BROWSER** -> Optional. 'chromium'|'firefox'|'webkit' defaults to chromium
* **PLAYWRIGHT_HEADLESS** -> Optional. 'true|false' defaults to true

## .env file
To assist development when setting or changing environment variables on the fly without having to set them at the OS level create a file with name `.env` at the root of the solution. This file can contain the environment variables that will be used during the creation of test cases.


|**DON'T ADD .env TO A GIT REPO.**
|--------------------------------------| 
|*Make sure that .gitignore contains an entry for .env before creating the file*
