import {
  Request,
  Response,
  Router,
} from 'express'

import {
  delAsync,
  getAsync,
  setAsync,
} from '../utils/storage'

import OrderBuilder from './order.builder'
import Order from './order.interface'
import OrderService from './order.services'


export default class OrdersController {
  public path = '/orders'
  public pathId = '/orders/:id'
  public router = Router()
  public orderBuilder = new OrderBuilder()
  public orderService = new OrderService()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.get(this.pathId, this.getById)
    this.router.post(this.path, this.create)
    this.router.delete(this.path, this.deleteAll)
    this.router.delete(this.pathId, this.delete)
    this.router.put(this.pathId, this.update)
  }

  public getAll = async (request: Request, response: Response) => {
    let orders: Order[] = await this.orderService.getAll()
    for( let order of orders)
    {
      order = this.orderBuilder.falseAnomyne(order)
    }
    response.json(orders).status(201)
  }

  public getById = async (request: Request, response: Response) => {
    const id = request.params.id
    // tslint:disable-next-line: triple-equals
    let foundOrder: Order = await this.orderService.getById(Number(id))
    if (!foundOrder) {
      return response.sendStatus(404)
    }
    foundOrder = this.orderBuilder.falseAnomyne(foundOrder)
    response.json(foundOrder)
  }

  public create = async (request: Request, response: Response) => {
    let newOrder =  await this.orderService.create(request.body)
    let orderToPrint = this.orderBuilder.falseAnomyne(newOrder)
    response.status(201).json(orderToPrint)
  }

  public delete = async (request: Request, response: Response) => {
    let orderToDel =  await this.orderService.delete(Number(request.params.id))
    if( !orderToDel )
    {
      response.sendStatus(404).send("Delete fail")
    }
    response.sendStatus(204)
  }

  public deleteAll = async (request: Request, response: Response) => {
    await delAsync('orders')
    response.sendStatus(204)
  }

  public update= async (request: Request, response: Response) => {
    const updateInformations = request.body
    const id = request.params.id

    let updatedData: boolean =  await this.orderService.update(updateInformations, parseInt(id))
    if(!updatedData){
      response.status(404).send("Update fail")
    }
    response.status(200).json([])
  }

}