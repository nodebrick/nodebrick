export abstract class IModule
{
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