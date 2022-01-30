export const payment_Schema = new mongoose.Schema({
  card_number: { type: String, required: true },
  security_digits: { type: String, required: true },
  expiring_date: { type: String, required: true },
}

export class Payment_DATA extends mongoose.Document {
  card_number: string;
  security_digits: string;
  expiring_date: string;
}