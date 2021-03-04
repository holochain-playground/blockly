export declare const toolbox: {
    kind: string;
    contents: ({
        kind: string;
        name: string;
        contents: {
            kind: string;
            name: string;
            contents: {
                kind: string;
                type: string;
            }[];
        }[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        contents: {
            kind: string;
            type: string;
        }[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        custom: string;
        contents?: undefined;
    })[];
};
