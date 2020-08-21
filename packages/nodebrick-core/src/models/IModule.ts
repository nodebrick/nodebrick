import { AsyncContainerModule, injectable } from 'inversify';

@injectable()
export abstract class IModule
{
    protected constructor(...args: unknown[])
    {
        //  nothing here, just definfing the constructor to be able to receive any number of arguments
    }

    /**
     * Register bindings against the application container
     * @param container 
     */
    public abstract async getBindings(): Promise<typeof AsyncContainerModule|null>;

    /**
     * setup the module
     */
    public abstract async setup(): Promise<void>;

    /**
     * start the module
     */
    public abstract async start(): Promise<void>;
    
    /**
     * stop the module
     */ 
    public abstract async stop(): Promise<void>;
    
    /**
     * clean everything this module might have left behind
     */
    public abstract async teardown(): Promise<void>;
}