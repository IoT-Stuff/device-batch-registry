import { Context } from "../provider/Context";

export default function injectHandlerDependencies(handler, context: Context) {
    return (req: Request, res: Response) => {
        return handler(req, res, context);
    }
}