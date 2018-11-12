export interface CartManager {
    addItemToCart(id: number, name: string, price: number, discount: number, count: number): void,
    removeItemFromCart(name: string): void,
    countCart(): number,
    totalCart(): number,
    listCart(): any[],
    clearCart(): void
}