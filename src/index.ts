
import { Item } from './item';
import $ from 'jquery';
import { Cart } from './cart';

import { Inventory } from './inventory';

const productList: Item[] = [
    new Item(1, "Adidas NMD", 130.00, 0, 1),
    new Item(2, "Adidas Yeezy Boost 350", 300.00, .10, 1),
    new Item(3, "Vans Old Skool", 60.00, 0, 1),
    new Item(4, "Adidas Superstar", 80.00, .10, 1),
    new Item(5, "Converse Chuck Taylor All Star", 50.00, 0, 1),
    new Item(6, "Adidas Stan Smith", 60.00, 0, 1),
    new Item(7, "Nike Air Max 90", 110.00, .10, 1),
    new Item(8, "Vans Authentic", 50.00, 0, 1),
    new Item(9, "Adidas Ultra Boost", 180.00, .10, 1),
    new Item(10, "Vans Authentic", 50.00, 0, 1)
]

const cart: Cart = new Cart();
const productContainer: HTMLElement = document.getElementById("prodContainer");

const inventory: Inventory = new Inventory(productContainer);
inventory.setModel(productList);
inventory.registerEventListener(function (item: Item) {
    cart.displayQty();
    cart.displayTotal();
    cart.displayItemsInCart(item.id, item.name, item.price, item.discount, item.count);
});

document.getElementById("searchButton").addEventListener('click', ()=>{
    const searchInput:HTMLInputElement = <HTMLInputElement>document.getElementById("searchInput");
    inventory.searchFilter(searchInput.value);
});

inventory.renderProducts();

cart.displayClearCart();






















// import { Item } from './item';
// import $ from 'jquery';

// const productList = [
//     {id: 1, name: "Adidas NMD", price: 130.00, count: 1},
//     {id: 2, name: "Adidas Yeezy Boost 350", price: 300.00, discount: .10, count: 1},
//     {id: 3, name: "Vans Old Skool", price: 60.00, count: 1},
//     {id: 4, name: "Adidas Superstar", price: 80.00, discount: .10, count: 1},
//     {id: 5, name: "Converse Chuck Taylor All Star", price: 50.00, count: 1},
//     {id: 6, name: "Adidas Stan Smith", price: 60.00, count: 1},
//     {id: 7, name: "Nike Air Max 90", price: 110.00, discount: .10, count: 1},
//     {id: 8, name: "Vans Authentic", price: 50.00, count: 1},
//     {id: 9, name: "Adidas Ultra Boost", price: 180.00, discount: .10, count: 1},
//     {id: 10, name: "Vans Authentic", price: 50.00, count: 1}
// ]

// const productContainer:HTMLElement = document.getElementById("prodContainer");

// function renderProducts(){
//     productList.forEach(function(value, index, arr){
//         productContainer.appendChild(listItemFactory(value["id"], value["name"], value["price"], value["discount"], value["count"]));
//     });
// }

// function listItemFactory(id:number, name:string, price:number, discount:number = 0, count:number = 1){
//     let li:HTMLLIElement = document.createElement("li");
//     li.setAttribute("id", String(id));
//     li.innerHTML  = name + "<br>Price: $" + price.toFixed(2);

//     if(discount > 0)
//         li.innerHTML += "<br>Now: $" + (price - (price * discount)).toFixed(2) + " save $" + (price * discount).toFixed(2);
//         li.innerHTML += "<br>" 
//         li.innerHTML += "<a><button>ADD</button></a>"
//         li.addEventListener('click',function(){
//             displayQty();
//             displayTotal();
//             displayItemsInCart(id, name, price, discount, count);
//         });
//     return li;
// }


// renderProducts();
// displayClearCart();

// /****DISPLAYS****/

// //Display | Show Items in Cart
// function displayItemsInCart(id:number, name:string, price:number,discount:number, count:number):void{
//     let output = name + " / Price $" + Number(price);
//     let ul = document.getElementById("cartList");
//     let li = document.createElement('li');
//     li.innerHTML += "<a><button>Remove</button></a>"
//     li.innerHTML += "<br>" 
//     li.appendChild(document.createTextNode(output)); 
//     ul.appendChild(li);
//     addItemToCart(id, name, price, 0, 1);
//     displayQty();
//     displayTotal();
//     li.addEventListener('click',function(){
//         displayQty();
//         displayTotal();
//         removeItemFromCart(name);
//         li.remove();
//     });
// }

// //Total Cost Span
// function displayTotal():void{
//     let output = " Total Cost of Items in Cart: $ " + totalCart();
//     let span = document.getElementById('sp');
//     span.innerHTML = output;
// }

// //QTY - count Span
// function displayQty():void{
//     let output = " Total Number of Items In Cart: " + countCart();
//     let span = document.getElementById('qt');
//     span.innerHTML = output;
// }

// //ClearCart Button
// function displayClearCart(){
//     let clearButton = document.getElementById('clear-cart');
//         clearButton.addEventListener('click', function(){
//             clearCart();
//             let content = document.getElementById('cartList');
//             content.textContent = '';
//         });
// }

// //Shopping Cart Functionalities | Logic

//     let cart: any[] = [];

//     function addItemToCart(id: number, name:string, price:number,discount: number, count:number){
//         for(let x in cart){
//             if(cart[x].name === name){ 
//                     cart[x].count += count;
//                     return;
//             }
//         }
//         let item = new Item(id, name, price, discount, count);
//         cart.push(item);
//         saveCart();
//         displayTotal();
//         displayQty(); 
//     }
    
//     function saveCart(): void{
//         localStorage.setItem("shoppingCart", JSON.stringify(cart));
//     }
    
//     function removeItemFromCart(name: string){
//         for(let x = 0; x < cart.length; x++){
//             if(cart[x].name === name){
//                 cart[x].count --; 
//                 if(cart[x].count === 0){ 
//                     //removeItemFromCartAll(name);
//                     cart.splice(x,1); 
//                 }
//             break;
//             }
//         }
//         saveCart();
//         displayTotal();
//         displayQty();
//     }
    
//     function clearCart(){
//         cart = [];
//         saveCart();
//         displayTotal();
//         displayQty();
//     }

//     function countCart():number{
//         let totalCount: number = 0;
//         for(let x in cart){
//             totalCount += cart[x].count; 
//         }
//         return totalCount;
//     }

//     function totalCart():number{
//         let totalPrice: number = 0.0;
//         for(let x in cart){
//             totalPrice += (cart[x].price * cart[x].count);
//         }
//         return totalPrice;
//     }
    
//     function listCart(){
//         let cartCopy = [];
//         for(let x in cart){
//             let item = cart[x];
//             let itemCopy:any = {};  
//         //itemCopy = {...item};
//             for(var p in item){
//             itemCopy[p] = item[p];
//             }
//             cartCopy.push(itemCopy);
//         }
//         return cartCopy;
//     }

//     //Example: If we need to talk about jQuery

//     /****JQUERY****/
//     //Jquery Clear Cart
// // $("#clear-cart").click(function(event){
// //     clearCart();
// //     var content = document.getElementById('cartList');
// //     content.textContent = '';
// // });


// //Notes: Had problems with implementing the search with my TypeScript code!!!!