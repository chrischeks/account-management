import 'dotenv/config';
import App from '@/app';
import CustomerRoute from './customer/customer.route';

const app = new App([new CustomerRoute()]);
app.listen();
