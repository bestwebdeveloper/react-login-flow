import React from 'react'

interface asyncRequest<T> {
  asyncFn: (...args: any[]) => Promise<T>
  params: any[]
}

interface asyncRequestState<T> {
  error: string | null
  isLoading: boolean
  result: T | null | undefined
}

export const useAsyncRequest = <T>({ asyncFn, params }: asyncRequest<T>): asyncRequestState<T> => {
  const [state, setState] = React.useState<asyncRequestState<T>>({ error: null, isLoading: true, result: null })

  React.useEffect(() => {
    let isMounted = true

    const getResult = async () => {
      try {
        const asyncResult = await asyncFn(...params)

        if (isMounted) {
          setState({ error: null, isLoading: false, result: asyncResult })
        }
      } catch (e) {
        if (isMounted) {
          setState({ error: e.message, isLoading: false, result: undefined })
        }
      }
    }

    getResult()

    return () => {
      isMounted = false
    }
    // TODO: will work only for primitive values
    // use deepEqual+useRef to track change of params object
  }, [asyncFn, ...params])

  return state
}
