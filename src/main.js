import { $qs, $qsa } from './components/utils.js'
import OffCanvas from './components/offCanvas.js'
import Intro from './components/section-intro.js'

const offCanvasMenu = new OffCanvas('.off-canvas')
const intro = new Intro('.intro-section')

const introSection = $qs('.intro-section')
const burger = $qs('.burger')
const logo = $qs('.logo')

var prevRatio = 0.0
var increasingColor = 'rgba(255, 255, 255, ratio)'

const $stageImage = $qs('.intro-section__image')
const $stageContent = $qs('.intro-content')
const $header = $qs('header')

let initialLoad = true

let introObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      // console.log('entry:', entry.intersectionRatio)

      /**
       * Transition stage image for the first load
       */
      if (prevRatio === 0 && initialLoad) {
        let stageAnimation = $stageImage.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          {
            duration: 750,
            delay: 350,
            easing: 'ease-out',
          },
        )
        initialLoad = false
        stageAnimation.onfinish = function() {
          $stageImage.classList.add('initial-animation-done')
        }
      }

      /**
       * Change Logo/Burger appearance for different section background
       */
      if (entry.intersectionRatio > 0.07) {
        burger.classList.remove('is-black')
        logo.classList.remove('is-black')
        // $header.classList.remove('is-white')
      } else {
        burger.classList.add('is-black')
        logo.classList.add('is-black')
        // $header.classList.add('is-white')
      }

      /**
       * Decrease/increase opacity and transform values for smooth section transition
       */
      const increasingRatio = (entry.intersectionRatio - 1) * -1

      if (prevRatio !== 0) {
        if (entry.intersectionRatio < 1) {
          $stageImage.style.opacity = 1 - increasingRatio * 1.25
          // $stageImage.style.transform = `translateY(${increasingRatio * 150}px)`
          $stageContent.style.opacity = 1 - increasingRatio * 2.25
          $stageContent.style.transform = `translateY(-${increasingRatio *
            100}px)`
        } else {
          $stageImage.style.opacity = 1
          // $stageImage.style.transform = 'translateY(0px)'
          $stageContent.style.opacity = 1
          $stageContent.style.transform = 'translateY(0px)'
        }
      }

      prevRatio = entry.intersectionRatio
    })
  },
  {
    threshold: buildThresholdList(),
  },
)

introObserver.observe(introSection)

function buildThresholdList() {
  var thresholds = []
  var numSteps = 60

  for (var i = 1.0; i <= numSteps; i++) {
    var ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}
