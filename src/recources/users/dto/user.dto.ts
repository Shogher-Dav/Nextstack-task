import { UserDocument } from "../user.model";

export default class UserDto {
  id;
  email;

  constructor(model: UserDocument | null) {
    this.email = model?.email;
    this.id = model?._id;
  }
}
