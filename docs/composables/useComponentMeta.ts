interface ComponentMetaState {
  [key: string]: any;
}

const useComponentsMetaState = () =>
  useState<ComponentMetaState>("components-meta", () => ({}));

export const fetchComponentMeta = async (name: string) => {
  const state = useComponentsMetaState();

  if (state.value[name]?.then) {
    await state.value[name];
    return state.value[name];
  }
  if (state.value[name]) {
    return state.value[name];
  }

  if (import.meta.server) {
    const event = useRequestEvent();
    if (event && event.node && event.node.res) {
      event.node.res.setHeader(
        "x-nitro-prerender",
        [
          event.node.res.getHeader("x-nitro-prerender"),
          `/api/component-meta/${name}.json`,
        ].filter(Boolean) as string[]
      );
    }
  }
  state.value[name] = $fetch(`/api/component-meta/${name}.json`).then(
    (meta) => {
      state.value[name] = meta;
    }
  );

  await state.value[name];
  return state.value[name];
};
