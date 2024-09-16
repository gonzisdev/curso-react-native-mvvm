import { db } from "../config/config.js"

export class Category {
    static table = "categories"

	constructor({id, name, description, image, created_at, updated_at}) {
		this.id = id
		this.name = name
        this.description = description
        this.image = image
        this.created_at = created_at
        this.updated_at = updated_at
	}

    static async create(category) {
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
                        name,
                        description,
                        image,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				category.name,
				category.description,
				category.image,
				new Date(),
                new Date()
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error creating category:", error)
			throw error
		}
	}

	static async getAll() {
		try {
			const query = `
                SELECT 
					id,
					name,
					description,
					image
				FROM
					${this.table}
				ORDER BY
					name
            `;
			const [rows] = await db.query(query)
			if (rows.length > 0) {                
				return rows;
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching all categories:", error)
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
			console.error("Error deleting category by ID:", error)
			throw error
		}
	}
}