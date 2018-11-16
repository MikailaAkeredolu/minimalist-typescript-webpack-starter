import { InventoryManager, InventoryCallback } from "./inventoryManager";
import { Item } from "./item";

export class Inventory implements InventoryManager {
    private productList: Item[] = [];
    private handler: InventoryCallback;
    private productContainer: any;

    constructor(productContainer: any) {
        this.productContainer = productContainer;
    }

    setModel(productList: Item[]) {
        this.productList = productList;
    }

    registerEventListener(handler: InventoryCallback) {
        this.handler = handler;
    }

    renderProducts() {
        this.productList.forEach((item: Item) => {
            if (item.count === 0) {
                item.count = 1;
            }
            this.productContainer.appendChild(this.listItemFactory(item));
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

        li.addEventListener('click', () => {
            this.handler(item);
        });
        return li;
    }


    searchFilter(filterName: string): void {
        let filterResult: number[] = this.productList.filter(p => p.name.includes(filterName)).map(p => p.id);
        this.updateSearchView(filterResult);
    }

    updateSearchView(showIds: number[]): void {

        let inputs: NodeListOf<Node> = this.productContainer.childNodes;
        inputs.forEach((input) => {
            let ele: HTMLLIElement = <HTMLLIElement>input;
            if (ele !== null && ele.tagName === 'LI') {
                ele.style.display = showIds.includes(Number(ele.id)) ? "block" : "none";
            }

        });
    }


}