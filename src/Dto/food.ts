export class Food{
    id: number;
    caption: string;
    price: number;
    priceExclVat: string;

    constructor(id: number, caption: string, price: number){
        this.id = id;
        this.caption = caption;
        this.price = price;
        this.priceExclVat = (this.price * .923).toFixed(2);
    }
}