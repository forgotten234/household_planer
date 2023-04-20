import request from 'supertest';
import expect from 'expect';
import {ShoppingItem, ShoppingItemTest} from '../app/interfaces/ShoppingItem';
import {ShoppingItemListTest} from '../app/interfaces/ShoppingItemList';

require('dotenv').config();

/* Shopping Item functions */

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
          console.log(items)
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

const updateShoppingItem = (
  url: string | Function, 
  item: ShoppingItemTest,
  id: string,
  token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation Mutation($updateShoppingItemByUserId: ID!, $title: String!, $type: String!, $description: String!) {
          updateShoppingItemByUser(id: $updateShoppingItemByUserId, title: $title, type: $type, description: $description) {
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
          "updateShoppingItemByUserId": id,
          "title": item.title,
          "type": item.type,
          "description": item.description
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedItem = response.body.data.updateShoppingItemByUser;
          expect(updatedItem.title).toBe(item.title);
          expect(updatedItem.type).toBe(item.type);
          expect(updatedItem).toHaveProperty('description');
          resolve(updatedItem);
        }
      });
    })
};
const deleteShoppingListItemByUser = (
  url: string | Function, 
  id: string,
  token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation Mutation($deleteShoppingItemByUserId: ID!) {
          deleteShoppingItemByUser(id: $deleteShoppingItemByUserId) {
            id
          }
        }`,
        variables: {
          "deleteShoppingItemByUserId": id
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedCat = response.body.data.deleteShoppingItemByUser;
          expect(deletedCat.id).toBe(id);
          resolve(deletedCat);
        }
      });
    })
  };

/* Shopping List functions */

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
  shoppingListName: string, itemIds: string[], token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation SafeShoppingListItemList($title: String!, $items: [ID!]!) {
          safeShoppingListItemList(title: $title, items: $items) {
            title
            owner {
              email
              id
              user_name
            }
            id
            items {
              type
              title
              owner {
                user_name
                id
                email
              }
              description
              id
            }
          }
        }`,        
        variables: {
          items: itemIds,
          title: shoppingListName
        }
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const shoppingList = response.body.data.safeShoppingListItemList;
          expect(shoppingList).toHaveProperty('id');
          expect(shoppingList).toHaveProperty('title');
          expect(shoppingList).toHaveProperty('owner');
          expect(shoppingList.owner).toHaveProperty('email');
          expect(shoppingList.owner).toHaveProperty('id');
          expect(shoppingList.owner).toHaveProperty('user_name');
          expect(shoppingList).toHaveProperty('items');
          expect(shoppingList.items).toBeInstanceOf(Array);
          shoppingList.items.forEach((item: ShoppingItemTest) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('owner');
            expect(item.owner).toHaveProperty('email');
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('user_name');
          });
          console.log(itemIds)
          console.log(shoppingList)
          console.log(shoppingListName)
          resolve(shoppingList);
        }
      });
    })
  };


const deleteShoppingListByUser = (
  url: string | Function, 
  id: string, token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteShoppingItemListByUser($deleteShoppingItemListByUserId: ID!) {
          deleteShoppingItemListByUser(id: $deleteShoppingItemListByUserId) {
            id
          }
        }`,
        variables: {
          deleteShoppingItemListByUserId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedList = response.body.data.deleteShoppingItemListByUser;
          expect(deletedList.id).toBe(id);
          resolve(deletedList);
        }
      });
    })
};

const updateShoppingListByUser = (  
  url: string | Function,
  items: string[],
  shoppingListName: string,
  id: string,
  listLength: number,
  token: string): Promise<ShoppingItemListTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `mutation Mutation($updateShoppingListByUserId: ID!, $items: [ID!]!, $title: String) {
            updateShoppingListByUser(id: $updateShoppingListByUserId, items: $items, title: $title) {
              id
              owner {
                user_name
                id
                email
              }
              title
              items {
                type
                title
                id
                description
                owner {
                  user_name
                  id
                  email
                }
              }
            }
          }`,
          variables: {
            "updateShoppingListByUserId": id,
            "items": items,
            "title": shoppingListName
          },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            console.log(response.body.data)
            const updatedList = response.body.data.updateShoppingListByUser;
            expect(updatedList).toHaveProperty('id');
            expect(updatedList).toHaveProperty('items');
            expect(updatedList).toHaveProperty('owner');
            expect(updatedList).toHaveProperty('title');
            expect(updatedList.items.length).toBeGreaterThan(listLength);
            resolve(updatedList);
          }
        });
    });
}

const loadShoppingListsByUser = (
  url: string | Function, 
  id: string,
  token: string): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ShoppingItemListsByUser($ownerId: ID!) {
          shoppingItemListsByUser(ownerId: $ownerId) {
            id
            items {
              type
              title
              owner {
                id
                user_name
                email
              }
              description
              id
            }
            title
            owner {
              user_name
              id
              email
            }
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
          const shoppingList = response.body.data.shoppingItemListsByUser;
          console.log(shoppingList)
          expect(shoppingList).toBeInstanceOf(Array);
          shoppingList.forEach((list: ShoppingItemListTest) => {
            expect(list).toHaveProperty('id');
            expect(list).toHaveProperty('title');
            expect(list).toHaveProperty('items');
            expect(list).toHaveProperty('owner');
            expect(list.items?.length).toBeGreaterThan(1);
            expect(list.owner).toHaveProperty('email');
            expect(list.owner).toHaveProperty('id');
            expect(list.owner).toHaveProperty('user_name');
          });
          resolve(shoppingList);
        }
      });
    })
};

const loadShoppingListById = (
  url: string | Function, 
  id: string, token: string): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ShoppingItemListsByUser($shoppingItemListByIdId: ID!) {
          shoppingItemListById(id: $shoppingItemListByIdId) {
            id
            title
            owner {
              user_name
              id
              email
            }
            items {
              type
              title
              owner {
                email
                id
                user_name
              }
              id
              description
            }
          }
        }`,
        variables: {
          "shoppingItemListByIdId": id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const shoppingItem = response.body.data.shoppingItemListById;
          expect(shoppingItem).toHaveProperty('id');
          expect(shoppingItem).toHaveProperty('title');
          expect(shoppingItem).toHaveProperty('items');
          expect(shoppingItem.items.length).toBeGreaterThan(0)
          expect(shoppingItem).toHaveProperty('owner');
          expect(shoppingItem.owner).toHaveProperty('email');
          expect(shoppingItem.owner).toHaveProperty('id');
          resolve(response.body.data.shoppingItemById);
        }
      });
  });
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
  deleteShoppingListByUser,
  deleteShoppingListItemByUser,
  loadShoppingListsByUser,
  createPurchaseAfterCompletingAList,
  updateShoppingListByUser,
  loadShoppingListById,
  updateShoppingItem
  //sortShoppingListByType
}