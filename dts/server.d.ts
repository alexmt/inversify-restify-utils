import * as inversify from "inversify";
import * as restify from "restify";
import interfaces from "./interfaces";
/**
 * Wrapper for the restify server.
 */
export declare class InversifyRestifyServer {
    private container;
    private app;
    private configFn;
    /**
     * Wrapper for the restify server.
     *
     * @param container Container loaded with all controllers and their dependencies.
     */
    constructor(container: inversify.interfaces.Container, opts?: restify.ServerOptions);
    /**
     * Sets the configuration function to be applied to the application.
     * Note that the config function is not actually executed until a call to InversifyRestifyServer.build().
     *
     * This method is chainable.
     *
     * @param fn Function in which app-level middleware can be registered.
     */
    setConfig(fn: interfaces.ConfigFunction): InversifyRestifyServer;
    /**
     * Applies all routes and configuration to the server, returning the restify application.
     */
    build(): restify.Server;
    private registerControllers();
    private handlerFactory(controllerName, key);
}
