interface IPocketMovement {
    date: string;
    amount: number;
    description: string;
}

export interface IPocketMovements {
    categoryName: string;
    categoryId: string;
    totalAmount: number;
    movements: [IPocketMovement];
}