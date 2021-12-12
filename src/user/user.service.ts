import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User_DTO } from './user.model';

@Injectable()
export class User_Service {
  // Nombre User se definio en mongooseModule en user.module.ts
  constructor(
    @InjectModel('User') private readonly userModel: Model<User_DTO>,
  ) {}

  // FUNCION Insertar usuario
  async insert_user(user_info: User_DTO) {
    // Crear el usuario
    const newUser = new this.userModel(user_info);

    // Guardar en bd
    const response_insert = await newUser.save();

    console.log('<- User_Service, inser user response ->', response_insert);
    return response_insert;
  }

  // FUNCION obtener todos los usuarios
  async find_all() {
    // buscar en bd
    const response_getAll = await this.userModel.find().exec();

    console.log('<- User_Service, get all user response ->', response_getAll);
    return response_getAll;
  }

  // FUNCION obtener usuario por id
  async find_byID(user_id: string | number) {
    try {
      //buscar en bd
      const response_byID = await this.userModel.findById(user_id);

      console.log('<- User_Service, get user by id response ->', response_byID);
      return response_byID;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }
  }

  // FUNCION actualizar info de usuario
  async update_user(user_id: string | number, user_data: User_DTO) {
    // buscar usuario por id
    const response_user = await this.find_byID(user_id);

    if (user_data.firstname) {
      response_user.firstname = user_data.firstname;
    }

    if (user_data.lastname) {
      response_user.lastname = user_data.lastname;
    }

    if (user_data.username) {
      response_user.username = user_data.username;
    }

    if (user_data.password) {
      response_user.password = user_data.password;
    }

    console.log('<- User_Service, update user response ->', response_user);
    response_user.save();
  }

  // FUNCION borrar un usuario de la bd
  async delete_user(user_id: string | number) {
    // buscar usuario por id
    const response_delete = await this.userModel
      .deleteOne({ _id: user_id })
      .exec();

    console.log('<- User_Service, delete user response ->', response_delete);

    if (response_delete.deletedCount === 0) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find product');
    }

    return response_delete;
  }
}
