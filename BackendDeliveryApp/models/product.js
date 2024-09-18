import { db } from "../config/config.js"

export class Product {
    static table = "products"

	constructor({id, name, description, price, image1, image2, image3, id_category, created_at, updated_at}) {
		this.id = id
		this.name = name
        this.description = description
		this.price = price
        this.image1 = image1
		this.image2 = image2
		this.image3 = image3
		this.id_category = id_category 
        this.created_at = created_at
        this.updated_at = updated_at
	}

    static async create(product) {
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
                        name,
                        description,
						price,
                        image1,
						image2,
						image3,
						id_category,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				product.name,
				product.description,
				product.price,
				product.image1,
				product.image2,
				product.image3,
				product.id_category,
				new Date(),
                new Date()
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error creating product:", error)
			throw error
		}
	}

	static async updateWithoutImage(product) {
		try {
			const query = `
                UPDATE  
                    ${this.table}
				SET
				    name = ?,
                    description = ?,
					price = ?,
					id_category = ?,
                    updated_at = ?
				WHERE
					id = ?
            `;
			const result = await db.query(query, [
				product.name,
				product.description,
				product.price,
				product.id_category,
				new Date(),
				product.id
			])
			if (result[0].affectedRows > 0) {                
				return product.id
			} else {
				return null
			}
		} catch (error) {
			console.error("Error updating product:", error)
			throw error
		}
	}

	static async update(product) {
		try {
			const query = `
                UPDATE  
                    ${this.table}
				SET
					image1 = ?,
					image2 = ?,
					image3 = ?
				WHERE
					id = ?
            `;
			const result = await db.query(query, [
				product.image1,
				product.image2,
				product.image3,
				product.id
			])
			if (result[0].affectedRows > 0) {                
				return product.id
			} else {
				return null
			}
		} catch (error) {
			console.error("Error updating product:", error)
			throw error
		}
	}

	static async findByCategory(id_category) {
		try {
			const query = `
				SELECT
					P.id,
					P.name,
					P.description,
					P.price,
					P.image1,
					P.image2,
					P.image3,
					P.id_category
				FROM
					${this.table} as P
				WHERE
					P.id_category = ?
            `;
			const [rows]  = await db.query(query, [id_category])
			if (rows.length > 0) {                
				return rows
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching products by category:", error)
			throw error
		}
	}

	static async delete(id) {
		try {
			const query = `
				DELETE FROM
					${this.table}
				WHERE 
					id = ?
            `;
			const [result] = await db.query(query, [id])
			if (result.affectedRows > 0) {                
				return id
			} else {
				return null
			}
		} catch (error) {
			console.error("Error deleting product by ID:", error)
			throw error
		}
	}
}