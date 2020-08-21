import { AsyncContainerModule, injectable, interfaces } from "inversify";

/**
 *  Create an Inversify AsyncContainer to load dependencies asynchronously
 *  https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md
 *  The AsyncContainerModule parent class expect an object of type AsyncContainerModuleCallBack
 *  https://github.com/inversify/InversifyJS/blob/e6c8854baebf5e9a1e7917a2e131efc2504bf215/src/interfaces/interfaces.ts
 * */  
@injectable()
export class NodebrickCoreBindings
    extends AsyncContainerModule
{
    public constructor()
    {
        const registry: interfaces.AsyncContainerModuleCallBack = async(
            bind: interfaces.Bind,
            unbind: interfaces.Unbind,
            isBound: interfaces.IsBound,
            rebind: interfaces.Rebind): Promise<void> =>
        // eslint-disable-next-line arrow-body-style
        {
            //  bind models as Transient

            //  bind services as singleton
            // bind(INodebrickHelloWorldService).to(NodebrickHelloWorldService).inSingletonScope();

            //  bind repository as Transient

            return Promise.resolve();
        };

        super(registry);
    }
}