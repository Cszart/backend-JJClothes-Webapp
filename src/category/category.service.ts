import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// category imports
import { Category_DTO } from './category.model';

@Injectable()
export class Category_Service {
  // Nombre Category se definio en mongooseModule en category.module.ts
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category_DTO>,
  ) {}

  // FUNCION Insertar category
  async insert_category(category_info: Category_DTO) {
    // Crear el category
    const newCategory = new this.categoryModel(category_info);

    // Guardar en bd
    const response_insert = await newCategory.save();

    console.log(
      '<- Category_Service, inser Category response ->',
      response_insert,
    );
    return response_insert;
  }

  // FUNCION obtener todos los categorys
  async find_all() {
    // buscar en bd
    const response_getAll = await this.categoryModel.find().exec();

    console.log(
      '<- Category_Service, get all Category response ->',
      response_getAll,
    );
    return response_getAll;
  }

  // FUNCION obtener category por id
  async find_byID(category_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.categoryModel.findById(category_id);

      console.log(
        '<- Category_Service, get Category by id response ->',
        response_byID,
      );
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }
  }

  // FUNCION borrar un category de la bd
  async delete_category(category_id: string | number) {
    // buscar category por id
    const response_delete = await this.categoryModel
      .deleteOne({ _id: category_id })
      .exec();

    console.log(
      '<- Category_Service, delete Category response ->',
      response_delete,
    );

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find Category');
    }

    return response_delete;
  }
}
