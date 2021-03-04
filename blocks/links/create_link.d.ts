export declare const createLink: {
    type: string;
    message0: string;
    args0: ({
        type: string;
        name: string;
        check: string[];
        align: string;
    } | {
        type: string;
        name: string;
        align: string;
        check?: undefined;
    })[];
    nextStatement: null;
    previousStatement: null;
    colour: string;
    tooltip: string;
    helpUrl: string;
};
export declare function defineCreateLink(blockly: any): void;
