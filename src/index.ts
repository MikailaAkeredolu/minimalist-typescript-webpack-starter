//document.getElementsByTagName('h1')[0].innerHTML = "Hello, TypeScript+webpack World!";
import { Item } from './item';
//var shoppingCart = (function () {
    let cart: any[] = [];

    function addItemToCart(id: number, name:string, price:number, count:number){
        //loop through the array to check if name of item already exist
        for(let x in cart){
            if(cart[x].name === name){ //if name exist
                    cart[x].count += count; //increase count by count given
                    return;
            }
        }
    
        var item = new Item(id, name, price, count);
        cart.push(item);
        saveCart();
        displayCart(id,name,price,count);
        console.log(cart);
    }
    
    function saveCart(): void{
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
    
    function removeItemFromCart(name: string){
        for(let x = 0; x < cart.length; x++){
            if(cart[x].name === name){
                cart[x].count --;  //decrease item number by 1
    
                if(cart[x].count === 0){ //if item count is 0
                    //cart.splice(x,1); //remove the item object
                    removeItemFromCartAll(name);
                }
            break;
            }
        }
        saveCart();
        console.log(cart.length);
        console.log(cart);
    
    }
    
    function removeItemFromCartAll(name: string){
        for(let x = 0; x < cart.length; x++){
        if(cart[x].name === name){
            cart.splice(x,1); //remove the item object
            break;
        }
    }
    saveCart();
 
    }
    
    function clearCart(){
        cart = [];
        saveCart();
        console.log(cart);
    }
    
    function countCart():number{
        let totalCount: number = 0;
        for(let x in cart){
            totalCount += cart[x].count;  //add count of an item to toal count
        }

        return totalCount;
    
    }

    function setCountForCart (name: string, count: number) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };
    
    //totalCart() -> //returns the total cost
    function totalCart():number{
        var totalPrice: number = 0.0;
        for(let x in cart){
            totalPrice += cart[x].price;
        }
        return totalPrice;
       
    }
    
    function listCart(){
        //create a copy
        var cartCopy = [];
        //loop through each item in the cart
        for(var x in cart){
            var item = cart[x];
            var itemCopy:any = {};  
        //itemCopy = {...item};
        //loop through each property
    
            for(var p in item){
            itemCopy[p] = item[p];
    
            }
    
            cartCopy.push(itemCopy);
            

        }
        return cartCopy;

    }
    
    //loadCart() //Looks for cart and loads it from local storage//take string and make objects
    function loadCart(){
        cart = JSON.parse(localStorage.getItem("shoppingCart")!);
        console.log(cart);
    }

//ProductList
var item1:HTMLElement = document.getElementById('item1');
item1.addEventListener('click',function(){
     addItemToCart(1,"Adidas NMD",130.00, 1);
});

var item2:HTMLElement = document.getElementById('item2');
item2.addEventListener('click',function(){
  addItemToCart(2,"Adidas Yeezy Boost 350",300.00, 1);
});


var item3:HTMLElement = document.getElementById('item3');
item3.addEventListener('click',function(){
    addItemToCart(3,"Vans Old Skool",60.00, 1);
});

var item4:HTMLElement = document.getElementById('item4');
item4.addEventListener('click',function(){
    addItemToCart(4,"Adidas Superstar",80.00, 1);
});


var item5:HTMLElement = document.getElementById('item5');
item5.addEventListener('click',function(){
     addItemToCart(5,"Converse Chuck Taylor All Star",50.00, 1);
});

var item6:HTMLElement = document.getElementById('item6');
item6.addEventListener('click',function(){
  addItemToCart(6,"Adidas Stan Smith",60.00, 1);
});


var item7:HTMLElement = document.getElementById('item7');
item7.addEventListener('click',function(){
    addItemToCart(7,"Nike Air Max 90",110.00, 1);
});

var item8:HTMLElement = document.getElementById('item8');
item8.addEventListener('click',function(){
    addItemToCart(8,"Vans Authentic",50.00, 1);
});

var item9:HTMLElement = document.getElementById('item9');
item9.addEventListener('click',function(){
    addItemToCart(9,"Adidas Ultra Boost",180.00, 1);
});


//totalCart
var total:HTMLElement = document.getElementById('total');
total.addEventListener('click',function(){
    totalCart();
    console.log(totalCart());
});

//removeItem
var removeItem:HTMLElement = document.getElementById('removeItem');
removeItem.addEventListener('click',function(){
removeItemFromCart("Adidas NMD");
});

//Remove ALl items
var removeItem:HTMLElement = document.getElementById('removeItem');
removeItem.addEventListener('click',function(){
removeItemFromCartAll("Adidas NMD");
});

//countCart
var cCart:HTMLElement = document.getElementById('countCart');
cCart.addEventListener('click',function(){
console.log(countCart());
});

//listCart
var lCart:HTMLElement = document.getElementById('listCart');
lCart.addEventListener('click',function(){
    console.log(listCart());
});

function displayCart(id:number, name:string, price:number, count:number){
        var output = " ItemID: " + id +" "+ name + ": $" + Number(price) + " total cost $ " + totalCart();;
        var ul = document.getElementById("friendsList");
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(output));   
        ul.appendChild(li);
        li.addEventListener('click',function(){
        addItemToCart(id,name,price, count);
    });
}

