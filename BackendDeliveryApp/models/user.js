import { db } from "../config/config.js"
import bcrypt from "bcrypt"

export class User {
    static table = "users";

	constructor({id, email, name,lastname, phone, image, password, created_at, updated_at}) {
		this.id = id
		this.email = email
		this.name = name
        this.lastname = lastname
        this.phone = phone
        this.image = image
        this.password = password
        this.created_at = created_at
        this.updated_at = updated_at
	}

    static async create(user) {
		const hash = await bcrypt.hash(user.password, 10)
		try {
			const query = `
                INSERT INTO 
                    ${this.table}(
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
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error creating user:", error);
			throw error
		}
	}

	static async findById(id) {
		try {
			const query = `
				SELECT 
					U.id,
					U.email,
					U.name,
					U.lastname,
					U.phone,
					U.image,
					U.password,
					CONCAT(
						'[', 
						GROUP_CONCAT(
							CONCAT(
								'{"id": "', R.id, '", ',
								'"name": "', R.name, '", ',
								'"image": "', IFNULL(R.image, ''), '", ',
								'"route": "', IFNULL(R.route, ''), '"}'
							)
						SEPARATOR ', '), 
						']'
					) AS roles
				FROM 
					${this.table} AS U
				INNER JOIN
					user_has_roles AS UHR 
				ON 
					UHR.id_user = U.id
				INNER JOIN
					roles AS R 
				ON 
					UHR.id_rol = R.id
				WHERE 
					U.id = ?
				GROUP BY
					U.id
            `;
			const [rows] = await db.query(query, [id])
			if (rows.length > 0) {                
				return rows[0]
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching user by ID:", error)
			throw error
		}
	}

	static async findByEmail(email) {
		try {
			const query = `
				SELECT 
					U.id,
					U.email,
					U.name,
					U.lastname,
					U.phone,
					U.image,
					U.password,
					CONCAT(
						'[', 
						GROUP_CONCAT(
							CONCAT(
								'{"id": "', R.id, '", ',
								'"name": "', R.name, '", ',
								'"image": "', IFNULL(R.image, ''), '", ',
								'"route": "', IFNULL(R.route, ''), '"}'
							)
						SEPARATOR ', '), 
						']'
					) AS roles
				FROM 
					${this.table} AS U
				INNER JOIN
					user_has_roles AS UHR 
				ON 
					UHR.id_user = U.id
				INNER JOIN
					roles AS R 
				ON 
					UHR.id_rol = R.id
				WHERE 
					U.email = ?
				GROUP BY
					U.id
            `;
			const [rows] = await db.query(query, [email])
			if (rows.length > 0) {                
				return rows[0];
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching delivery men:", error);
			throw error
		}
	}

	static async findDeliveryMen() {
		try {
			const query = `
				SELECT 
					U.id,
					U.email,
					U.name,
					U.lastname,
					U.phone,
					U.image	
				FROM
					${this.table} AS U
				INNER JOIN
					user_has_roles AS UHR 
				ON 
					UHR.id_user = U.id
				INNER JOIN
					roles AS R 
				ON 
					UHR.id_rol = R.id
				WHERE
					R.id = 2
            `;
			const [rows] = await db.query(query)
			if (rows.length > 0) {                
				return rows;
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching user by email:", error);
			throw error
		}
	}

	static async update(user) {
		try {
			const query = `
                UPDATE 
                    ${this.table}
				SET
					name = ?,
					lastname = ?,
					phone = ?,
					updated_at = ?
				WHERE
					id = ?
            `;
			const result = await db.query(query, [
				user.name,
				user.lastname,
				user.phone,
                new Date(),
				user.id
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null;
			};
		} catch (error) {
			console.error("Error updating user:", error)
			throw error
		}
	}

	static async updateWithoutImage(user) {
		try {
			const query = `
                UPDATE 
                    ${this.table}
				SET
					name = ?,
					lastname = ?,
					phone = ?,
					image = ?,
					updated_at = ?
				WHERE
					id = ?
            `;
			const result = await db.query(query, [
				user.name,
				user.lastname,
				user.phone,
				user.image,
                new Date(),
				user.id
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null;
			};
		} catch (error) {
			console.error("Error updating user:", error)
			throw error
		}
	}

}