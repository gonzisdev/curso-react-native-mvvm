import { db } from "../config/config.js"

export class Rol {
    static table = "roles";

	constructor({id, name, image, route, created_at, updated_at}) {
		this.id = id;
		this.name = name;
        this.image = image;
        this.route = route;
        this.created_at = created_at;
        this.updated_at = updated_at;
	}

    static async create(id_user, id_rol) {
		try {
			const query = `
                INSERT INTO 
                    user_has_roles(
                        id_user,
                        id_rol,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				id_user,
				id_rol,
				new Date(),
                new Date()
			]);
			if (result[0].affectedRows > 0) {                
				return result[0].insertId;
			} else {
				return null;
			};
		} catch (error) {
			console.error("Error creating rol:", error);
			throw error;
		};
	};
}