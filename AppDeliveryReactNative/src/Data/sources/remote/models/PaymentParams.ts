import { Order } from "../../../../Domain/entities/Order";

export type PaymentParams = {
    token: string,
    issuer_id: string,
    payment_method_id: string,
    transaction_amount: number,
    installments: number,
    order: Order,
    payer: {
        email: string,
        identification: Identification
    }
}

type Identification = {
    number: string;
    type:   string;
}

