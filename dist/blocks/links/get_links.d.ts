export declare const getLinks: {
    type: string;
    message0: string;
    args0: ({
        type: string;
        name: string;
        check: string[];
    } | {
        type: string;
        name: string;
        check?: undefined;
    })[];
    inputsInline: boolean;
    output: string;
    colour: string;
    tooltip: string;
    helpUrl: string;
};
export declare function defineGetLinks(blockly: any): void;
