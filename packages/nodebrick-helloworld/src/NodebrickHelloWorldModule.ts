import { INodebrickHelloWorldModule } from "./INodebrickHelloWorldModule";
import { AsyncContainerModule } from 'inversify';
import { NodebrickHelloWorldBindings } from './NodebrickHelloWorldBindings';

export class NodebrickHelloWorldModule
    extends INodebrickHelloWorldModule
    implements INodebrickHelloWorldModule
{
    protected _bindings!: typeof AsyncContainerModule;

    public constructor() 
    {
        super();
    }

    public async getBindings(): Promise<typeof AsyncContainerModule|null> 
    {
        if(!this._bindings)
        {
            this._bindings = NodebrickHelloWorldBindings;
        }
        return this._bindings;
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