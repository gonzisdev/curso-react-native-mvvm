import { db } from "../config/config.js"

export class OrderHasProducts {
    static table = "order_has_products"

	constructor({ id_order, id_product, quantity, created_at, updated_at}) {
		this.id_order = id_order
        this.id_product = id_product
        this.quantity = quantity
		this.created_at = created_at
		this.updated_at = updated_at
	}

    static async create(id_order, quantity, id_product) {
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
                        id_order,
                        id_product,
						quantity,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				id_order,
				quantity,
				id_product,
				new Date(),
                new Date()
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error creating order:", error)
			throw error
		}
	}
}