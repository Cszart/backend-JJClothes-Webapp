import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTOs
import { ShoppingCart_DTO } from './shoppingCart.model';
import { Product_Item_DTO } from 'src/product/product.model';

@Injectable()
export class ShoppingCart_Service {
  // Nombre ShoppingCart se definio en mongooseModule en shoppingCart.module.ts
  constructor(
    @InjectModel('ShoppingCart')
    private readonly shoppingCartModel: Model<ShoppingCart_DTO>,
  ) {}

  // Funcion calcular el subtotal
  async calculate_subtotal(
    shoppingCart_data: ShoppingCart_DTO & {
      _id: any;
    },
  ): Promise<number> {
    // Popular los productos porque inicialmente se tienen referencias
    await shoppingCart_data.populate('items.product');

    // Calcular subtotal
    let subtotal_calculation = 0;
    shoppingCart_data.items.forEach((item: any) => {
      subtotal_calculation =
        subtotal_calculation + item.product.price * item.quantity;
    });

    return subtotal_calculation;
  }

  // FUNCION Insertar shoppingCarto
  async create_shoppingCart(shoppingCart_info: ShoppingCart_DTO) {
    // Crear el shoppingCart
    const newShoppingCart = new this.shoppingCartModel(shoppingCart_info);

    // Guardar en bd
    const response_insert = await newShoppingCart.save();

    // Cambiar sub total
    response_insert.subtotal = await this.calculate_subtotal(response_insert);

    // Guardar
    await response_insert.save();

    console.log(
      '<- ShoppingCart_Service, inser shoppingCart response ->',
      response_insert,
    );
    return response_insert;
  }

  // FUNCION actualizar info de carrito
  async update_shoppingCart(
    shoppingCart_id: string,
    shoppingCart_data: ShoppingCart_DTO,
  ) {
    // buscar carrito por id
    const response_shoppingcart = await this.find_byID(shoppingCart_id);

    if (shoppingCart_data.items) {
      response_shoppingcart.items = shoppingCart_data.items;
    }

    response_shoppingcart.subtotal = await this.calculate_subtotal(
      response_shoppingcart,
    );

    console.log(
      '<- ShoppingCart_Service, update ShoppingCart response ->',
      response_shoppingcart,
    );

    // Guardar en la bd
    response_shoppingcart.save();

    return response_shoppingcart;
  }

  // FUNCION añadir un item al carrito
  async add_product_shoppingCart(
    shoppingCart_id: string,
    product_data: Product_Item_DTO,
  ) {
    // buscar carrito por id
    const response_shoppingcart = await this.shoppingCartModel.findById(
      shoppingCart_id,
    );

    response_shoppingcart.items.push(product_data);

    response_shoppingcart.subtotal = await this.calculate_subtotal(
      response_shoppingcart,
    );

    console.log(
      '<- ShoppingCart_Service, add product to ShoppingCart response ->',
      response_shoppingcart,
    );

    // Guardar en la bd
    response_shoppingcart.save();

    return response_shoppingcart;
  }

  // FUNCION obtener todos los shoppingCartos
  async find_all() {
    // buscar en bd
    const response_getAll = await this.shoppingCartModel
      .find()
      .populate('user')
      .exec();

    console.log(
      '<- ShoppingCart_Service, get all shoppingCart response ->',
      response_getAll,
    );
    return response_getAll;
  }

  // FUNCION obtener shoppingCarto por id
  async find_byID(shoppingCart_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.shoppingCartModel
        .findById(shoppingCart_id)
        .populate('user')
        .populate('items.product')
        .exec();

      console.log(
        '<- ShoppingCart_Service, get shoppingCart by id response ->',
        response_byID,
      );
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find shoppingCart');
    }
  }

  // FUNCION borrar un shoppingCarto de la bd
  async delete_shoppingCart(shoppingCart_id: string | number) {
    // buscar shoppingCarto por id
    const response_delete = await this.shoppingCartModel
      .deleteOne({ _id: shoppingCart_id })
      .exec();

    console.log(
      '<- ShoppingCart_Service, delete shoppingCart response ->',
      response_delete,
    );

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find shoppingCart');
    }

    return response_delete;
  }
}
