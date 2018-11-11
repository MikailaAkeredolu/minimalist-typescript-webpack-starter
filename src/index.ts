import { Item } from './item';
import $ from 'jquery';

const productList = [
	{id: 1, name: "Adidas NMD", price: 130.00, count: 1},
	{id: 2, name: "Adidas Yeezy Boost 350", price: 300.00, discount: .10, count: 1},
	{id: 3, name: "Vans Old Skool", price: 60.00, count: 1},
	{id: 4, name: "Adidas Superstar", price: 80.00, discount: .10, count: 1},
	{id: 5, name: "Converse Chuck Taylor All Star", price: 50.00, count: 1},
	{id: 6, name: "Adidas Stan Smith", price: 60.00, count: 1},
	{id: 7, name: "Nike Air Max 90", price: 110.00, discount: .10, count: 1},
	{id: 8, name: "Vans Authentic", price: 50.00, count: 1},
	{id: 9, name: "Adidas Ultra Boost", price: 180.00, discount: .10, count: 1},
	{id: 10, name: "Vans Authentic", price: 50.00, count: 1}
]

 const productContainer:HTMLElement = document.getElementById("prodContainer");
// const searchInput:HTMLInputElement = <HTMLInputElement>document.getElementById("searchInput");

function renderProducts(){
	productList.forEach(function(value, index, arr){
		productContainer.appendChild(listItemFactory(value["id"], value["name"], value["price"], value["discount"], value["count"]));
	});
}

function listItemFactory(id:number, name:string, price:number, discount:number = 0, count:number = 1){
	let li:HTMLLIElement = document.createElement("li");
	li.setAttribute("id", String(id));
	li.innerHTML  = name + "<br>Price: $" + price.toFixed(2);

	if(discount > 0)
        li.innerHTML += "<br>Now: $" + (price - (price * discount)).toFixed(2) + " save $" + (price * discount).toFixed(2)
        li.innerHTML += "<br>Qty: "+ count; 
        li.innerHTML += "<br>" 
        li.innerHTML += "<a><button>ADD</button></a>"
        li.addEventListener('click',function(){
            displayQty();
            displayTotal();
            displayItemsInCart(id, name, price, discount, count);
        });
	return li;
}


renderProducts();


/****DISPLAYS****/

//Display | Show Cart
   function displayItemsInCart(id:number, name:string, price:number,discount:number, count:number):void{
        var output = name + "/  Price $" + Number(price);
        var ul = document.getElementById("cartList");
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(output)); 
        ul.appendChild(li);
        addItemToCart(id, name, price, 0, 1);
        displayQty();
        displayTotal();
    }

//Total Cost
function displayTotal():void{
    var output = " Total Cost of Items in Cart: $ " + totalCart();
    var span = document.getElementById('sp');
    span.innerHTML = output;
    }

//QTY - count
function displayQty():void{
var output = " Total Number of Items In Cart: " + countCart();
var span = document.getElementById('qt');
span.innerHTML = output;
}



/****JQUERY****/
    //Jquery Clear Cart
$("#clear-cart").click(function(event){
    clearCart();
    var content = document.getElementById('cartList');
    content.textContent = '';
});






 //Shopping Cart Functions
    let cart: any[] = [];
    function addItemToCart(id: number, name:string, price:number,discount: number, count:number){
        for(let x in cart){
            if(cart[x].name === name){ 
                    cart[x].count += count;
                    return;
            }
        }
        var item = new Item(id, name, price, discount, count);
        cart.push(item);
        saveCart();
        displayTotal();
        displayQty(); 
    }
    
    function saveCart(): void{
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
    
    function removeItemFromCart(name: string){
        for(let x = 0; x < cart.length; x++){
            if(cart[x].name === name){
                cart[x].count --; 
    
                if(cart[x].count === 0){ 
                    removeItemFromCartAll(name);
                }
            break;
            }
        }
        saveCart();
        displayTotal();
        displayQty();
    
    }
    
    function removeItemFromCartAll(name: string){
        for(let x = 0; x < cart.length; x++){
        if(cart[x].name === name){
            cart.splice(x,1); 
            break;
        }
    }
    saveCart();
    displayTotal();
    displayQty();

    }
    
    function clearCart(){
        cart = [];
        saveCart();
        console.log(cart);
        displayTotal();
        displayQty(); 
    }

    function countCart():number{
        let totalCount: number = 0;
        for(let x in cart){
            totalCount += cart[x].count; 
        
        }

        return totalCount;
    
    }


    function totalCart():number{
        var totalPrice: number = 0.0;
        for(let x in cart){
            totalPrice += (cart[x].price * cart[x].count);
        }
        return totalPrice;
    
    }
    
    function listCart(){
        var cartCopy = [];
        for(var x in cart){
            var item = cart[x];
            var itemCopy:any = {};  
        //itemCopy = {...item};
            for(var p in item){
            itemCopy[p] = item[p];
            }
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    }
