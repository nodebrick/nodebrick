import { INodebrickHelloWorldService } from "../../src/services/INodebrickHelloWorldService";
import { ITestApplicationModule } from "./ITestApplicationModule";

export class TestApplicationModule
    extends ITestApplicationModule
    implements ITestApplicationModule
{
    protected _helloWorldService: INodebrickHelloWorldService;

    public constructor(        
        helloWorldService: INodebrickHelloWorldService
    )
    {
        super();
        this._helloWorldService = helloWorldService;
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