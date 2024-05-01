import Products from "./products.model.ts";
import IProduct from "./products.types.ts";

export default class ProductsService {
  async getAll(page: number, productsByPage: number) {
    return Products.find()
      .skip(page * productsByPage)
      .limit(productsByPage);
  }

  async get(id: string) {
    return Products.findOne({ _id: id });
  }

  async create(data: IProduct) {
    return new Products(data).save();
  }

  async update(id: string, data: IProduct) {
    return Products.findOneAndUpdate({ _id: id }, data);
  }

  async remove(id: string) {
    return Products.findByIdAndDelete(id);
  }
}
