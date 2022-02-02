// Table
interface shopping_cart {
  id: string;
  subtotal: number;

  // relations
  user_cart: user;
  items: product_item[];
}

interface user {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  birth_date: string;

  //relations
  orders: order[];
  shopping_cart: shopping_cart;
}

interface tags {
  id: string;
  title: string;
}

interface categories {
  id: string;
  title: string;
}

interface product {
  id: string;
  title: string;
  price: number;
  discount: number;
  description: string;
  warranty: string;
  gallery: string[];
  stock: number;

  // relations
  category: categories[];
  tags: tags[];
}

interface product_item {
  id: string;
  quantity: number;
  product: product;
}

interface bill {
  // User data
  fullName: string;
  email: string;
  phoneNumber: string;

  // direction
  state: string;
  city: string;
  street: string;
  zip_code: string;
}

interface payment {
  id: string;
  card_number: string;
  security_digits: string;
  expiring_date: string;
}

interface order {
  order_number: string;
  purchase_date: string;
  delivery_time: string;
  shipping_cost: number;
  package_cost: number;
  subtotal: number;

  // relations
  bill_info: bill;
  payment_info: payment;
  items: product_item[];
}
