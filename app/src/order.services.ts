import {
    delAsync,
    getAsync,
    setAsync,
  } from '../utils/storage'
  
  import Order from './order.interface'
  
  export default class OrderService {
  
    public async getById(id: number) {
      const rawOrders: string = await getAsync('orders')
      const orders: Order[] | [] = JSON.parse(rawOrders) || []
      const foundOrder: Order = orders.find((order) => order.id == Number(id))
      return foundOrder
    }
  
    public async getAll(){
      const raw: string = await getAsync('orders')
      const orders: Order[] = JSON.parse(raw) || []
      return orders
    }
  
    public async create(orderInformations :Order ){
      const rawOrders: string = await getAsync('orders')
      const orders: Order[] | [] = JSON.parse(rawOrders) || []
  
      const sortedOrders: Order[] | [] = orders.sort((previous: any, current: any) => {
        return current.id - previous.id
      })
      // tslint:disable-next-line: radix
      const lastId: number = sortedOrders.length > 0 ? Number(sortedOrders[0].id) : 0
  
      // Generate automatic data
      const orderToSave: Order = {
        ...orderInformations,
        id: lastId + 1,
        createdAt: new Date(),
      }
  
      const newOrders: Order[] = [...orders, orderToSave]
      await setAsync('orders', JSON.stringify(newOrders))
  
      return orderToSave
    }
  
    public async delete(id: number) {
      const rawOrders: string = await getAsync('orders')
      const orders: Order[] | [] = JSON.parse(rawOrders) || []
      // tslint:disable-next-line: triple-equals
      const orderToDelete: Order | null = orders.find((order) => order.id === Number(id))
  
      if (!orderToDelete) {
        return false
      }
  
      const newOrders: Order[] = orders.filter((order) => order.id !== orderToDelete.id)
      await setAsync('orders', JSON.stringify(newOrders))
      return orderToDelete
    }
  
    public async update(newValues : Order, id: number) {
      const rawOrders: string = await getAsync('orders')
      const orders: Order[] = JSON.parse(rawOrders) || []
      var orderToUpdate
  
      for(var i in orders) {
        if(orders[i].id === id) {
          orderToUpdate = orders[i]
        }
      }
  
      if(!orderToUpdate) {
        return false
      }
  
      const newOrders = {
        ...orderToUpdate,
        ...newValues,
      }
  
      for(var i in orders) {
        if(orders[i].id === id) {
          orders.splice(parseInt(i), 1)
          orders.push(newOrders)
          await delAsync('orders')
          await setAsync('orders', JSON.stringify(orders))
          return true
        }
      }
      return true
    }
  
  }