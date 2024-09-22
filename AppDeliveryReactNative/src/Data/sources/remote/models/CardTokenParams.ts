
export type CardTokenParams = {
    card_number:      string;
    expiration_year:  string;
    expiration_month: number;
    security_code:    string;
    cardholder:       Cardholder;
}

export type Cardholder = {
    name:           string;
    identification: Identification;
}

export type Identification = {
    number: string;
    type:   string;
}
