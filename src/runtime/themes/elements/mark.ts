export default {
  wrapper: 'relative',
  base: 'absolute text-white rounded-full inline-flex justify-center items-center',
  ring: 'ring-2 ring-white dark:ring-gray-900',
  rounded: 'rounded-full',
  background: 'bg-{color}-500',
  position: {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  },
  translate: {
    'top-left': '-translate-x-0.5 -translate-y-0.5',
    'top-right': 'translate-x-0.5 -translate-y-0.5',
    'bottom-left': '-translate-x-0.5 translate-y-0.5',
    'bottom-right': 'translate-x-0.5 translate-y-0.5',
  },
  size: {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  },
  value: {
    size: {
      xs: 'px-1 h-3 leading-none text-xs',
      sm: 'px-1.5 h-4 leading-none text-xs',
      md: 'px-2 h-5 leading-none text-sm',
    },
    translate: {
      'top-left': '-translate-x-1/3 -translate-y-1/3',
      'top-right': 'translate-x-1/3 -translate-y-1/3',
      'bottom-left': '-translate-x-1/3 translate-y-1/3',
      'bottom-right': 'translate-x-1/3 translate-y-1/3',
    },
  },
  transition: {
    moveClass: 'transform ease-out duration-300 transition',
    enterActiveClass: 'transform ease-out duration-300 transition',
    leaveActiveClass: 'transform ease-out duration-300 transition absolute',
    enterFromClass: 'translate-y-2 opacity-0',
    enterToClass: 'translate-y-0 opacity-100',
    leaveFromClass: 'translate-y-0 opacity-100',
    leaveToClass: '-translate-y-2 opacity-0',
  },
  default: {
    size: 'sm',
    color: 'primary',
    position: 'top-right',
  },
}
