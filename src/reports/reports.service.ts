import { Injectable, NotFoundException } from '@nestjs/common';

import * as mongoose from 'mongoose';
//dto y esquemas
import { Product_DTO, Product_Schema } from 'src/product/product.model';

@Injectable()
export class ReportsService {}
