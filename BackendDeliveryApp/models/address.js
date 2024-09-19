import { db } from "../config/config.js"

export class Address {
    static table = "address"

	constructor({id, address, neighborhood, lat, lng, created_at, updated_at, id_user}) {
		this.id = id
		this.address = address
        this.neighborhood = neighborhood
        this.lat = lat
        this.lng = lng
        this.created_at = created_at
        this.updated_at = updated_at
        this.id_user = id_user
	}

    static async create(address) {
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
                        address,
                        neighborhood,
                        lat,
                        lng,
                        created_at,
                        updated_at,
                        id_user
                    )
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				address.address,
				address.neighborhood,
				address.lat,
                address.lng,
				new Date(),
                new Date(),
                address.id_user
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error creating address:", error)
			throw error
		}
	}
}