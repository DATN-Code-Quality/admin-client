import { DependencyList, useCallback, useState, useRef } from 'react';
import { useMountedState } from 'react-use';
import { ResponseData } from '../constant';

export type AsyncState<T> =
    | {
          loading: boolean;
          error?: undefined;
          value?: undefined;
      }
    | {
          loading: false;
          error: ResponseData<T>;
          value?: undefined;
      }
    | {
          loading: false;
          error?: undefined;
          value: ResponseData<T>;
      };

export type AsyncFn<Result = any, Args extends any[] = any[]> = [
    AsyncState<Result>,
    (...args: Args | any) => any,
];

export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
    fn: (...args: Args) => any,
    deps: DependencyList = [],
    initialState: AsyncState<Result> = { loading: false },
): AsyncFn<Result, Args> {
    const lastCallId = useRef(0);
    const [state, set] = useState<AsyncState<Result>>(initialState);

    const isMounted = useMountedState();

    const callback = useCallback((...args: Args) => {
        const callId = ++lastCallId.current;
        set({ loading: true });
        return fn(...args).then(
            value => {
                isMounted() && callId === lastCallId.current && set({ value, loading: false });
                return value;
            },
            error => {
                isMounted() && callId === lastCallId.current && set({ error, loading: false });
                return error;
            },
        );
    }, deps);

    return [state, callback];
}
