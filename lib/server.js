"use strict";
var restify = require("restify");
var constants_1 = require("./constants");
/**
 * Wrapper for the restify server.
 */
var InversifyRestifyServer = (function () {
    /**
     * Wrapper for the restify server.
     *
     * @param container Container loaded with all controllers and their dependencies.
     */
    function InversifyRestifyServer(container, opts) {
        this.container = container;
        this.app = restify.createServer(opts);
    }
    /**
     * Sets the configuration function to be applied to the application.
     * Note that the config function is not actually executed until a call to InversifyRestifyServer.build().
     *
     * This method is chainable.
     *
     * @param fn Function in which app-level middleware can be registered.
     */
    InversifyRestifyServer.prototype.setConfig = function (fn) {
        this.configFn = fn;
        return this;
    };
    /**
     * Applies all routes and configuration to the server, returning the restify application.
     */
    InversifyRestifyServer.prototype.build = function () {
        // register server-level middleware before anything else
        if (this.configFn) {
            this.configFn.apply(undefined, [this.app]);
        }
        this.registerControllers();
        return this.app;
    };
    InversifyRestifyServer.prototype.registerControllers = function () {
        var _this = this;
        var controllers = this.container.getAll(constants_1.TYPE.Controller);
        controllers.forEach(function (controller) {
            var controllerMetadata = Reflect.getOwnMetadata(constants_1.METADATA_KEY.controller, controller.constructor);
            var methodMetadata = Reflect.getOwnMetadata(constants_1.METADATA_KEY.controllerMethod, controller.constructor);
            if (controllerMetadata && methodMetadata) {
                methodMetadata.forEach(function (metadata) {
                    var handler = _this.handlerFactory(controllerMetadata.target.name, metadata.key);
                    var fullPath = metadata.path;
                    if (controllerMetadata.path !== "/") {
                        fullPath = controllerMetadata.path + metadata.path;
                    }
                    _this.app[metadata.method](fullPath, controllerMetadata.middleware.concat(metadata.middleware), handler);
                });
            }
        });
    };
    InversifyRestifyServer.prototype.handlerFactory = function (controllerName, key) {
        var _this = this;
        return function (req, res, next) {
            var result = _this.container.getNamed(constants_1.TYPE.Controller, controllerName)[key](req, res, next);
            // try to resolve promise
            if (result && result instanceof Promise) {
                result.then(function (value) {
                    if (value && !res.headersSent) {
                        res.send(value);
                    }
                })
                    .catch(function (error) {
                    next(new Error(error));
                });
            }
            else if (result && !res.headersSent) {
                res.send(result);
            }
        };
    };
    return InversifyRestifyServer;
}());
exports.InversifyRestifyServer = InversifyRestifyServer;
