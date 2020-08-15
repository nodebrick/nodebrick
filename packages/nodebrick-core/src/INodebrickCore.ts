import { IModule } from "./models/IModule";
import { ErrorModuleAlreadyRegistered } from './errors/ErrorModuleAlreadyRegistered';

export abstract class INodebrickCore
{
    protected _modules: IModule[];

    
    /**
     * Register a module against Nodebrick
     * @param module IModule
     */
    public register(moduleClass: typeof IModule)
    {
        //  check if the module already exists
        if( this._modules.includes(moduleClass) )
        {
            throw new ErrorModuleAlreadyRegistered(moduleClass);
        }
    }

public 
    //  setup modules
    //  start modules
}