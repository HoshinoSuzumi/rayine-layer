export default {
  base: 'relative inline-flex flex-shrink-0 shadow-inner disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none transition ease-in-out duration-200 group',
  rounded: 'rounded-md',
  ring: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
  active: 'bg-{color}-500 dark:bg-{color}-400',
  inactive: 'bg-gray-100 dark:bg-gray-800',
  size: {
    '2xs': 'h-3 w-5',
    'xs': 'h-3.5 w-6',
    'sm': 'h-4 w-7',
    'md': 'h-5 w-9',
    'lg': 'h-6 w-11',
    'xl': 'h-7 w-[3.25rem]',
    '2xl': 'h-8 w-[3.75rem]',
  },
  bullet: {
    base: 'relative inline-block m-0.5 bg-white dark:bg-gray-900 pointer-events-none transform transition ease-in-out duration-300 group-active:scale-90 group-disabled:scale-100',
    shadow: 'shadow',
    rounded: 'rounded',
    size: {
      '2xs': 'h-2 w-2',
      'xs': 'h-2.5 w-2.5',
      'sm': 'h-3 w-3',
      'md': 'h-4 w-4',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
      '2xl': 'h-7 w-7',
    },
    translate: {
      '2xs': 'group-active:translate-x-1',
      'xs': 'group-active:translate-x-1.5',
      'sm': 'group-active:translate-x-2',
      'md': 'group-active:translate-x-2.5',
      'lg': 'group-active:translate-x-3',
      'xl': 'group-active:translate-x-3.5',
      '2xl': 'group-active:translate-x-4',
    },
    active: {
      '2xs': 'translate-x-2',
      'xs': 'translate-x-2.5',
      'sm': 'translate-x-3',
      'md': 'translate-x-4',
      'lg': 'translate-x-5',
      'xl': 'translate-x-6',
      '2xl': 'translate-x-7',
    },
    inactive: 'translate-x-0',
  },
  default: {
    size: 'md',
    color: 'primary',
  },
}