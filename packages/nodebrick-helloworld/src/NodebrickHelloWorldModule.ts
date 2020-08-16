import { ErrorModuleAlreadyRegistered } from './errors/ErrorModuleAlreadyRegistered';
import { ErrorModuleNotRegistered } from './errors/ErrorModuleNotRegistered';
import { INodebrickHelloWorldModule } from "./INodebrickHelloWorldModule";
import { IModule } from "./models/IModule";

export class NodebrickHelloWorldModule
    extends INodebrickHelloWorldModule
    implements INodebrickHelloWorldModule
{
    public constructor() 
    {
        super();
    }

    public setup(): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    public start(): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    public stop(): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    public teardown(): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
}