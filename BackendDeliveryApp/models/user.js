import { db } from "../config/config.js"
import bcrypt from "bcrypt"

export class User {
    static table = "users";

	constructor({id, email, name,lastname, phone, image, password, created_at, updated_at}) {
		this.id = id;
		this.email = email;
		this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
	}

    static async create(user) {
		const hash = await bcrypt.hash(user.password, 10)
		
		try {
			const query = `
                INSERT INTO 
                    users(
                        email,
                        name,
                        lastname,
                        phone,
                        image,
                        password,
                        created_at,
                        updated_at
                    )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            `;
			const result = await db.query(query, [
				user.email,
				user.name,
				user.lastname,
				user.phone,
				user.image,
				hash,
				new Date(),
                new Date()
			]);
			if (result[0].affectedRows > 0) {                
				return result[0].insertId;
			} else {
				return null;
			};
		} catch (error) {
			console.error("Error fetching user by email:", error);
			throw error;
		};
	};
}