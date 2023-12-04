export type TCoffeeRaw = {
    "id": number,
    "uid": string,
    "blend_name": string,
    "origin": string,
    "variety": string,
    "notes": string,
    "intensifier": string,
}


export type TCoffeeIntensifier = string; // should we use enum here?

export type TCoffee = {
    "id": number,
    "uid": string,
    "blend_name": string,
    "origin": string,
    "variety": string,
    "notes": string[],
    "intensifier": TCoffeeIntensifier,
}