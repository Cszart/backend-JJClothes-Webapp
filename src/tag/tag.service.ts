import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// tag imports
import { Tag_DTO } from './tag.model';

@Injectable()
export class Tag_Service {
  // Nombre Tag se definio en mongooseModule en tag.module.ts
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag_DTO>) {}

  // FUNCION Insertar tag
  async insert_tag(tag_info: Tag_DTO) {
    // Crear el tag
    const newTag = new this.tagModel(tag_info);

    // Guardar en bd
    const response_insert = await newTag.save();

    console.log('<- Tag_Service, inser Tag response ->', response_insert);
    return response_insert;
  }

  // FUNCION obtener todos los tags
  async find_all() {
    // buscar en bd
    const response_getAll = await this.tagModel.find().exec();

    console.log('<- Tag_Service, get all Tag response ->', response_getAll);
    return response_getAll;
  }

  // FUNCION obtener tag por id
  async find_byID(tag_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.tagModel.findById(tag_id);

      console.log('<- Tag_Service, get Tag by id response ->', response_byID);
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }
  }

  // FUNCION borrar un tag de la bd
  async delete_tag(tag_id: string | number) {
    // buscar tag por id
    const response_delete = await this.tagModel
      .deleteOne({ _id: tag_id })
      .exec();

    console.log('<- Tag_Service, delete Tag response ->', response_delete);

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find Tag');
    }

    return response_delete;
  }
}
