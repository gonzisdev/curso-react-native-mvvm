import { db } from "../config/config.js"

export class Order {
    static table = "orders"

	constructor({id, id_client, id_delivery, id_address, lat, lng, status, timestamp, created_at, updated_at}) {
		this.id = id
		this.id_client = id_client
        this.id_delivery = id_delivery
        this.id_address = id_address
        this.lat = lat
        this.lng = lng
		this.status = status
		this.timestamp = timestamp
		this.created_at = created_at
		this.updated_at = updated_at
	}

    static async create(order) {
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
                        id_client,
                        id_address,
                        status,
						timestamp,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				order.id_client,
				order.id_address,
				'PAGADO',
				Date.now(),
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