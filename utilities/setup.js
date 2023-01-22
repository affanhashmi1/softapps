const connection = require('./connection')
const constants = require('./constants')
const User = require('../models/User.model')
const Product = require('../models/Product.model')
const Deal = require('../models/Deal.model')
const ProductDeal = require('../models/ProductDeal.model')
const thumbnail = require('./thumbnail')

const createUser = async (connection, transaction) => {
  try {
    const password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD('waqas@123')
    const user = await User(connection)
    const response = await user.create({
      id: 1,
      name: 'Waqas',
      username: 'waqas',
      password: password
    }, {
      transaction
    })

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const createProducts = async (connection, transaction) => {
  try {
    const product = await Product(connection)
    const response = await product.bulkCreate([
      { id: 1, title: 'Phonics Handwash 500ML (Purple)', description: 'To be added', quantity: 2, price: 220.00, thumbnail, user_id: 1 },
      { id: 2, title: 'Phonics BodyWash 500ML', description: 'To be added', quantity: 2, price: 250.00, thumbnail, user_id: 1 },
      { id: 3, title: 'Phonics White Perfume Phenyl 500ML Concentrated', description: 'To be added', quantity: 2, price: 200.00, thumbnail, user_id: 1 },
      { id: 4, title: 'Phonics Handwash 500ML (Black)', description: 'To be added', quantity: 2, price: 220.00, thumbnail, user_id: 1 },
      { id: 5, title: 'Phonics Color Bleach 600ML', description: 'To be added', quantity: 2, price: 200.00, thumbnail, user_id: 1 },
      { id: 6, title: 'Bodywash', description: 'To be added', quantity: 2, price: 250.00, thumbnail, user_id: 1 },
      { id: 7, title: 'Phonics Detergent Powder 1KG', description: 'To be added', quantity: 2, price: 280.00, thumbnail, user_id: 1 },
      { id: 8, title: 'Phonics Thick Gel Bleach 500ML', description: 'To be added', quantity: 2, price: 220.00, thumbnail, user_id: 1 },
      { id: 9, title: 'Phonics Dishwashing Liquid 500ML', description: 'To be added', quantity: 2, price: 160.00, thumbnail, user_id: 1 },
      { id: 10, title: 'Phonics Degreaser', description: 'To be added', quantity: 2, price: 270.00, thumbnail, user_id: 1 }
    ], {
      transaction
    })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const createDeals = async (connection, transaction) => {
  try {
    const deal = await Deal(connection)
    const response = await deal.bulkCreate([
      { id: 1, title: 'Phonics Deal 01', description: 'To be added', thumbnail, discount: 7.50 },
      { id: 2, title: 'Phonics Deal 02', description: 'To be added', thumbnail, discount: 5.75 },
      { id: 3, title: 'Phonics Deal 04', description: 'To be added', thumbnail, discount: 4.86 },
      { id: 4, title: 'Phonics Deal 05', description: 'To be added', thumbnail, discount: 5.75 },
      { id: 5, title: 'Mega Saving Deal', description: 'To be added', thumbnail, discount: 3.47 }
    ], {
      transaction
    })

    return {
      status: true,
      deals: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const createProductDeals = async (connection, transaction) => {
  try {
    const productDeal = await ProductDeal(connection)
    const response = await productDeal.bulkCreate([
      { id: 1, quantity: 1, product_id: 7, deal_id: 1 },
      { id: 2, quantity: 1, product_id: 1, deal_id: 1 },
      { id: 3, quantity: 1, product_id: 9, deal_id: 1 },
      { id: 4, quantity: 1, product_id: 3, deal_id: 1 },
      { id: 5, quantity: 1, product_id: 8, deal_id: 1 },

      { id: 6, quantity: 1, product_id: 7, deal_id: 2 },
      { id: 7, quantity: 1, product_id: 5, deal_id: 2 },
      { id: 8, quantity: 1, product_id: 9, deal_id: 2 },
      { id: 9, quantity: 1, product_id: 3, deal_id: 2 },
      { id: 10, quantity: 1, product_id: 8, deal_id: 2 },

      { id: 11, quantity: 1, product_id: 6, deal_id: 3 },
      { id: 12, quantity: 1, product_id: 4, deal_id: 3 },
      { id: 13, quantity: 1, product_id: 9, deal_id: 3 },
      { id: 14, quantity: 1, product_id: 5, deal_id: 3 },
      { id: 15, quantity: 1, product_id: 8, deal_id: 3 },

      { id: 16, quantity: 2, product_id: 8, deal_id: 4 },
      { id: 17, quantity: 2, product_id: 3, deal_id: 4 },
      { id: 18, quantity: 1, product_id: 1, deal_id: 4 },

      { id: 21, quantity: 2, product_id: 7, deal_id: 5 },
      { id: 22, quantity: 1, product_id: 9, deal_id: 5 },
      { id: 23, quantity: 2, product_id: 3, deal_id: 5 },
      { id: 24, quantity: 2, product_id: 8, deal_id: 5 },
      { id: 25, quantity: 1, product_id: 5, deal_id: 5 }
    ], {
      transaction
    })

    return {
      status: true,
      product_deals: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const createZones = async () => {
  try {
    const zone = await Zone(connection)
    const response = await zone.bulkCreate([
      { id: 1, zone: '' },
      { id: 2, zone: '' },
      { id: 3, zone: '' },
      { id: 4, zone: '' },
      { id: 5, zone: '' },
      { id: 6, zone: '' },
      { id: 7, zone: '' },
      { id: 8, zone: '' },
      { id: 9, zone: '' },
      { id: 10, zone: '' }
    ])

    return {
      status: true,
      zones: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const setup = async (connection) => {
  const transaction = await connection.transaction()

  try {
    const userResponse = await createUser(connection, transaction)
    if (!userResponse.status) throw new Error(userResponse.message)

    const productResponse = await createProducts(connection, transaction)
    if (!productResponse.status) throw new Error(productResponse.message)

    const dealResponse = await createDeals(connection, transaction)
    if (!dealResponse.status) throw new Error(dealResponse.message)

    const productDealResponse = await createProductDeals(connection, transaction)
    if (!productDealResponse.status) throw new Error(productDealResponse.message)

    await transaction.commit()

    return 'Setup successful'
  } catch (error) {
    await transaction.rollback()

    throw error
  }
}

setup(connection)
  .then(response => {
    console.log(response)
    process.exit(0)
  })
  .catch(error => {
    console.log(error)
    process.exit(0)
  })