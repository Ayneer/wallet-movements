export type DasboardFilterType =
    'CUSTOM'
    | 'THIS_MONTH'
    | 'THIS_WEEK'
    | 'FIRST_15TH_CURRENT_MONTH'
    | 'SECOND_15TH_CURRENT_MONTH'

export interface IDashboardRequest {
    userId: string;
    categoryId: string;
    pocketId: [string];
    filterType: DasboardFilterType;
    initialDate?: Date;
    finalDate?: Date;
}

export interface IDasboardFilteringDates {
    initialDate: Date;
    finalDate: Date;
}