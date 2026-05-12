
import 'dotenv/config';
console.log('PAYPAL_BASE_URL:', process.env.PAYPAL_BASE_URL);
import app from './app.js';

console.log(process.cwd());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});