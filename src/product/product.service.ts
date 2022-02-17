import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO s
import { Product_DTO } from './product.model';

import { Tag_Service } from 'src/tag/tag.service';

@Injectable()
export class Product_Service {
  // Nombre Product se definio en mongooseModule en product.module.ts
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product_DTO>,
    private tag_Service: Tag_Service,
  ) {}

  // FUNCION Insertar producto
  async insert_product(product_info: Product_DTO) {
    // Crear el producto
    const newProduct = new this.productModel(product_info);

    // Guardar en bd
    const response_insert = await newProduct.save();

    console.log(
      '\n\n\n<- Product_Service, inser product response ->',
      response_insert,
    );
    return response_insert;
  }

  // FUNCION Cambiar el stock de todos los productos
  async restock_all(restock: number) {
    console.log('\n\n\n<- Product_Service, restock ->', restock);
    // buscar en bd
    const response_restockAll = await this.productModel.find();

    response_restockAll.forEach((product) => {
      product.initial_stock = restock;
      product.stock = restock;
      product.save();
    });

    console.log(
      '\n\n\n<- Product_Service, inser product response ->',
      response_restockAll,
    );
    return response_restockAll;
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
      '\n\n\n<- Product_Service, get all product response ->',
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
        '\n\n\n<- Product_Service, get product by id response ->',
        response_byID,
      );
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }
  }

  //FUNCION obtener todos los productos con una categoria
  async find_by_category(category_id: string) {
    try {
      // Find the products that has that tag
      const response_byCategoryProduct = await this.productModel
        .find({
          category: category_id,
        })
        .populate('category')
        .populate('tags')
        .exec();

      console.log(
        '\n\n\n<- Product_Service, products by category ->',
        response_byCategoryProduct,
      );
      return response_byCategoryProduct;
    } catch (error) {
      throw new NotFoundException('Could not find products');
    }
  }

  //FUNCION obtener todos los productos por tag
  async find_by_tag(tag_name: string) {
    try {
      // Find the tag id
      const response_byNameTag = await this.tag_Service.find_byName(tag_name);

      // Find the products that has that tag
      const response_byTagProduct = await this.productModel
        .find({
          tags: {
            $in: response_byNameTag.map((a) => a._id),
          },
        })
        .populate('category')
        .populate('tags')
        .exec();

      console.log(
        '\n\n\n<- Product_Service, products by tag ->',
        response_byTagProduct,
      );
      return response_byTagProduct;
    } catch (error) {
      throw new NotFoundException('Could not find products');
    }
  }

  //FUNCION obtener todos los productos por nombre
  async find_by_name(name: string) {
    try {
      //buscar en base de datos
      const response_byName = await this.productModel
        .find({
          title: {
            $regex: name,
            $options: 'i',
          },
        })
        .populate('category')
        .populate('tags')
        .exec();

      console.log(
        '\n\n\n<- Product_Service, products by name ->',
        response_byName,
      );
      return response_byName;
    } catch (error) {
      throw new NotFoundException('Could not find products');
    }
  }

  //FUNCION obtener todos los productos por nombre o tag
  async find_by_tag_or_name(name_find: string) {
    try {
      // Find the tag id
      const response_byNameTag = await this.tag_Service.find_byName(name_find);

      // Find the products that has that tag
      const response_byTagProduct = await this.productModel
        .find({
          $or: [
            {
              title: {
                $regex: name_find,
                $options: 'i',
              },
            },
            {
              tags: {
                $in: response_byNameTag.map((a) => a._id),
              },
            },
          ],
        })
        .populate('category')
        .populate('tags')
        .exec();

      console.log(
        '\n\n\n<- Product_Service, products by tag or name ->',
        response_byTagProduct,
      );
      return response_byTagProduct;
    } catch (error) {
      throw new NotFoundException('Could not find products');
    }
  }

  //FUNCION obtener todos los productos nuevos
  async find_new_products() {
    try {
      //buscar en base de datos
      const response_newProducts = await this.productModel.find({
        new_item: true,
      });

      console.log(
        '\n\n\n<- Product_Service, new products ->',
        response_newProducts,
      );
      return response_newProducts;
    } catch (error) {
      throw new NotFoundException('Could not find products');
    }
  }

  // FUNCION borrar un producto de la bd
  async delete_product(product_id: string | number) {
    // buscar producto por id
    const response_delete = await this.productModel
      .deleteOne({ _id: product_id })
      .exec();

    console.log(
      '\n\n\n<- Product_Service, delete product response ->',
      response_delete,
    );

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }

    return response_delete;
  }
}
