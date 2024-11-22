export default {
  wrapper: 'fixed flex flex-col z-[500] pointer-events-none',
  position: 'start-0 end-0',
  container: 'pt-2.5 flex flex-col items-center gap-2',
  transition: {
    moveClass: 'transform ease-out duration-300 transition',
    enterActiveClass: 'transform ease-out duration-300 transition',
    leaveActiveClass: 'transform ease-out duration-300 transition absolute',
    enterFromClass: '-translate-y-2 opacity-0',
    enterToClass: 'translate-y-0 opacity-100',
    leaveFromClass: 'translate-y-0 opacity-100',
    leaveToClass: '-translate-y-2 opacity-0',
  },
}
