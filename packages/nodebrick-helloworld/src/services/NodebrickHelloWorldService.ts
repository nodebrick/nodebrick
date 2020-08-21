import { INodebrickHelloWorldService } from "./INodebrickHelloWorldService";
import { injectable } from 'inversify';

@injectable()
export class NodebrickHelloWorldService
    extends INodebrickHelloWorldService
    implements INodebrickHelloWorldService
{
    public helloWorld(name: string): void 
    {
        console.log(`${name} says Hello World!`);
    }
}