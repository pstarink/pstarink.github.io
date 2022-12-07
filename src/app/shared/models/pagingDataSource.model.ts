export class PagingDataSource {
    rows: any[];
    search?: string;
    sortKey?: string;
    sortDir?: string;
    offset: number;
    limit: number;
    total?: number;

    constructor(some?: Partial<PagingDataSource>) {
        Object.assign(this, some);
    }
}
