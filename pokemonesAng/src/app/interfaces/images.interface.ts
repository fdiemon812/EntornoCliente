export interface Imagenes {
    total:       number;
    total_pages: number;
    results:     Result[];
}

export interface Result {
    id:                       string;
    created_at:               Date;
    updated_at:               Date;
    promoted_at:              Date | null;
    width:                    number;
    height:                   number;
    color:                    string;
    blur_hash:                string;
    description:              null | string;
    alt_description:          string;
    urls:                     Urls;
    links:                    ResultLinks;
    categories:               any[];
    likes:                    number;
    liked_by_user:            boolean;
    current_user_collections: any[];
    sponsorship:              null;
    topic_submissions:        ResultTopicSubmissions;
    user:                     User;
    tags:                     Tag[];
}

export interface ResultLinks {
    self:              string;
    html:              string;
    download:          string;
    download_location: string;
}

export interface Tag {
    type:    Type;
    title:   string;
    source?: Source;
}

export interface Source {
    ancestry:         Ancestry;
    title:            string;
    subtitle:         string;
    description:      string;
    meta_title:       string;
    meta_description: string;
    cover_photo:      CoverPhoto;
}

export interface Ancestry {
    type:         Category;
    category:     Category;
    subcategory?: Category;
}

export interface Category {
    slug:        string;
    pretty_slug: string;
}

export interface CoverPhoto {
    id:                       string;
    created_at:               Date;
    updated_at:               Date;
    promoted_at:              Date | null;
    width:                    number;
    height:                   number;
    color:                    string;
    blur_hash:                string;
    description:              string;
    alt_description:          AltDescription | null;
    urls:                     Urls;
    links:                    ResultLinks;
    categories:               any[];
    likes:                    number;
    liked_by_user:            boolean;
    current_user_collections: any[];
    sponsorship:              null;
    topic_submissions:        CoverPhotoTopicSubmissions;
    user:                     User;
}

export enum AltDescription {
    ButterflyPerchedOnFlowerAtDaytime = "butterfly perched on flower at daytime",
    SelectiveFocusPhotographyOfGiraffe = "selective focus photography of giraffe",
    YellowEyes = "yellow eyes",
}

export interface CoverPhotoTopicSubmissions {
    animals?:             Animals;
    "textures-patterns"?: Animals;
}

export interface Animals {
    status:      Status;
    approved_on: Date;
}

export enum Status {
    Approved = "approved",
}

export interface Urls {
    raw:     string;
    full:    string;
    regular: string;
    small:   string;
    thumb:   string;
}

export interface User {
    id:                 string;
    updated_at:         Date;
    username:           string;
    name:               string;
    first_name:         string;
    last_name:          null | string;
    twitter_username:   null | string;
    portfolio_url:      null | string;
    bio:                null | string;
    location:           null | string;
    links:              UserLinks;
    profile_image:      ProfileImage;
    instagram_username: null | string;
    total_collections:  number;
    total_likes:        number;
    total_photos:       number;
    accepted_tos:       boolean;
    for_hire:           boolean;
    social:             Social;
}

export interface UserLinks {
    self:      string;
    html:      string;
    photos:    string;
    likes:     string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface ProfileImage {
    small:  string;
    medium: string;
    large:  string;
}

export interface Social {
    instagram_username: null | string;
    portfolio_url:      null | string;
    twitter_username:   null | string;
    paypal_email:       null;
}

export enum Type {
    LandingPage = "landing_page",
    Search = "search",
}

export interface ResultTopicSubmissions {
    animals?:    Animals;
    wallpapers?: Animals;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): Imagenes {
        return cast(JSON.parse(json), r("Welcome"));
    }

    public static welcomeToJson(value: Imagenes): string {
        return JSON.stringify(uncast(value, r("Welcome")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "total", js: "total", typ: 0 },
        { json: "total_pages", js: "total_pages", typ: 0 },
        { json: "results", js: "results", typ: a(r("Result")) },
    ], false),
    "Result": o([
        { json: "id", js: "id", typ: "" },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "promoted_at", js: "promoted_at", typ: u(Date, null) },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "color", js: "color", typ: "" },
        { json: "blur_hash", js: "blur_hash", typ: "" },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "alt_description", js: "alt_description", typ: "" },
        { json: "urls", js: "urls", typ: r("Urls") },
        { json: "links", js: "links", typ: r("ResultLinks") },
        { json: "categories", js: "categories", typ: a("any") },
        { json: "likes", js: "likes", typ: 0 },
        { json: "liked_by_user", js: "liked_by_user", typ: true },
        { json: "current_user_collections", js: "current_user_collections", typ: a("any") },
        { json: "sponsorship", js: "sponsorship", typ: null },
        { json: "topic_submissions", js: "topic_submissions", typ: r("ResultTopicSubmissions") },
        { json: "user", js: "user", typ: r("User") },
        { json: "tags", js: "tags", typ: a(r("Tag")) },
    ], false),
    "ResultLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "download", js: "download", typ: "" },
        { json: "download_location", js: "download_location", typ: "" },
    ], false),
    "Tag": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "title", js: "title", typ: "" },
        { json: "source", js: "source", typ: u(undefined, r("Source")) },
    ], false),
    "Source": o([
        { json: "ancestry", js: "ancestry", typ: r("Ancestry") },
        { json: "title", js: "title", typ: "" },
        { json: "subtitle", js: "subtitle", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "meta_title", js: "meta_title", typ: "" },
        { json: "meta_description", js: "meta_description", typ: "" },
        { json: "cover_photo", js: "cover_photo", typ: r("CoverPhoto") },
    ], false),
    "Ancestry": o([
        { json: "type", js: "type", typ: r("Category") },
        { json: "category", js: "category", typ: r("Category") },
        { json: "subcategory", js: "subcategory", typ: u(undefined, r("Category")) },
    ], false),
    "Category": o([
        { json: "slug", js: "slug", typ: "" },
        { json: "pretty_slug", js: "pretty_slug", typ: "" },
    ], false),
    "CoverPhoto": o([
        { json: "id", js: "id", typ: "" },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "promoted_at", js: "promoted_at", typ: u(Date, null) },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "color", js: "color", typ: "" },
        { json: "blur_hash", js: "blur_hash", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "alt_description", js: "alt_description", typ: u(r("AltDescription"), null) },
        { json: "urls", js: "urls", typ: r("Urls") },
        { json: "links", js: "links", typ: r("ResultLinks") },
        { json: "categories", js: "categories", typ: a("any") },
        { json: "likes", js: "likes", typ: 0 },
        { json: "liked_by_user", js: "liked_by_user", typ: true },
        { json: "current_user_collections", js: "current_user_collections", typ: a("any") },
        { json: "sponsorship", js: "sponsorship", typ: null },
        { json: "topic_submissions", js: "topic_submissions", typ: r("CoverPhotoTopicSubmissions") },
        { json: "user", js: "user", typ: r("User") },
    ], false),
    "CoverPhotoTopicSubmissions": o([
        { json: "animals", js: "animals", typ: u(undefined, r("Animals")) },
        { json: "textures-patterns", js: "textures-patterns", typ: u(undefined, r("Animals")) },
    ], false),
    "Animals": o([
        { json: "status", js: "status", typ: r("Status") },
        { json: "approved_on", js: "approved_on", typ: Date },
    ], false),
    "Urls": o([
        { json: "raw", js: "raw", typ: "" },
        { json: "full", js: "full", typ: "" },
        { json: "regular", js: "regular", typ: "" },
        { json: "small", js: "small", typ: "" },
        { json: "thumb", js: "thumb", typ: "" },
    ], false),
    "User": o([
        { json: "id", js: "id", typ: "" },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "username", js: "username", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "first_name", js: "first_name", typ: "" },
        { json: "last_name", js: "last_name", typ: u(null, "") },
        { json: "twitter_username", js: "twitter_username", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolio_url", typ: u(null, "") },
        { json: "bio", js: "bio", typ: u(null, "") },
        { json: "location", js: "location", typ: u(null, "") },
        { json: "links", js: "links", typ: r("UserLinks") },
        { json: "profile_image", js: "profile_image", typ: r("ProfileImage") },
        { json: "instagram_username", js: "instagram_username", typ: u(null, "") },
        { json: "total_collections", js: "total_collections", typ: 0 },
        { json: "total_likes", js: "total_likes", typ: 0 },
        { json: "total_photos", js: "total_photos", typ: 0 },
        { json: "accepted_tos", js: "accepted_tos", typ: true },
        { json: "for_hire", js: "for_hire", typ: true },
        { json: "social", js: "social", typ: r("Social") },
    ], false),
    "UserLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "photos", js: "photos", typ: "" },
        { json: "likes", js: "likes", typ: "" },
        { json: "portfolio", js: "portfolio", typ: "" },
        { json: "following", js: "following", typ: "" },
        { json: "followers", js: "followers", typ: "" },
    ], false),
    "ProfileImage": o([
        { json: "small", js: "small", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "large", js: "large", typ: "" },
    ], false),
    "Social": o([
        { json: "instagram_username", js: "instagram_username", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolio_url", typ: u(null, "") },
        { json: "twitter_username", js: "twitter_username", typ: u(null, "") },
        { json: "paypal_email", js: "paypal_email", typ: null },
    ], false),
    "ResultTopicSubmissions": o([
        { json: "animals", js: "animals", typ: u(undefined, r("Animals")) },
        { json: "wallpapers", js: "wallpapers", typ: u(undefined, r("Animals")) },
    ], false),
    "AltDescription": [
        "butterfly perched on flower at daytime",
        "selective focus photography of giraffe",
        "yellow eyes",
    ],
    "Status": [
        "approved",
    ],
    "Type": [
        "landing_page",
        "search",
    ],
};
