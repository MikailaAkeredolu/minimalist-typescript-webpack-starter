import { CartManager } from './cartManager';
import { Item } from './item';

export class Cart implements CartManager {

    cart: any[] = [];

    addItemToCart(id: number, name: string, price: number, discount: number, count: number): void {
        for (let x in this.cart) {
            if (this.cart[x].name === name) {
                this.cart[x].count += count;
                return;
            }
        }
        let item = new Item(id, name, price, discount, count);
        this.cart.push(item);
        this.saveCart();
        this.displayTotal();
        this.displayQty();
    }

    saveCart():void {
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    }

    removeItemFromCart(name: string):void {
        for (let x = 0; x < this.cart.length; x++) {
            if (this.cart[x].name === name) {
                this.cart[x].count--;
                if (this.cart[x].count === 0) {
                    this.cart.splice(x, 1);
                }
                break;
            }
        }
        this.saveCart();
        this.displayTotal();
        this.displayQty();
    }

    clearCart():void {
        this.cart = [];
        this.saveCart();
        this.displayTotal();
        this.displayQty();
    }

    countCart():number {
        let totalCount:number = 0;
        for (let x in this.cart) {
            totalCount += this.cart[x].count;
        }
        return totalCount;
    }

    totalCart():number {
        let totalPrice:number = 0.0;
        for (let x in this.cart) {
            totalPrice += (this.cart[x].price * this.cart[x].count);
        }
        return totalPrice;
    }

    listCart() {
        let cartCopy = [];
        for (let x in this.cart) {
            let item = this.cart[x];
            let itemCopy: any = {};
            //itemCopy = {...item};
            for (let p in item) {
                itemCopy[p] = item[p];
            }
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    }


    /****DISPLAYS****/

    //Display | Show Items in Cart
    displayItemsInCart(id: number, name: string, price: number, discount: number, count: number): void {
        let output = name + " / Price $" + Number(price);
        let ul = document.getElementById("cartList");
        let li = document.createElement('li');
        li.innerHTML += "<a><button>Remove</button></a>"
        li.innerHTML += "<br>"
        li.appendChild(document.createTextNode(output));
        ul.appendChild(li);
        this.addItemToCart(id, name, price, 0, 1);
        this.displayQty();
        this.displayTotal();
        li.addEventListener('click', ()=> {
            this.displayQty();
            this.displayTotal();
            this.removeItemFromCart(name);
            li.remove();
        });
    }

    //Total Cost Span
    displayTotal(): void {
        let output = " Total Cost of Items in Cart: $ " + this.totalCart();
        let span = document.getElementById('sp');
        span.innerHTML = output;
    }

    //QTY - count Span
    displayQty(): void {
        let output = " Total Number of Items In Cart: " + this.countCart();
        let span = document.getElementById('qt');
        span.innerHTML = output;
    }

    //ClearCart Button
    displayClearCart():void {
        let clearButton = document.getElementById('clear-cart');
        clearButton.addEventListener('click', ()=> {
            this.clearCart();
            let content = document.getElementById('cartList');
            content.textContent = '';
        });
    }

}