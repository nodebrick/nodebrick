import { INodebrickCore } from "./INodebrickCore";
import { IModule } from "./models/IModule";
import { ErrorModuleAlreadyRegistered } from './errors/ErrorModuleAlreadyRegistered';
import { ErrorModuleNotRegistered } from './errors/ErrorModuleNotRegistered';

export class NodebrickCore
    extends INodebrickCore
    implements INodebrickCore
{
    protected _modules: Array<typeof IModule>;

    protected constructor() 
    {
        super();
        this._modules = [];
    }

    /**
     * Use this method to create a new application
     */
    public static async Bootstrap(): Promise<INodebrickCore>
    {
        // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-misused-promises, no-async-promise-executor
        const promise: Promise<INodebrickCore> = new Promise((resolve, reject) => 
        {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            (async(): Promise<void> => 
            {
                const nodebrickCore: INodebrickCore = new NodebrickCore();
                resolve(nodebrickCore);
            })();
        });

        return promise;
    }

    /**
     * Register a module against Nodebrick
     * @param module IModule
     */
    public async register(moduleClass: typeof IModule): Promise<void>
    {
        //  check if the module already exists
        if(this._modules.includes(moduleClass))
        {
            throw new ErrorModuleAlreadyRegistered(moduleClass);
        }
        this._modules.push(moduleClass);
    }

    /**
     * De-register a module against Nodebrick
     * @param module IModule
     */
    public async deregister(moduleClass: typeof IModule): Promise<void>
    {
        const moduleIndex: number = this._modules.indexOf(moduleClass);
        //  check if the module already exists
        if(moduleIndex == -1)
        {
            throw new ErrorModuleNotRegistered(moduleClass);
        }
        this._modules.splice(moduleIndex, 1);
    }

    public async setup(): Promise<void> 
    {
        // throw new Error(`Method not implemented.`);
    }

    public async start(): Promise<void> 
    {
        //  setup all the registered modules

        //  start all the registered modules
    }

    public async stop(): Promise<void> 
    {
        //  stop all the registered modules
        
    }

    public async teardown(): Promise<void> 
    {
        // throw new Error(`Method not implemented.`);
    }
}