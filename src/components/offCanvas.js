import { $qs, $qsa } from './utils.js'

export default class OffCanvas {
  constructor(selector) {
    this.$menu = $qs(selector)
    this.$trigger = $qs('.burger')
    this.$body = $qs('body')
    this.$pageOverlay = $qs('.page-overlay')
    this.classes = {
      isActive: 'is-visible',
      menuIsOpen: 'menu-is-open',
    }
    this.state = {
      isOpen: false,
    }

    this.scrollBarWidth = this.getScollbarWidth()

    this.addListener()
  }

  getScollbarWidth() {
    const documentWidth = document.documentElement.clientWidth
    const windowWidth = window.innerWidth
    return windowWidth - documentWidth
  }

  addListener() {
    this.$trigger.addEventListener('click', e => this.toggleMenu(e))
    this.$pageOverlay.addEventListener('click', e => this.toggleMenu(e))
  }

  toggleMenu(e) {
    if (this.state.isOpen) {
      this.showOffCanvas()
    } else {
      this.hideOffCanvas()
    }
  }

  showOffCanvas() {
    this.$menu.classList.remove(this.classes.isActive)
    this.$body.classList.remove(this.classes.menuIsOpen)
    this.$body.style.paddingRight = 0
    this.$trigger.style.paddingRight = 0
    this.state.isOpen = false
  }

  hideOffCanvas() {
    this.$menu.classList.add(this.classes.isActive)
    this.$body.classList.add(this.classes.menuIsOpen)
    this.$body.style.paddingRight = this.scrollBarWidth + 'px'
    this.$trigger.style.paddingRight = this.scrollBarWidth + 'px'
    this.state.isOpen = true
  }
}
