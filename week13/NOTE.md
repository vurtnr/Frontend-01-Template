# 每周总结可以写在这里

### 跟着老师走了vue3的reactive 
### 看了vue3的源码 还是有不理解的地方
### 在vue3最新的源码里，reactive中proxy监听变化之后，还使用了defineProperty重复监听了一遍，并不明白这是为什么  班班或者助教看到 能和老师说下让老给讲下么
```
  function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  if (
    hasOwn(target, isReadonly ? ReactiveFlags.READONLY : ReactiveFlags.REACTIVE)
  ) {
    return isReadonly
      ? target[ReactiveFlags.READONLY]
      : target[ReactiveFlags.REACTIVE]
  }
  // only a whitelist of value types can be observed.
  if (!canObserve(target)) {
    return target
  }
  const observed = new Proxy(
    target,
    collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers
  )
  /**
   上面已经proxy了，这里为什么又调用一遍Object.defineProperty?
  */
  def(
    target,
    isReadonly ? ReactiveFlags.READONLY : ReactiveFlags.REACTIVE,
    observed
  )
  return observed
}
```