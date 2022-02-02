import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product_DTO } from './product.model';

@Injectable()
export class Product_Service {
  // Nombre Product se definio en mongooseModule en product.module.ts
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product_DTO>,
  ) {}

  // FUNCION Insertar producto
  async insert_product(product_info: Product_DTO) {
    // Crear el producto
    const newProduct = new this.productModel(product_info);

    // Guardar en bd
    const response_insert = await newProduct.save();

    console.log(
      '<- Product_Service, inser product response ->',
      response_insert,
    );
    return response_insert;
  }

  // FUNCION obtener todos los productos
  async find_all() {
    // buscar en bd
    const response_getAll = await this.productModel
      .find()
      .populate('category')
      .populate('tags')
      .exec();

    console.log(
      '<- Product_Service, get all product response ->',
      response_getAll,
    );
    return response_getAll;
  }

  // FUNCION obtener producto por id
  async find_byID(product_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.productModel.findById(product_id);

      console.log(
        '<- Product_Service, get product by id response ->',
        response_byID,
      );
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }
  }

  // FUNCION borrar un producto de la bd
  async delete_product(product_id: string | number) {
    // buscar producto por id
    const response_delete = await this.productModel
      .deleteOne({ _id: product_id })
      .exec();

    console.log(
      '<- Product_Service, delete product response ->',
      response_delete,
    );

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }

    return response_delete;
  }
}
