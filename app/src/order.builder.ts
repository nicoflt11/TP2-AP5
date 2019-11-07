import Order from './order.interface'

class OrderBuilder{
    constructor(){
    }

    falseAnomyne(order: Order){
      order.contact.firstname = "firstname"
      order.contact.phone = "0000000000"
      order.contact.mail = "XXXXXXXX@XXX.XXX"
      order.contact.lastname = "lastname"

      order.contact.billingAddress.postalCode = "00000"
      order.contact.billingAddress.city = "00000"
      order.contact.billingAddress.addressLine1 = "00000"
      order.contact.billingAddress.addressLine2 = "00000"

      order.contact.deliveryAddress.postalCode = "00000"
      order.contact.deliveryAddress.city = "00000"
      order.contact.deliveryAddress.addressLine1 = "00000"
      order.contact.deliveryAddress.addressLine2 = "00000"

      order.contact.billingAddress.postalCode = "00000"
      order.contact.billingAddress.city = "XXXX"
      order.contact.billingAddress.addressLine1 = "XXXX XXXX XXXX"
      order.contact.billingAddress.addressLine2 = "XXXX XXXX XXXX"

      order.carrier.contact.firstname = "firstname"
      order.carrier.contact.lastname = "lastname"
      order.carrier.contact.phone = "0000000000"
      order.carrier.contact.mail = "XXXXXXXX@XXX.XXX"

      order.carrier.contact.headOfficeAddress.postalCode = "00000"
      order.carrier.contact.headOfficeAddress.city = "XXXX"
      order.carrier.contact.headOfficeAddress.addressLine1 = "XXXX XXXX XXXX"
      order.carrier.contact.headOfficeAddress.addressLine2 = "XXXX XXXX XXXX"

      return order
    }
}

export default OrderBuilder;