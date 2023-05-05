import request from 'supertest';
import expect from 'expect';
import {PurchaseItemTest} from '../src/interfaces/PurchaseItem';

require('dotenv').config()

const postPurchaseItem = (url: string | Function, 
  item: PurchaseItemTest, 
  token: string): Promise<PurchaseItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `
          mutation Mutation($title: String!, $type: String!, $price: Float!) {
            createPurchaseItem(title: $title, type: $type, price: $price) {
              id
              owner {
                user_name
                id
                email
              }
              price
              title
              type
            }
          }
          `,
          variables: item
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newPurchase = response.body.data.createPurchaseItem;
            expect(newPurchase).toHaveProperty('id');
            expect(newPurchase).toHaveProperty('title');
            expect(newPurchase.title).toBe(item.title);
            expect(newPurchase).toHaveProperty('type');
            expect(newPurchase.type).toBe(item.type);
            expect(newPurchase).toHaveProperty('price');
            expect(newPurchase).toHaveProperty('owner');
            expect(newPurchase.owner).toHaveProperty('email');
            expect(newPurchase.owner).toHaveProperty('id');
            expect(newPurchase.owner).toHaveProperty('user_name');
            resolve(newPurchase);
            }     
        })
    })
  };

const updatePurchaseItemFromUser = (
  url: string | Function, 
  item: PurchaseItemTest,
  id: string,
  token: string): Promise<PurchaseItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdatePurchaseItemFromUser($updatePurchaseItemFromUserId: ID!, $title: String!, $type: String!, $price: Float!) {
          updatePurchaseItemFromUser(id: $updatePurchaseItemFromUserId, title: $title, type: $type, price: $price) {
            id
            owner {
              user_name
              id
              email
            }
            price
            title
            type
          }
        }`,
        variables: {
          "updatePurchaseItemFromUserId": id,
          "title": item.title,
          "type": item.type,
          "price": item.price
        }
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedPurchaseItem = response.body.data.updatePurchaseItemFromUser;
          expect(updatedPurchaseItem.title).toBe(item.title);
          expect(updatedPurchaseItem.type).toBe(item.type);
          expect(updatedPurchaseItem).toHaveProperty('price');
          resolve(updatedPurchaseItem);
        }
      });
    })
};

const deletePurchaseItemFromUser = (
  url: string | Function, 
  id: string,
  token: string): Promise<PurchaseItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation Mutation($deletePurchaseItemFromUserId: ID!) {
          deletePurchaseItemFromUser(id: $deletePurchaseItemFromUserId) {
            id
          }
        }`,
        variables: {
          "deletePurchaseItemFromUserId": id
        }
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedPurchaseItem = response.body.data.deletePurchaseItemFromUser;
          console.log(deletedPurchaseItem)
          expect(deletedPurchaseItem.id).toBe(id);
          resolve(deletedPurchaseItem);
        }
      });
    })
  };

const getAllPurchaseItemsFromUser = (
  url: string | Function, 
  id: string, token: string): Promise<PurchaseItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query Query($purchaseItemsFromUserId: ID!) {
          purchaseItemsFromUser(id: $purchaseItemsFromUserId) {
            id
            owner {
              user_name
              id
              email
            }
            price
            title
            type
          }
        }`,        
        variables: {
          "purchaseItemsFromUserId": id
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const purchaseItems = response.body.data.purchaseItemsFromUser;
          expect(purchaseItems).toBeInstanceOf(Array);
          expect(purchaseItems.length).toBeGreaterThan(1);
          purchaseItems.forEach((item: PurchaseItemTest) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('price');
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('owner');
            expect(item.owner).toHaveProperty('email');
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('user_name');
          });
          resolve(purchaseItems);
        }
      });
    })
  };

export {
  postPurchaseItem,
  updatePurchaseItemFromUser,
  deletePurchaseItemFromUser,
  getAllPurchaseItemsFromUser,
}