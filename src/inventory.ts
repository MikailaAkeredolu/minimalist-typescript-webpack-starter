import { InventoryManager, InventoryCallback } from "./inventoryManager";
import { Item } from "./item";

export class Inventory implements InventoryManager {
    private productList: Item[] = [];
    private handler: InventoryCallback;

    setModel(productList: Item[]) {
        this.productList = productList;
    }

    registerEventListener(handler: InventoryCallback) {
        this.handler = handler;
    }

    renderProducts(productContainer: any) {
        let that = this;
        this.productList.forEach(function (item: Item) {
            if (item.count === 0) {
                item.count = 1;
            }
            productContainer.appendChild(that.listItemFactory(item));
        });
    }

    private listItemFactory(item: Item) {
        let li: HTMLLIElement = document.createElement("li");
        li.setAttribute("id", String(item.id));
        li.innerHTML = item.name + "<br>Price: $" + item.price.toFixed(2);

        if (item.discount > 0) {
            li.innerHTML += "<br>Now: $" + (item.price - (item.price * item.discount)).toFixed(2) + " save $" + (item.price * item.discount).toFixed(2);
        }
        li.innerHTML += "<br>"
        li.innerHTML += "<a><button>ADD</button></a>"
        let that = this;
        li.addEventListener('click', function () {
            that.handler(item);
        });
        return li;
    }

}