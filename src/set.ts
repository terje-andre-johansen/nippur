export default function<T>(obj: T, options: {[K in keyof Partial<T>]: T[K]}): T {
    const keys: string[] = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
        (obj as any)[keys[i]] = (options as any)[keys[i]];
    }    
    return obj;
}