import request from 'supertest';
import expect from 'expect';
import {ShoppingItemTest} from '../app/interfaces/ShoppingItem';
require('dotenv').config();

const postShoppingListItem = (
  url: string | Function, 
  item: ShoppingItemTest, 
  token: string): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `
            mutation CreateShoppingListItem($title: String!, $type: String!, $description: String!) {
              createShoppingListItem(title: $title, type: $type, description: $description) {
                id,
                title,
                type,
                description,
                owner {
                  user_name
                },
              }
            }
          `,
          variables: item
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newShoppingItem = response.body.data.createShoppingListItem;
            expect(newShoppingItem).toHaveProperty('id');
            expect(newShoppingItem).toHaveProperty('title');
            expect(newShoppingItem).toHaveProperty('description');
            expect(newShoppingItem.type).toBe(item.type);
            resolve(response.body.data.createShoppingListItem);
          }
        })
    })
  };

const getShoppingListItemById = (
  url: string | Function, 
  id: string, token: string): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ShoppingItemById($shoppingItemByIdId: ID!) {
          shoppingItemById(id: $shoppingItemByIdId) {
            description
            id
            owner {
              user_name
              id
              email
            }
            title
            type
          }
        }`,
        variables: {
          shoppingItemByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const shoppingItem = response.body.data.shoppingItemById;
          expect(shoppingItem).toHaveProperty('id');
          expect(shoppingItem).toHaveProperty('title');
          expect(shoppingItem).toHaveProperty('description');
          expect(shoppingItem).toHaveProperty('type');
          expect(shoppingItem.type).toBe("food");
          expect(shoppingItem).toHaveProperty('owner');
          expect(shoppingItem.owner).toHaveProperty('email');
          expect(shoppingItem.owner).toHaveProperty('id');
          expect(shoppingItem.owner).toHaveProperty('user_name');
          resolve(response.body.data.shoppingItemById);
        }
      });
  });
};

//unneccessary since only a admin should be allowed to get all items?
// const getShoppingListItems = (
//   url: string | Function, 
//   item: ShoppingItemTest): Promise<ShoppingItemTest> => {
//     return new Promise((resolve, reject) => {
//       request(url)
//       .post('/graphql')
//       .set('Content-type', 'application/json')
//       .send({

//       })
//       .expect(200, (err, response) => {
//         if (err) {
//           reject(err);
//         } else {

//           });
//         }
//       });
//     })
//   };

const getShoppingListItemsByUser = (
  url: string | Function, 
  id: string, token: string): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ShoppingItemsByUser($ownerId: ID!) {
          shoppingItemsByUser(ownerId: $ownerId) {
            description
            id
            owner {
              user_name
              id
              email
            }
            type
            title
          }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const items = response.body.data.shoppingItemsByUser;
          expect(items).toBeInstanceOf(Array);
          // cats.forEach((cat: CatTest) => {
          //   expect(cat).toHaveProperty('id');
          //   expect(cat).toHaveProperty('cat_name');
          //   expect(cat).toHaveProperty('weight');
          //   expect(cat).toHaveProperty('location');
          //   expect(cat).toHaveProperty('filename');
          //   expect(cat).toHaveProperty('birthdate');
          //   expect(cat).toHaveProperty('owner');
          //   expect(cat.owner).toHaveProperty('email');
          //   expect(cat.owner).toHaveProperty('id');
          //   expect(cat.owner).toHaveProperty('user_name');
          // });
          resolve(items);
        }
      });
    })
  };

const sortShoppingListByType = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const safeShoppingList = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const deleteShoppingListItemByID = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const deleteShoppingListById = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const loadShoppingListById = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const createPurchaseAfterCompletingAList = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

export {
  postShoppingListItem,
  getShoppingListItemById,
  getShoppingListItemsByUser,
  safeShoppingList,
  deleteShoppingListById,
  deleteShoppingListItemByID,
  loadShoppingListById,
  createPurchaseAfterCompletingAList,
  sortShoppingListByType
}