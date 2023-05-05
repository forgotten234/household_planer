# household_planer

## Project description

This is the backend for the household planer. It covers the tests and backend logic for the household planer.

The concrete features and user stories are to find under the "Projects" tab.

All in all it is made to have a planer for your typical household things. The main thing is the shopping list. Further features are a bank balance, a calender and a statistic page. It should help by dealing with with typical task in everday life, so that we don't have to focus on it anymore. It combines several approaches different apps. This make the use of more apps unneccessary. 

3 projects counts to the household planner:
- The backendend (this page)
- The frontend (https://github.com/forgotten234/household_planner_frontend)
- Auth Server (https://github.com/forgotten234/SSSF-auth-server-labs_ts)

### Technologies

Nodejs, Expressjs, GraphQL, Typescript, JWT, bycrypt

### Problems and further implementation

- In this school project it was not possible to get a real api to connect to a several bank account. Different steps are necessary for that what wasn't possible.
- The Calender page only shows if there was a purchase bought on a day. A detail page for the purchase or for all purchases would be nice.
- The same thing counts for the statistic page.
- The page is not 100% responsive. This needs to be done in future.
- A redirect from the "/"-page if you are already logged in is not implemented.
- The code gets because of time reasons a bit messy (frontend). There needs to a bit refactoring.
- The routing on the azure site is not working if you refresh the page. The frontend project needs to have a static webapp routing file for that (https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#fallback-routes).
- Not all pages has a loading mechanismn like the login page. This should be implemented everywhere somethig is created or loaded.

## Install and run 

- clone this repo
- npm i
- npm run dev to start the project
- npm run test for test

This project needs a .env variable with: "DATABASE_URL", "JWT_SECRET", "AUTH_URL", "NODE_ENV", "PORT"

## How to use the project

Use it however you want to. If you fork it, I will look at your commits bevore you merge them.
