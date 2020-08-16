import { INodebrickHelloWorldService } from "./INodebrickHelloWorldService";

export class NodebrickHelloWorldService
    extends INodebrickHelloWorldService
    implements INodebrickHelloWorldService
{
    public helloWorld(name: string): void 
    {
        console.log(`${name} says Hello World!`);
    }
}