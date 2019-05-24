import { Spool } from '@fabrix/fabrix/dist/common';
export declare class GreenlockSpool extends Spool {
    constructor(app: any);
    validate(): Promise<void>;
    configure(): void;
}
