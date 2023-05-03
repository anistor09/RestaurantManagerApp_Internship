# Meeting Agenda - Group 6C

### Week: 1
### Main focus: Project plan

## **Opening**
- Check in, how is everyone doing
- The main focus of the meeting for us: understand the problem and collect some requirements

## **Main topics**
## 1. Problem analysis
*Understand the actual task*
- Who are the stakeholders? To whom is the project directed to: restaurant staff, customers, etc.
- Do we have any potential users that we can interview/send a questionnarie to in order to understand their needs better and know what to focus on?
- Do we have any user experiences so far that we can guide ourselves with?
- Do we have access to the codebase so that we can investigate it and match the UI design?

## 2. Requirements
*Collect some basic requirements, discuss potential advanced features*
- How is it feasible for you to collect the requirements?
- Should we arrange another meeting to discuss this in more detail or can we do this now?

## 3. Risk analysis
*Check how much support we can expect*
- How should be the progress be delivered?
- Are you available every week during this project?

## 4. Frameworks
- Do you have any recommendations on where to start learning Vue.js: a course, videos, etc.
- Do we use any CSS libraries for making the UI design more coherent?

## **Closure and Summary**
- Go through the established arrangements one more time
- Decide on scheduling next meeting

# Meeting Notes

## 1. Problem analysis
- stakeholders: clients, restaurant managers
- it is a business application, not it client one
- check out Uber Eats as inspiration
- client interviews are the only available requirement elicitation process
- the client provides low fidelity: database schema, designer inspiration, etc.
- after collecting the requirements, we will plan a medium fidelity to discuss with the client: build UI prototype in Figma to present the design
- the high fidelity (usable application) will be tested by both the clients and restaurant managers
- we have access to the codebase to match the application with the customer side in terms of design

## 2. Requirements
MUST:
 - CRUD items, categories, subcategories, menus + menus for evening/lunch
 - authentication token for storing and refresh
 - upload images: restaurant, menu, items, categories
 - table management: create, modify, generate qr code

SHOULD:
 - analytics: which item is sold, etc.
 - currency management (dollars to euros)
 - AI = autocompletion for descriptions for items: OpenAI call

COULD:
 - translation dutch - english
 - order history, manager should be able to look into past orders

WON'T:
 - correlate with the application dedicated to customers

## 3. Risk analysis
 - discuss prcess each week, in case something goes wrong we can discuss it

## 4. Frameworks
 - https://vuejs.org/guide/introduction.html
 - https://nuxt.com/docs/guide
 - tailwind
 - https://element-plus.org/en-US/



