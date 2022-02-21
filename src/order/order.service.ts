import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTOs
import { Order_DTO } from './order.model';
import { Product_DTO } from 'src/product/product.model';

@Injectable()
export class Order_Service {
  // Nombre Order se definio en mongooseModule en order.module.ts
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order_DTO>,

    @InjectModel('Product') private readonly productModel: Model<Product_DTO>,
  ) {}

  // Funcion calcular el subtotal
  async calculate_subtotal(
    order_data: Order_DTO & {
      _id: any;
    },
  ): Promise<number> {
    // Popular los productos porque inicialmente se tienen referencias
    await order_data.populate('items.product');

    // Calcular subtotal
    let subtotal_calculation = 0;
    order_data.items.forEach((item: any) => {
      subtotal_calculation =
        subtotal_calculation + item.product.price * item.quantity;
    });

    return subtotal_calculation;
  }

  // FUNCION Insertar order
  async create_order(order_info: Order_DTO) {
    // Crear el order
    const newOrder = new this.orderModel(order_info);

    // Guardar en bd
    const response_insert = await newOrder.save();

    // Cambiar sub total
    response_insert.subtotal = await this.calculate_subtotal(response_insert);

    // Agregar fecha de creacion
    response_insert.purchase_date = new Date();

    // Se descuenta el stock de los productos
    response_insert.items.map(async (item) => {
      //buscar en bd
      const response_productID = await this.productModel.findById(item.product);
      response_productID.stock = response_productID.stock - item.quantity;
      response_productID.save();
    });

    // Guardar
    await response_insert.save();

    console.log('<- Order_Service, inser order response ->', response_insert);
    return response_insert;
  }

  // FUNCION actualizar info de order
  async update_order(order_id: string, order_data: Order_DTO) {
    // buscar order por id
    const response_order = await this.find_byID(order_id);

    if (order_data.purchase_date) {
      response_order.purchase_date = order_data.purchase_date;
    }

    if (order_data.shipping_cost) {
      response_order.shipping_cost = order_data.shipping_cost;
    }

    if (order_data.bill_info) {
      response_order.bill_info = order_data.bill_info;
    }

    if (order_data.payment_info) {
      response_order.payment_info = order_data.payment_info;
    }

    if (order_data.items) {
      response_order.items = order_data.items;
    }

    response_order.subtotal = await this.calculate_subtotal(response_order);

    response_order.save();

    console.log('<- Order_Service, update Order response ->', response_order);

    return response_order;
  }

  // FUNCION obtener todos los orderos
  async find_all() {
    // buscar en bd
    const response_getAll = await this.orderModel.find().exec();

    console.log('<- Order_Service, get all order response ->', response_getAll);
    return response_getAll;
  }

  // FUNCION obtener ordero por id
  async find_byID(order_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.orderModel
        .findById(order_id)
        .populate('user')
        .populate('items.product')
        .exec();

      console.log(
        '<- Order_Service, get order by id response ->',
        response_byID,
      );
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find order');
    }
  }

  // FUNCION orden por rango de fechas
  async find_date_range(startDate: string, endDate: string) {
    try {
      const response_by_date = await this.orderModel
        .find({
          purchase_date: { $gte: new Date(startDate), $lt: new Date(endDate) },
        })
        .exec();

      console.log('<- Order_Service, find date range ->', response_by_date);
      return response_by_date;
    } catch (error) {
      throw new NotFoundException('Could not find order', error);
    }
  }

  // FUNCION borrar un order de la bd
  async delete_order(order_id: string | number) {
    // buscar ordero por id
    const response_delete = await this.orderModel
      .deleteOne({ _id: order_id })
      .exec();

    console.log('<- Order_Service, delete order response ->', response_delete);

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find order');
    }

    return response_delete;
  }
}
