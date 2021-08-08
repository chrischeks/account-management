import 'dotenv/config';
import App from '@/app';
import CustomerRoute from './customer/customer.route';
import PaymentRoute from './payment/payment.route';
import AuthRoute from './auth/auth.route';

const app = new App([new AuthRoute(), new CustomerRoute(), new PaymentRoute()]);
app.listen();
