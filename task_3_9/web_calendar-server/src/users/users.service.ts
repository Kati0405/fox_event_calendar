import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async getUsers() {
    return await this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }


  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
