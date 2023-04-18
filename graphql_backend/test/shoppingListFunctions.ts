import request from 'supertest';
import expect from 'expect';
import {ShoppingItem, ShoppingItemTest} from '../app/interfaces/ShoppingItem';
import {ShoppingItemListTest} from '../app/interfaces/ShoppingItemList';

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
        variables: {
          ownerId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const items = response.body.data.shoppingItemsByUser;
          expect(items).toBeInstanceOf(Array);
          items.forEach((item: ShoppingItemTest) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('owner');
            expect(item.owner).toHaveProperty('email');
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('user_name');
          });
          resolve(items);
        }
      });
    })
  };

  //not a backend function?
// const sortShoppingListByType = (
//   url: string | Function, 
//   item: ShoppingItemTest): Promise<ShoppingItemTest> => {
//     return new Promise((resolve, reject) => {
      
//     })
//   };

//shoppingListName: string, itemIds: string[], token: string
const safeShoppingList = (
  url: string | Function, 
  item: ShoppingItemListTest, token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation SafeShoppingListItemList($title: String!) {
          safeShoppingListItemList(title: $title) {
            title
          }
        }`,        
        variables: item
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const itemList = response.body.data;
          console.log(itemList)
          console.log(item)
          //expect(itemList).toBeInstanceOf(Array);
          // items.forEach((item: ShoppingItemTest) => {
          //   expect(item).toHaveProperty('id');
          //   expect(item).toHaveProperty('title');
          //   expect(item).toHaveProperty('type');
          //   expect(item).toHaveProperty('description');
          //   expect(item).toHaveProperty('owner');
          //   expect(item.owner).toHaveProperty('email');
          //   expect(item.owner).toHaveProperty('id');
          //   expect(item.owner).toHaveProperty('user_name');
          // });
          resolve(itemList);
        }
      });
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
  //sortShoppingListByType
}