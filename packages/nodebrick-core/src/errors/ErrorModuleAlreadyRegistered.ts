import { IModule } from "../models/IModule";

export class ErrorModuleAlreadyRegistered 
    extends Error
{
    public constructor(moduleClass: typeof IModule)
    {
        super();
        this.message = `The module ${moduleClass.name} has already been registered`;
    }
}