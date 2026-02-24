import type { AnyRouter, CombinedDataTransformer, inferRouterError } from '@trpc/server';
import type { TRPCResponse, TRPCResponseMessage, TRPCResultMessage } from '@trpc/server/rpc';
import { transformResult as transformTRPCResult } from '@trpc/server/unstable-core-do-not-import';

// from @trpc/client/src/links/internals/transformResult
// FIXME:
// - the generics here are probably unnecessary
// - the RPC-spec could probably be simplified to combine HTTP + WS
/** @internal */
export function transformResult<TRouter extends AnyRouter, TOutput>(
  response:
    | TRPCResponseMessage<TOutput, inferRouterError<TRouter>>
    | TRPCResponse<TOutput, inferRouterError<TRouter>>,
  transformer: CombinedDataTransformer
) {
  return transformTRPCResult(
    response,
    transformer.output
  ) as {
    ok: true;
    result: TRPCResultMessage<TOutput>['result'];
  } | {
    ok: false;
    error: {
      error: inferRouterError<TRouter>;
    };
  };
}
