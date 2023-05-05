import request from 'supertest';
import expect from 'expect';
import {BankBalanceTest} from '../src/interfaces/BankBalance';

require('dotenv').config();

const postBankbalance = (url: string | Function, 
  item: BankBalanceTest, 
  token: string): Promise<BankBalanceTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `
          mutation Mutation($accountName: String!, $balance: Float!, $iban: String!) {
            createBankBalance(accountName: $accountName, balance: $balance, iban: $iban) {
              id
              owner {
                id
                user_name
                email
              }
              balance
              iban
              accountName
            }
          }
          `,
          variables: item
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newBankBalance = response.body.data.createBankBalance;
            if(response.body.errors){
              expect(newBankBalance).toBe(null);
              resolve(response.body.data.createBankBalance);
            } else {
              expect(newBankBalance).toHaveProperty('id');
              expect(newBankBalance).toHaveProperty('accountName');
              expect(newBankBalance.accountName).toBe(item.accountName);
              expect(newBankBalance).toHaveProperty('balance');
              expect(newBankBalance.balance).toBe(item.balance);
              expect(newBankBalance).toHaveProperty('iban');
              expect(newBankBalance.iban).toBe(item.iban);
              expect(newBankBalance).toHaveProperty('owner');
              expect(newBankBalance.owner).toHaveProperty('email');
              expect(newBankBalance.owner).toHaveProperty('id');
              expect(newBankBalance.owner).toHaveProperty('user_name');
              resolve(response.body.data.createBankBalance);
            }
          }
        })
    })
  };

const updateBankBalanceFromUser = (
  url: string | Function, 
  item: BankBalanceTest,
  id: string,
  token: string): Promise<BankBalanceTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateBankBalanceFromUser($updateBankBalanceFromUserId: ID!, $accountName: String!, $balance: Float!, $iban: String!) {
          updateBankBalanceFromUser(id: $updateBankBalanceFromUserId, accountName: $accountName, balance: $balance, iban: $iban) {
            id
            iban
            balance
            accountName
            owner {
              user_name
              id
              email
            }
          }
        }`,
        variables: {
          "updateBankBalanceFromUserId": id,
          "accountName": item.accountName,
          "balance": item.balance,
          "iban": item.iban
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedBalance = response.body.data.updateBankBalanceFromUser;
          expect(updatedBalance.accountName).toBe(item.accountName);
          expect(updatedBalance.balance).toBe(updatedBalance.balance);
          expect(updatedBalance).toHaveProperty('iban');
          resolve(updatedBalance);
        }
      });
    })
};
const deleteBankBalanceFromUser = (
  url: string | Function, 
  id: string,
  token: string): Promise<BankBalanceTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation Mutation($deleteBankBalanceFromUserId: ID!) {
          deleteBankBalanceFromUser(id: $deleteBankBalanceFromUserId) {
            id
          }
        }`,
        variables: {
          "deleteBankBalanceFromUserId": id
        }
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedBankBalance = response.body.data.deleteBankBalanceFromUser;
          expect(deletedBankBalance.id).toBe(id);
          resolve(deletedBankBalance);
        }
      });
    })
  };

const getBankBalanceFromUser = (
  url: string | Function, 
  id: string, token: string): Promise<BankBalanceTest> => {
    return new Promise((resolve, reject) => {
      request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query Query($bankBalanceFromUserId: ID!) {
          bankBalanceFromUser(id: $bankBalanceFromUserId) {
            accountName
            id
            balance
            iban
            owner {
              user_name
              id
              email
            }
          }
        }`,        
        variables: {
          "bankBalanceFromUserId": id
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const balance = response.body.data.bankBalanceFromUser;
          expect(balance).toBeInstanceOf(Array);
          console.log(balance)
          balance.forEach((item: BankBalanceTest) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('accountName');
            expect(item).toHaveProperty('balance');
            expect(item).toHaveProperty('iban');
            expect(item).toHaveProperty('owner');
            expect(item.owner).toHaveProperty('email');
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('user_name');
          });
          resolve(balance);
        }
      });
    })
  };

export {
  postBankbalance,
  updateBankBalanceFromUser,
  deleteBankBalanceFromUser,
  getBankBalanceFromUser
}