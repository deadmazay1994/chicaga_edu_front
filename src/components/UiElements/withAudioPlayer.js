export const withAudioPlayer = Player => {
  return {
    functional: true,
    name: "withAudioPlayer",
    render(h, ctx) {
      console.log(ctx);
      return h(
        Player,
        {
          ...ctx.data
        },
        ctx.children
      );
    }
  };
};
