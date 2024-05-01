import Orders from "./orders.model";
import IOrder from "./orders.types";

export default class OrdersService {
  async getAll(page: number, ordersByPage: number) {
    return Orders.find()
      .skip(page * ordersByPage)
      .limit(ordersByPage);
  }

  async get(id: string) {
    return Orders.findOne({ _id: id });
  }

  async create(data: IOrder) {
    return new Orders(data).save();
  }

  async update(id: string, data: IOrder) {
    return Orders.findOneAndUpdate({ _id: id }, data);
  }

  async remove(id: string) {
    return Orders.findByIdAndDelete(id);
  }
}
