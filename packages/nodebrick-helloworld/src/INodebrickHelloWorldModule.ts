import { IModule } from "@nodebrick/nodebrick-core";
import { injectable } from "inversify";

@injectable()
export abstract class INodebrickHelloWorldModule
    extends IModule
{
}