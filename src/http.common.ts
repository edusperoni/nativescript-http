import { knownFolders, path } from "tns-core-modules/file-system";
import { HttpRequestOptions, HttpResponse } from "@nativescript/core/http/http";
import { ImageSource } from "@nativescript/core/image-source/image-source";

/**
 * Downloads the content from the specified URL as a string.
 * @param url The URL to request from.
 */
export declare function getString(url: string): Promise<string>;

/**
 * Downloads the content from the specified URL as a string.
 * @param options An object that specifies various request options.
 */
export declare function getString(options: HttpRequestOptions): Promise<string>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param url The URL to request from.
 */
export declare function getJSON<T>(url: string): Promise<T>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param options An object that specifies various request options.
 */
export declare function getJSON<T>(options: HttpRequestOptions): Promise<T>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param url The URL to request from.
 */
export declare function getImage(url: string): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param options An object that specifies various request options.
 */
export declare function getImage(options: HttpRequestOptions): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param url The URL to request from.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export declare function getFile(url: string, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param options An object that specifies various request options.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export declare function getFile(options: HttpRequestOptions, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param url The URL to request from.
 */
export declare function getBinary(url: string): Promise<ArrayBuffer>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param options An object that specifies various request options.
 */
export declare function getBinary(options: HttpRequestOptions): Promise<ArrayBuffer>;

/**
 * Makes a generic http request using the provided options and returns a HttpResponse Object.
 * @param options An object that specifies various request options.
 */
export declare function request(options: HttpRequestOptions): Promise<HttpResponse>;
export function getFilenameFromUrl(url: string): string {
    const slashPos = url.lastIndexOf("/") + 1;
    const questionMarkPos = url.lastIndexOf("?");

    let actualFileName: string;
    if (questionMarkPos !== -1) {
        actualFileName = url.substring(slashPos, questionMarkPos);
    } else {
        actualFileName = url.substring(slashPos);
    }

    const result = path.join(knownFolders.documents().path, actualFileName);

    return result;
}

export class HTTPFormDataEntry {
    data: any;
    fileName?: string;
    contentType?: string;
}

export type HTTPFormDataEntryValue = HTTPFormDataEntry | FormDataEntryValue | any;

export class HTTPFormData implements FormData {
    private values: Map<string, Array<HTTPFormDataEntryValue>> = new Map<string, Array<HTTPFormDataEntryValue>>();

    append(name: string, value: string | Blob | HTTPFormDataEntry, fileName?: string): void {
        if (!this.values.has(name)) {
            this.values.set(name, new Array<HTTPFormDataEntryValue>());
        }

        const values = this.values.get(name);
        if (value instanceof Blob) {
            let b: any = value;
            b.name = fileName;
            b.lastModifiedDate = new Date();
            values.push(<File>b);
        } else {
            values.push(value);
        }

        this.values.set(name, values);
    }

    delete(name: string): void {
        this.values.delete(name);
    }
    get(name: string): HTTPFormDataEntryValue | null {
        if (this.has(name)) {
            return this.values.get(name)[0];
        }

        return null;
    }
    getAll(name: string): HTTPFormDataEntryValue[] {
        const value = this.values.get(name);
        if (value) {
            return value;
        }
        return [];
    }
    has(name: string): boolean {
        return this.values.has(name);
    }
    set(name: string, value: string | Blob | HTTPFormDataEntry, fileName?: string) {
        const values = new Array<HTTPFormDataEntryValue>();
        if (value instanceof Blob) {
            let b: any = value;
            b.name = fileName;
            b.lastModifiedDate = new Date();
            values.push(<File>b);
        } else {
            values.push(value);
        }
        this.values.set(name, values);
    }

    forEach(callbackfn: (value: HTTPFormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any) {
        this.values.forEach((mapVal, mapKey) => {
            mapVal.forEach((formVal) => {
                callbackfn(formVal, mapKey, this);
            });
        }, thisArg);
    }
}
