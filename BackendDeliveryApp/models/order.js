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

	static async findByStatus(status) {
		try {
			const query = `
				SELECT
					CONVERT(O.id, CHAR) AS id,
					CONVERT(O.id_client, CHAR) AS id_client,
					CONVERT(O.id_address, CHAR) AS id_address,
					CONVERT(O.id_delivery, CHAR) AS id_delivery,
					O.status,
					O.timestamp,
					JSON_OBJECT(
						'id', CONVERT(A.id, CHAR),
						'address', A.address,
						'neighborhood', A.neighborhood,
						'lat', A.lat,
						'lng', A.lng
					) AS address,
					JSON_OBJECT(
						'id', CONVERT(U.id, CHAR),
						'name', U.name,
						'lastname', U.lastname,
						'phone', U.phone,						
						'image', U.image
					) AS client,
					JSON_OBJECT(
						'id', CONVERT(U2.id, CHAR),
						'name', U2.name,
						'lastname', U2.lastname,
						'phone', U2.phone,						
						'image', U2.image
					) AS delivery,
					CONCAT(
						'[', GROUP_CONCAT(
							JSON_OBJECT(
								'id', CONVERT(P.id, CHAR),
								'name', P.name,
								'description', P.description,
								'image1', P.image1,
								'image2', P.image2,
								'image3', P.image3,
								'price', P.price,
								'quantity', OHP.quantity
							)
						), ']'
					) AS products
				FROM
					orders AS O
				INNER JOIN
					users AS U 
				ON 
					U.id = O.id_client
				LEFT JOIN
					users AS U2
				ON
					U2.id = O.id_delivery
				INNER JOIN
					address AS A 
				ON 
					A.id = O.id_address
				INNER JOIN
					order_has_products AS OHP
				ON
					OHP.id_order = O.id
				INNER JOIN
					products AS P
				ON
					P.id = OHP.id_product
				WHERE
					O.status = ?
				GROUP BY
					O.id
            `;
			const [rows] = await db.query(query, [status])
			if (rows.length > 0) {                
				return rows
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching order by status:", error);
			throw error
		}
	}

	static async findByDeliveryAndStatus(id_delivery, status) {
		try {
			const query = `
				SELECT
					CONVERT(O.id, CHAR) AS id,
					CONVERT(O.id_client, CHAR) AS id_client,
					CONVERT(O.id_address, CHAR) AS id_address,
					CONVERT(O.id_delivery, CHAR) AS id_delivery,
					O.status,
					O.timestamp,
					JSON_OBJECT(
						'id', CONVERT(A.id, CHAR),
						'address', A.address,
						'neighborhood', A.neighborhood,
						'lat', A.lat,
						'lng', A.lng
					) AS address,
					JSON_OBJECT(
						'id', CONVERT(U.id, CHAR),
						'name', U.name,
						'lastname', U.lastname,
						'phone', U.phone,						
						'image', U.image
					) AS client,
					JSON_OBJECT(
						'id', CONVERT(U2.id, CHAR),
						'name', U2.name,
						'lastname', U2.lastname,
						'phone', U2.phone,						
						'image', U2.image
					) AS delivery,
					CONCAT(
						'[', GROUP_CONCAT(
							JSON_OBJECT(
								'id', CONVERT(P.id, CHAR),
								'name', P.name,
								'description', P.description,
								'image1', P.image1,
								'image2', P.image2,
								'image3', P.image3,
								'price', P.price,
								'quantity', OHP.quantity
							)
						), ']'
					) AS products
				FROM
					orders AS O
				INNER JOIN
					users AS U 
				ON 
					U.id = O.id_client
				LEFT JOIN
					users AS U2
				ON
					U2.id = O.id_delivery
				INNER JOIN
					address AS A 
				ON 
					A.id = O.id_address
				INNER JOIN
					order_has_products AS OHP
				ON
					OHP.id_order = O.id
				INNER JOIN
					products AS P
				ON
					P.id = OHP.id_product
				WHERE
					O.id_delivery = ? 
				AND 
					O.status = ?
				GROUP BY
					O.id
            `;
			const [rows] = await db.query(query, [id_delivery, status])
			if (rows.length > 0) {                
				return rows
			} else {
				return null
			}
		} catch (error) {
			console.error("Error fetching order by status:", error);
			throw error
		}
	}

	static async updateToDispatched(id_order, id_delivery) {
		try {
			const query = `
				UPDATE
					${this.table}
				SET
					id_delivery = ?,
					status = ?,
					updated_at = ?
				WHERE
					id = ?
			`
			const result = await db.query(query, [
				id_delivery,
				'DESPACHADO',
				new Date(),
                id_order
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error updating order to dispatched:", error);
			throw error
		}
	}

	static async updateToOnTheWay(id_order, id_delivery) {
		try {
			const query = `
				UPDATE
					${this.table}
				SET
					id_delivery = ?,
					status = ?,
					updated_at = ?
				WHERE
					id = ?
			`
			const result = await db.query(query, [
				id_delivery,
				'EN CAMINO',
				new Date(),
                id_order
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error updating order to on the way:", error);
			throw error
		}
	}

	static async updateToDelivered(id_order, id_delivery) {
		try {
			const query = `
				UPDATE
					${this.table}
				SET
					id_delivery = ?,
					status = ?,
					updated_at = ?
				WHERE
					id = ?
			`
			const result = await db.query(query, [
				id_delivery,
				'ENTREGADO',
				new Date(),
                id_order
			])
			if (result[0].affectedRows > 0) {                
				return result[0].insertId
			} else {
				return null
			}
		} catch (error) {
			console.error("Error updating order to delivered:", error);
			throw error
		}
	}
}
