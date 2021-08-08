// import bcrypt from 'bcrypt';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import App from '@/app';
// import CustomerRoute from '@/customer/customer.route';
// import { AccountOpenDTO } from '@/customer/customer.dto';
// import { AccountTypes } from '@/customer/customer.enum';
// import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
// import authMiddleware from '@/@universal/middlewares/auth.middleware';
// import { NextFunction, Request, Response } from 'express';
// const basePath = '/api';

// // jest.mock('../@universal/middlewares/auth.middleware', () =>
// //   jest.fn((req: RequestWithCustomer, res, next) => {
// //     req.customer = {
// //       account: [{ accountType: 'mono-savings', accountNumber: '1234567890', balance: 0, denomination: 'kobo' }],
// //       email: 'test@gmail.com',
// //       password: 'hashedPassword',
// //       pin: 'hashedPain',
// //       name: 'John doe',
// //     };
// //     next();
// //   }),
// // );

// // const customerRoute = new CustomerRoute();
// // const customers = customerRoute.customerController.customerService.customer;
// // beforeAll(async () => {
// //  const authRoute = new AuthRoute();
// //  const customers = authRoute.authController.authService.customer;
// //  const { password } = baseData;
// //  customers.findOne = jest.fn().mockReturnValue({
// //    password: await bcrypt.hash(password, 10),
// //  });

// //  (mongoose as any).connect = jest.fn();
// //  const app = new App([authRoute]);
// //  const { body, status } = await request(app.getServer()).post(`${basePath}${authRoute.authPath}/signIn`).send(baseData);
// //  expect(status).toBe(200);
// //  expect(body.data.tokenData).toBeDefined();
// // });

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

// describe('Testing Customer', () => {
//   let mockRequest: Partial<RequestWithCustomer>;
//   let mockResponse: Partial<Response>;
//   let nextFunction: NextFunction = jest.fn();

//   beforeEach(() => {
//     mockRequest = {
//       customer: {
//         account: [{ accountType: 'mono-savings', accountNumber: '1234567890', balance: 0, denomination: 'kobo' }],
//         email: 'test@gmail.com',
//         password: 'hashedPassword',
//         pin: 'hashedPain',
//         name: 'John doe',
//       },
//       body: { accountType: AccountTypes.monoSavings },
//     };
//   });
//   describe('[POST] /signup', () => {
//     it('should create a customer', async () => {
//       const userData: AccountOpenDTO = {
//         accountType: AccountTypes.monoCurrent,
//       };

//       const customerRoute = new CustomerRoute();
//       await authMiddleware(mockRequest as RequestWithCustomer, mockResponse as Response, nextFunction);
//       //   const customers = customerRoute.customerController.customerService.customer;

//       (mongoose as any).connect = jest.fn();
//       const app = new App([customerRoute]);
//       const { body, status } = await request(app.getServer()).post(`${basePath}${customerRoute.path}/account/open-account`).send(userData);
//       console.log(body, '00000000000000000000000');

//       expect(status).toBe(200);
//     });
//   });

//   //   describe('[POST] /login', () => {
//   //     it('should return token for registered customers', async () => {
//   //       const authRoute = new AuthRoute();
//   //       const customers = authRoute.authController.authService.customer;
//   //       const { password } = baseData;
//   //       customers.findOne = jest.fn().mockReturnValue({
//   //         password: await bcrypt.hash(password, 10),
//   //       });

//   //       (mongoose as any).connect = jest.fn();
//   //       const app = new App([authRoute]);
//   //       const { body, status } = await request(app.getServer()).post(`${basePath}${authRoute.authPath}/signIn`).send(baseData);
//   //       expect(status).toBe(200);
//   //       expect(body.data).toHaveProperty('tokenData');
//   //     });
//   //   });
// });
