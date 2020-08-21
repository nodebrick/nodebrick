import { AsyncContainerModule, Container } from "inversify";
import { ErrorModuleAlreadyRegistered } from './errors/ErrorModuleAlreadyRegistered';
import { ErrorModuleNotRegistered } from './errors/ErrorModuleNotRegistered';
import { INodebrickCore } from "./INodebrickCore";
import { IModule } from "./models/IModule";
import { NodebrickCoreBindings } from './NodebrickCoreBindings';
import { Newable } from "./types/Newable";

export class NodebrickCore
    extends INodebrickCore
    implements INodebrickCore
{
    /**
     * IoC container used by this NodebrickCore instance
     */
    protected _container: Container;

    /**
     * The bindings required for this module
     */
    protected _bindings!: typeof AsyncContainerModule;

    /**
     * the modules registered against nodebrick
     */
    protected _modules: Array<typeof IModule>;

    public get container(): Container
    {
        return this._container;
    }

    protected constructor() 
    {
        super();
        this._modules = [];
        this._container = new Container({
            skipBaseClassChecks: true
        });
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
                
                //  register nodebrick core bindings
                const moduleBindings: typeof AsyncContainerModule | null = await nodebrickCore.getBindings();
                if(moduleBindings)
                {
                    nodebrickCore.container.bind(moduleBindings).toSelf();
                    await nodebrickCore.container.loadAsync(
                        nodebrickCore.container.get(moduleBindings)
                    );
                }

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

    public async getBindings(): Promise<typeof AsyncContainerModule|null> 
    {
        if(!this._bindings)
        {
            this._bindings = NodebrickCoreBindings;
        }
        return this._bindings;
    }

    public async setup(): Promise<void> 
    {
        // throw new Error(`Method not implemented.`);
    }

    public async start(): Promise<void> 
    {
        //  SETUP ALL REGISTERED MODULES
        //  use for loop instead of foreach to be able to await
        const modulesLength: number = this._modules.length;
        for (let i: number = 0; i < modulesLength; i++)
        {
            //  use the dependency injection engine to get an instance of this module
            this._container.bind(this._modules[i] as Newable<IModule>).toSelf();
            const moduleInstance: IModule = this._container.get(this._modules[i] as Newable<IModule>);
            const moduleBindings: typeof AsyncContainerModule | null = await moduleInstance.getBindings();
            if(moduleBindings)
            {
                this._container.bind(moduleBindings).toSelf();
                await this._container.loadAsync(
                    this._container.resolve(moduleBindings)
                );
            }
            await moduleInstance.setup();
        }

        //  START ALL REGISTERED MODULES
        for (let i: number = 0; i < modulesLength; i++)
        {
            //  use the dependency injection engine to get an instance of this module
            const moduleInstance: IModule = this._container.get(this._modules[i]);
            await moduleInstance.start();
        }
    }

    public async stop(): Promise<void> 
    {
        //  STOP ALL REGISTERED MODULES, REVERSED ORDER
        const modulesLength: number = this._modules.length;
        for (let i: number = modulesLength-1; i >= 0; i--)
        {
            //  use the dependency injection engine to get an instance of this module
            const moduleInstance: IModule = this._container.get(this._modules[i]);
            await moduleInstance.stop();
        }

        for (let i: number = modulesLength-1; i >= 0; i--)
        {
            //  use the dependency injection engine to get an instance of this module
            const moduleInstance: IModule = this._container.get(this._modules[i]);
            await moduleInstance.teardown();
        }

    }

    public async teardown(): Promise<void> 
    {
        // throw new Error(`Method not implemented.`);
    }
}