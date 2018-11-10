    import { Item } from './item';
    //var shoppingCart = (function () {
        let cart: any[] = [];

        function addItemToCart(id: number, name:string, price:number, count:number){
            for(let x in cart){
                if(cart[x].name === name){ 
                        cart[x].count += count; //increase count by count given
                        return;
                }
            }
        
            var item = new Item(id, name, price, count);
            cart.push(item);
            saveCart();
            displayItemsInCart(id, name, price, count);
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
            console.log(cart.length);
            console.log(cart);
        
        }
        
        function removeItemFromCartAll(name: string){
            for(let x = 0; x < cart.length; x++){
            if(cart[x].name === name){
                cart.splice(x,1); 
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

        function setCountForCart (name: string, count: number) {
            for (var i in cart) {
                if (cart[i].name === name) {
                    cart[i].count = count;
                    break;
                }
            }
            saveCart();
        };
        
        
        function countCart():number{
            let totalCount: number = 0;
            for(let x in cart){
                totalCount += cart[x].count; 
            
            }

            return totalCount;
        
        }

        //totalCart() -> //returns the total cost
        function totalCart():number{
            var totalPrice: number = 0.0;
            for(let x in cart){
                totalPrice += (cart[x].price * cart[x].count);
                //totalPrice += cart[x].price;
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
        // function loadCart(){
        //     cart = JSON.parse(localStorage.getItem("shoppingCart")!);
        //     console.log(cart);
        // }

    //ProductList
    var item1:HTMLElement = document.getElementById('item1');
    item1.addEventListener('click',function(){
        addItemToCart(1,"Adidas NMD",130.00, 1);
        displayQty();
        displayTotal();
    });

    var item2:HTMLElement = document.getElementById('item2');
    item2.addEventListener('click',function(){
    addItemToCart(2,"Adidas Yeezy Boost 350",300.00, 1);
    displayQty();
    displayTotal();
    });


    var item3:HTMLElement = document.getElementById('item3');
    item3.addEventListener('click',function(){
        addItemToCart(3,"Vans Old Skool",60.00, 1);
        displayQty();
        displayTotal();
    });

    var item4:HTMLElement = document.getElementById('item4');
    item4.addEventListener('click',function(){
        addItemToCart(4,"Adidas Superstar",80.00, 1);
        displayQty();
        displayTotal();
    });


    var item5:HTMLElement = document.getElementById('item5');
    item5.addEventListener('click',function(){
        addItemToCart(5,"Converse Chuck Taylor All Star",50.00, 1);
        displayQty();
        displayTotal();
    });

    var item6:HTMLElement = document.getElementById('item6');
    item6.addEventListener('click',function(){
    addItemToCart(6,"Adidas Stan Smith",60.00, 1);
    displayQty();
    displayTotal();
    });


    var item7:HTMLElement = document.getElementById('item7');
    item7.addEventListener('click',function(){
        addItemToCart(7,"Nike Air Max 90",110.00, 1);
        displayQty();
        displayTotal();
    });

    var item8:HTMLElement = document.getElementById('item8');
    item8.addEventListener('click',function(){
        addItemToCart(8,"Vans Authentic",50.00, 1);
        displayQty();
        displayTotal();
    });

    var item9:HTMLElement = document.getElementById('item9');
    item9.addEventListener('click',function(){
        addItemToCart(9,"Adidas Ultra Boost",180.00, 1);
        displayQty();
        displayTotal();
    });


    //Display Methods


    //totalCost
    function displayTotal(){
        var output = " total cost $ " + totalCart();
        var span = document.getElementById('sp');
        span.innerHTML = output;
        }

    //QTY - count
    function displayQty(){
    var output = " QTY: " + countCart();
    var span = document.getElementById('qt');
    span.innerHTML = output;
    }

    //display item in cart
    function displayItemsInCart(id:number, name:string, price:number, count:number){
        var output = " ItemID: " + id +" "+ name + ": $" + Number(price); //+ " total cost $ " + totalCart();
        var ul = document.getElementById("cartList");
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(output)); 
        ul.appendChild(li);
    }




    //Eperiment....

    // function printThis(){
    //     var output = " ItemID: ";
    //     // for(var x = 0; x < cart.length; x++){
    //     //     output += cart[x].id + " " + cart[x].name;
          
    //     // }
    //     var ul = document.getElementById("cartList2");
    //     var li = document.createElement('li');
    //     li.appendChild(document.createTextNode(output)); 
    //         ul.appendChild(li);
    // }

    // var addB = document.getElementsByClassName('addButton');
    // for(var x = 0; x < addB.length; x++){
    
    //     addB[x].addEventListener('click',printThis);
    // };

    // addB.addEventListener('click',function(){
    //     addItemToCart(1,"test",130.00, 1);
    //     displayQty();
    //     displayTotal();
    // });
   


