export default {
  component: globalThis.Components.Button,
  // FIXME: remove array subcomponents in 7.0?
  subcomponents: {
    Pre: globalThis.Components.Pre,
  },
  args: { children: 'Click Me!' },
  parameters: {
    docs: {
      description: {
        component: '**Component** description',
      },
    },
    chromatic: { disable: true },
  },
};

export const Basic = {};

export const CustomDescription = {
  parameters: {
    docs: {
      description: {
        story: '**Story** description',
      },
    },
  },
};
