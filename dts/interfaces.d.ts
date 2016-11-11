import * as restify from "restify";
declare namespace interfaces {
    interface ControllerMetadata {
        path: string;
        middleware: restify.RequestHandler[];
        target: any;
    }
    interface ControllerMethodMetadata extends ControllerMetadata {
        method: string;
        key: string;
    }
    interface Controller {
    }
    interface HandlerDecorator {
        (target: any, key: string, value: any): void;
    }
    interface ConfigFunction {
        (app: restify.Server): void;
    }
}
export default interfaces;
