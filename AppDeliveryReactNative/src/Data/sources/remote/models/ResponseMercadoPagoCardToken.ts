
export type ResponseMercadoPagoCardToken = {
    id:                   string;
    public_key:           string;
    first_six_digits:     string;
    expiration_month:     number;
    expiration_year:      number;
    last_four_digits:     string;
    cardholder:           Cardholder;
    status:               string;
    date_created:         string;
    date_last_updated:    string;
    date_due:             string;
    luhn_validation:      boolean;
    live_mode:            boolean;
    require_esc:          boolean;
    card_number_length:   number;
    security_code_length: number;
}

export type Cardholder = {
    identification: Identification;
    name:           string;
}

export type Identification = {
    number: string;
    type:   string;
}
