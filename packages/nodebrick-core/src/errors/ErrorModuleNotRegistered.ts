import { IModule } from "../models/IModule";

export class ErrorModuleNotRegistered 
    extends Error
{
    public constructor(moduleClass: typeof IModule)
    {
        super();
        this.message = `The module ${moduleClass.name} isn't registered`;
    }
}