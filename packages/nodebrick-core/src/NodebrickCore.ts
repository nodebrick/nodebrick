import { INodebrickCore } from "./INodebrickCore";
import { IModule } from "./models/IModule";
import { ErrorModuleAlreadyRegistered } from './errors/ErrorModuleAlreadyRegistered';
import { ErrorModuleNotRegistered } from './errors/ErrorModuleNotRegistered';

export class NodebrickCore
    extends INodebrickCore
    implements INodebrickCore
{
    protected _modules: typeof IModule[];

    public constructor() 
    {
        super();
        this._modules = [];
    }

    /**
     * Register a module against Nodebrick
     * @param module IModule
     */
    public async register(moduleClass: typeof IModule): Promise<void>
    {
        //  check if the module already exists
        if( this._modules.includes(moduleClass) )
        {
            throw new ErrorModuleAlreadyRegistered(moduleClass);
        }
    }

    /**
     * De-register a module against Nodebrick
     * @param module IModule
     */
    public async deregister(moduleClass: typeof IModule): Promise<void>
    {
        //  check if the module already exists
        if( !this._modules.includes(moduleClass) )
        {
            throw new ErrorModuleNotRegistered(moduleClass);
        }
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