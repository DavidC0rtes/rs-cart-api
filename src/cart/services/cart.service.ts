import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { DAOService } from 'src/dao/dao.service';

@Injectable()
export class CartService {
  constructor(private readonly daoService: DAOService) {}

  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string) {
    const response:Array<any> = await this.daoService.findCartByUserId(userId)

    console.log(response)
    return {
      id: response[0]['id'],
      items: response.map(row => row['product_id'])
    }
  }

  async createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    await this.daoService.createCart(userId)

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  async removeByUserId(userId): Promise<void> {
    await this.daoService.deleteCartByUserId(userId)
  }

}
