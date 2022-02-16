import { Injectable, NotFoundException } from '@nestjs/common';

import * as mongoose from 'mongoose';
//dto y esquemas
import {
  Product_DTO,
  Product_Schema,
} from 'src/product/product.model';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product_DTO>,
  ) {}
  //obtener productos mas vendidos por categorias
  async CategoryReport(name:string, date:string) {
    const new_products= await this.productModel.find({:true});
  }

}
