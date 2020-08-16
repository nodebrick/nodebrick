import { INodebrickHelloWorldModule } from "./INodebrickHelloWorldModule";

export class NodebrickHelloWorldModule
    extends INodebrickHelloWorldModule
    implements INodebrickHelloWorldModule
{
    public constructor() 
    {
        super();
    }

    public async setup(): Promise<void> 
    {
        //  nothing here
    }

    public async start(): Promise<void> 
    {
        //  nothing here
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