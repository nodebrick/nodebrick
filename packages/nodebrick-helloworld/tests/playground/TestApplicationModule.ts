import { INodebrickHelloWorldService } from "../../src/services/INodebrickHelloWorldService";
import { ITestApplicationModule } from "./ITestApplicationModule";
import { AsyncContainerModule, injectable } from 'inversify';

@injectable()
export class TestApplicationModule
    extends ITestApplicationModule
    implements ITestApplicationModule
{
    protected _bindings!: typeof AsyncContainerModule;

    protected _helloWorldService: INodebrickHelloWorldService;

    public constructor(        
        helloWorldService: INodebrickHelloWorldService
    )
    {
        super();
        this._helloWorldService = helloWorldService;
    }

    public async getBindings(): Promise<typeof AsyncContainerModule|null> 
    {
        return null;
    }

    public async setup(): Promise<void> 
    {
        //  nothing here
    }
    
    public async start(): Promise<void> 
    {
        this._helloWorldService.helloWorld(TestApplicationModule.name);
    }

    public async stop(): Promise<void> 
    {
        //  nothing here
    }

    public async teardown(): Promise<void> 
    {
        //  nothing here
    }

}