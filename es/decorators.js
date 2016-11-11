import { METADATA_KEY } from "./constants";
export function Controller(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return function (target) {
        var metadata = { path: path, middleware: middleware, target: target };
        Reflect.defineMetadata(METADATA_KEY.controller, metadata, target);
    };
}
export function Get(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["get", path].concat(middleware));
}
export function Post(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["post", path].concat(middleware));
}
export function Put(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["put", path].concat(middleware));
}
export function Patch(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["patch", path].concat(middleware));
}
export function Head(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["head", path].concat(middleware));
}
export function Delete(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["del", path].concat(middleware));
}
export function Options(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return Method.apply(void 0, ["opts", path].concat(middleware));
}
export function Method(method, path) {
    var middleware = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        middleware[_i - 2] = arguments[_i];
    }
    return function (target, key, value) {
        var metadata = { path: path, middleware: middleware, method: method, target: target, key: key };
        var metadataList = [];
        if (!Reflect.hasOwnMetadata(METADATA_KEY.controllerMethod, target.constructor)) {
            Reflect.defineMetadata(METADATA_KEY.controllerMethod, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getOwnMetadata(METADATA_KEY.controllerMethod, target.constructor);
        }
        metadataList.push(metadata);
    };
}
