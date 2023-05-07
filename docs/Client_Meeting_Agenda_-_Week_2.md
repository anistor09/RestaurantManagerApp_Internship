# Meeting Agenda - Group 6C

### Chair: Vian
### Notetaker: Radu
### Week: 2

## **Opening**
- Check in, how is everyone doing
- Discuss the plan for the next week

## **Main topics**
## 1. Questions about functionality
- What are exactly the analytics? Revenue per day? Number of products sold per day?
- Do we need to implement functionality for the live orders? Or only the analytics (from the past)
- Do we need to keep track of the stock? (add products or delete products from the stock)
- Do we need to provide functionality for the managers to create promotions for a limited period of time?

## 2. Database schema
- In the database schema what is the diff between option and choice?
- Why are there 2 relations side-item and item-side?

## 3. Requirements
- Show the updated requirements
- Are there any more non-functinal requirements (time constraints, resonse time, maximum load, colorbind friendly)?

## **Closure and Summary**
- Decide on scheduling next meeting

# Meeting Notes
- make sure that an item and a category have the same subcategory
- you can directly create a category from the creation page of an item
- check the colour pallet works for colour blindness
- cypress or other frameworks for end-to-end testing
- maybe different access levels for a restaurant (user management)
- limit the communication with the backend as much as possible
- analytics: most important revenue chart
- frontend handles data based on timeframes in order to reduce computational constraints
- caching as a potential non-functional requirement
- main view on laptop but should work as well on phone
- make sure to not have circular jasons
- option(ex medium rare, well done), choice(sauce), side dish(are related to the items)
- we are not expected to work with live orders
- inventory management system it highly improbable
- support for offers and coupons as a requirement
- analytics will be a separate microservice written in Spring Boot and be promoted to a must
- the backend should be dockerized 








