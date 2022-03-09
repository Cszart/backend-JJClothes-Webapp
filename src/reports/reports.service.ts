import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import { Order_DTO } from 'src/order/order.model';
import { Product_DTO } from 'src/product/product.model';
import { User_DTO } from 'src/user/user.model';
import { Category_DTO } from 'src/category/category.model';
import { Tag_DTO } from 'src/tag/tag.model';

@Injectable()
export class Report_Service {
  // Utils
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order_DTO>,
    @InjectModel('User')
    private readonly userModel: Model<User_DTO>,
    @InjectModel('Product') private readonly productModel: Model<Product_DTO>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category_DTO>,
    @InjectModel('Tag') private readonly tagModel: Model<Tag_DTO>,
  ) {}

  // FUNCION clientes por cantidad de solicitudes
  async get_orders_by_users(startDate: string, endDate: string) {
    try {
      // Obtener las el nro de ordener por usuario
      const order_filtered = await this.orderModel.aggregate([
        {
          $match: {
            purchase_date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: '$user' as any,
            count: { $count: {} },
          },
        },
      ]);

      await this.userModel.populate(order_filtered, { path: '_id' });

      console.log(
        '\n\n\n\n<- Report service, get orders by users response ->',
        order_filtered,
      );

      // Format the output
      const formated_output = [];
      order_filtered.map((order_item) =>
        formated_output.push({ user: order_item._id, count: order_item.count }),
      );

      return formated_output;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION categorias por monto de facturacion
  async get_categories_by_date(startDate: string, endDate: string) {
    try {
      // Obtener las el nro de ordener por usuario
      const order_filtered = await this.orderModel.aggregate([
        {
          $match: {
            purchase_date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$purchase_date',
              },
            } as any,
            count: { $count: {} },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      console.log(
        '\n\n\n\n<- Report service, get orders by date ->',
        order_filtered,
      );

      // Format the output
      const formated_output = [];
      order_filtered.map((order_item) =>
        formated_output.push({
          purchase_date: order_item._id,
          count: order_item.count,
        }),
      );

      return formated_output;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION categorias por monto de facturacion
  async get_categories_by_amount(startDate: string, endDate: string) {
    try {
      console.log('\n\n\n\n', startDate, endDate);
      const response_categoryBy_amount = [];

      // Obtener todas las categorias
      const response_all_categories = await this.categoryModel.find().exec();

      // Obtener todas las ordenes
      const response_all_orders = await this.orderModel
        .find()
        .populate('items.product')
        .exec();

      // Por cada categoria se revisan las ordenes y se suman los productos
      response_all_categories.forEach((category_item) => {
        const category_info = {
          category_id: category_item._id,
          category_name: category_item.name,
          category_amount: 0,
          category_items: 0,
        };

        // Por cada orden
        response_all_orders.forEach((order_item) => {
          // Se ven los productos de la orden
          order_item.items.forEach((product_item: any) => {
            // Si el producto pertenece a la categoria
            const category_item_string = category_item._id.toString();
            const product_item_id_string =
              product_item.product.category.toString();

            if (category_item_string == product_item_id_string) {
              category_info.category_amount +=
                (product_item.product.price - product_item.product.discount) *
                product_item.quantity;

              category_info.category_items += 1;
            }
          });
        });

        response_categoryBy_amount.push(category_info);
      });

      console.log(
        '<- Response service, get category by amount response ->',
        response_categoryBy_amount.sort(
          (a, b) => b.category_amount - a.category_amount,
        ),
      );
      return response_categoryBy_amount;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION obtener top ten de productos por categoria
  async get_topTen_products(startDate: string, endDate: string) {
    try {
      console.log('\n\n', startDate, endDate);
      const response_topTen_category = [];

      // Obtener las categorias
      const response_all_categories = await this.categoryModel.find().exec();

      console.log(
        '\n\n\n\n<- Report service, all categories response ->',
        response_all_categories,
      );

      // Por cada categoria
      await Promise.all(
        response_all_categories.map(async (item): Promise<void> => {
          // Obtener los productos mas vendidos por categoria
          const response_all_products = await this.productModel
            .find({ category: item._id })
            .sort({ stock: 'asc' })
            .limit(10)
            .populate('category')
            .populate('tags')
            .exec();

          console.log(
            '\n\n\n\n<- Report service, top ten products category ->',
            item.name,
            response_all_products,
          );

          // Append to response
          response_topTen_category.push({
            category_name: item.name,
            category_products: response_all_products,
          });
        }),
      );

      console.log(
        '\n\n\n\n<- Report service, formated response ->',
        response_topTen_category,
      );

      return response_topTen_category;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION obtener bottom ten de los productos por categoria
  async get_bottomTen_products(startDate: string, endDate: string) {
    try {
      console.log('\n\n', startDate, endDate);
      const response_bottomTen_category = [];

      // Obtener las categorias
      const response_all_categories = await this.categoryModel.find().exec();

      console.log(
        '\n\n\n\n<- Report service, all categories response ->',
        response_all_categories,
      );

      // Por cada categoria
      await Promise.all(
        response_all_categories.map(async (item): Promise<void> => {
          // Obtener los productos mas vendidos por categoria
          const response_all_products = await this.productModel
            .find({ category: item._id })
            .sort({ stock: 'desc' })
            .limit(10)
            .populate('category')
            .populate('tags')
            .exec();

          console.log(
            '\n\n\n\n<- Report service, bottom ten products category ->',
            item.name,
            response_all_products,
          );

          // Append to response
          response_bottomTen_category.push({
            category_name: item.name,
            category_products: response_all_products,
          });
        }),
      );

      console.log(
        '\n\n\n\n<- Report service, formated response ->',
        response_bottomTen_category,
      );

      return response_bottomTen_category;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION obtener top ten de productos por tag
  async get_topTen_tag_products(startDate: string, endDate: string) {
    try {
      console.log('\n\n', startDate, endDate);
      const response_topTen_tag = [];

      // Obtener las tags
      const response_all_tags = await this.tagModel.find().exec();

      console.log(
        '\n\n\n\n<- Report service, all tags response ->',
        response_all_tags,
      );

      // Por cada tag
      await Promise.all(
        response_all_tags.map(async (item): Promise<void> => {
          // Obtener los productos mas vendidos por categoria
          const response_all_products = await this.productModel
            .find({
              tags: {
                $in: [item._id],
              },
            })
            .sort({ stock: 'asc' })
            .limit(10)
            .populate('category')
            .populate('tags')
            .exec();

          console.log(
            '\n\n\n\n<- Report service, top ten products tag ->',
            item.name,
            response_all_products,
          );

          // Append to response
          response_topTen_tag.push({
            category_name: item.name,
            category_products: response_all_products,
          });
        }),
      );

      console.log(
        '\n\n\n\n<- Report service, formated response ->',
        response_topTen_tag,
      );

      return response_topTen_tag;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }

  // FUNCION obtener bottom ten de productos por tag
  async get_bottomTen_tag_products(startDate: string, endDate: string) {
    try {
      console.log('\n\n', startDate, endDate);
      const response_bottomTen_tag = [];

      // Obtener las tags
      const response_all_tags = await this.tagModel.find().exec();

      console.log(
        '\n\n\n\n<- Report service, all tags response ->',
        response_all_tags,
      );

      // Por cada tag
      await Promise.all(
        response_all_tags.map(async (item): Promise<void> => {
          // Obtener los productos mas vendidos por categoria
          const response_all_products = await this.productModel
            .find({
              tags: {
                $in: [item._id],
              },
            })
            .sort({ stock: 'desc' })
            .limit(10)
            .populate('category')
            .populate('tags')
            .exec();

          console.log(
            '\n\n\n\n<- Report service, bottom ten products tag ->',
            item.name,
            response_all_products,
          );

          // Append to response
          response_bottomTen_tag.push({
            category_name: item.name,
            category_products: response_all_products,
          });
        }),
      );

      console.log(
        '\n\n\n\n<- Report service, formated response ->',
        response_bottomTen_tag,
      );

      return response_bottomTen_tag;
    } catch (error) {
      // no encontro nada en la bd
      throw new NotFoundException('Could not find anything');
    }
  }
}
