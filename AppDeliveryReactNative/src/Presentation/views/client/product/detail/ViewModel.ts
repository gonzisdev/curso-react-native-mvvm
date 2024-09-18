import { Product } from "../../../../../Domain/entities/Product"

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [product.image1, product.image2, product.image3]
  return {
    productImageList
  }
}

export default ClientProductDetailViewModel