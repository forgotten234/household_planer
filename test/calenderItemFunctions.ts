import request from 'supertest';
import expect from 'expect';
import {CalenderItemTest} from '../src/interfaces/CalenderItem';

require('dotenv').config();

const postCalenderItem = (url: string | Function, 
  item: CalenderItemTest, 
  token: string): Promise<CalenderItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `
          mutation Mutation($title: String!, $description: String!, $date: DateTime!) {
            createCalenderItem(title: $title, description: $description, date: $date) {
              title
              id
              owner {
                user_name
                id
                email
              }
              date
              description
            }
          }
          `,
          variables: item
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newCalenderItem = response.body.data.createCalenderItem;
            expect(newCalenderItem).toHaveProperty('id');
            expect(newCalenderItem).toHaveProperty('title');
            expect(newCalenderItem.title).toBe(item.title);
            expect(newCalenderItem).toHaveProperty('description');
            expect(newCalenderItem.description).toBe(item.description);
            expect(newCalenderItem).toHaveProperty('date');
            expect(newCalenderItem).toHaveProperty('owner');
            expect(newCalenderItem.owner).toHaveProperty('email');
            expect(newCalenderItem.owner).toHaveProperty('id');
            expect(newCalenderItem.owner).toHaveProperty('user_name');
            resolve(response.body.data.createCalenderItem);
            }     
        })
    })
  };

const updateBCalenderItemFromUser = (
  url: string | Function, 
  item: CalenderItemTest,
  id: string,
  token: string): Promise<CalenderItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateCalenderItemFromUser($updateCalenderItemFromUserId: ID!, $date: DateTime!, $description: String!, $title: String!) {
          updateCalenderItemFromUser(id: $updateCalenderItemFromUserId, date: $date, description: $description, title: $title) {
            date
            description
            id
            owner {
              user_name
              id
              email
            }
            title
          }
        }`,
        variables: {      
          "updateCalenderItemFromUserId": id,
          "title": item.title,
          "date": item.date,
          "description": item.description,       
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedCalenderItem = response.body.data.updateCalenderItemFromUser;
          expect(updatedCalenderItem.title).toBe(item.title);
          expect(updatedCalenderItem.description).toBe(item.description);
          expect(updatedCalenderItem).toHaveProperty('date');
          resolve(updatedCalenderItem);
        }
      });
    })
};

const deleteCalenderItemFromUser = (
  url: string | Function, 
  id: string,
  token: string): Promise<CalenderItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteCalenderItemFromUser($deleteCalenderItemFromUserId: ID!) {
          deleteCalenderItemFromUser(id: $deleteCalenderItemFromUserId) {
            id
          }
        }`,
        variables: {
          "deleteCalenderItemFromUserId": id
        }
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedCalenderItem = response.body.data.deleteCalenderItemFromUser;
          console.log(deletedCalenderItem)
          expect(deletedCalenderItem.id).toBe(id);
          resolve(deletedCalenderItem);
        }
      });
    })
  };

const getAllCalenderItemsFromUser = (
  url: string | Function, 
  id: string, token: string): Promise<CalenderItemTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query Query($calenderItemsFromUserId: ID!) {
          calenderItemsFromUser(id: $calenderItemsFromUserId) {
            date
            description
            id
            owner {
              user_name
              id
              email
            }
            title
          }
        }`,        
        variables: {
          "calenderItemsFromUserId": id
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const calenderItem = response.body.data.calenderItemsFromUser;
          expect(calenderItem).toBeInstanceOf(Array);
          expect(calenderItem.length).toBeGreaterThan(1);
          calenderItem.forEach((item: CalenderItemTest) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('date');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('owner');
            expect(item.owner).toHaveProperty('email');
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('user_name');
          });
          resolve(calenderItem);
        }
      });
    })
  };

export {
  postCalenderItem,
  updateBCalenderItemFromUser,
  deleteCalenderItemFromUser,
  getAllCalenderItemsFromUser,
}