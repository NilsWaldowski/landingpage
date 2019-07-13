import { $qs, $qsa } from './utils.js'

export default class Into {
  constructor(selector) {
    this.$intro = $qs(selector)
    this.$introAnimater = $qsa('.intro-animater', this.$intro)
    this.$introImage = $qs('.intro-section__image', this.$intro)

    this.delay = 175

    this.startAnimation()

    this.$introImage.addEventListener('webkitAnimationEnd', this.myEndFunction)
    this.$introImage.addEventListener('animationend', this.myEndFunction)
    console.log(this.$introImage)
  }

  myEndFunction() {
    console.log('h')
  }

  startAnimation() {
    this.$introAnimater.forEach((animater, index) => {
      setTimeout(() => {
        animater.classList.add('is-visible')
      }, index * this.delay)
    })

    // this.$introImage.classList.add('is-visible')
    // this.$introImage.style.WebkitTransition = 'opacity 1.53s .35s ease-out'
    // this.$introImage.style.opacity = 1
  }
}
