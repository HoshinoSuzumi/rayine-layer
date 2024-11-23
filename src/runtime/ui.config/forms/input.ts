import { standard } from '..'

export default {
  wrapper: 'relative',
  base: 'relative w-full block focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 transition',
  placeholder: 'placeholder:text-gray-400 dark:placeholder:text-gray-500',
  rounded: 'rounded-md',
  size: {
    ...standard.size,
  },
  padding: {
    ...standard.padding,
  },
  variant: {
    outline: 'shadow-sm bg-transparent text-gray-900 dark:text-white ring ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400',
    plain: 'bg-transparent',
  },
  default: {
    size: 'sm',
    color: 'primary',
    variant: 'outline',
  },
}
