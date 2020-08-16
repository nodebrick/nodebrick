import { IModule } from "./models/IModule";
export abstract class INodebrickCore
    extends IModule
{
    /**
     * Register a module against Nodebrick
     * @param module typeof IModule
     */
    public abstract register(moduleClass: typeof IModule): Promise<void>;

    /**
     * Deregister a module against Nodebrick
     * @param module typeof IModule
     */
    public abstract deregister(moduleClass: typeof IModule): Promise<void>;
}