import { NodebrickCore, INodebrickCore } from '@nodebrick/nodebrick-core';
import { NodebrickHelloWorldModule } from '../src/NodebrickHelloWorldModule';
import { TestApplicationModule } from './playground/TestApplicationModule';

NodebrickCore.Bootstrap()
    .then(async(nodebrickCore: INodebrickCore) => 
    {
        await nodebrickCore.register(NodebrickHelloWorldModule);
        await nodebrickCore.register(TestApplicationModule);
        await nodebrickCore.start();
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any)=>
    {
        throw new Error(reason);
    });