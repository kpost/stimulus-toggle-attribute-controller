import { Controller } from '@hotwired/stimulus'

// Stimulus controller that sets, removes or toggles a value from a html attribute in all
// all item targets.
//
// Controller accepts following data attributes:
// - data-toggle-attribute-attribute-value: HTML attribute to update the value for. Default: 'class'
// - data-toggle-attribute-value-value: Value in HTML attribute to add, remove or toggle
//
export default class extends Controller {
  static values = {
    attribute: String,
    value: String
  }
  static targets = ['item']

  connect() {
    this.toggleAttribute = this.hasAttributeValue ? this.attributeValue : 'class'
    this.toggleAttributeValue = this.hasValueValue ? this.valueValue.split(' ') : []
  }

  // Add the value to all itemTargets' html attribute
  add() {
    this.itemTargets.forEach(item => {
      item.setAttribute(this.toggleAttribute, this.addValue(item))
    })
  }

  // Remove the value from all itemTargets' html attribute
  remove() {
    this.itemTargets.forEach(item => {
      item.setAttribute(this.toggleAttribute, this.removeValue(item))
    })
  }

  // Toggle the value in all itemTargets' html attribute
  toggle() {
    this.itemTargets.forEach(item => {
      item.setAttribute(this.toggleAttribute, this.toggleValue(item))
    })
  }

  addValue(item) {
    return this.getAttribute(item)
             .split(' ')
             .concat(this.toggleAttributeValue)
             .filter((value, index, array) => array.indexOf(value) === index)
             .join(' ');
  }

  removeValue(item) {
    return this.getAttribute(item)
             .split(' ')
             .filter( ( el ) => !this.toggleAttributeValue.includes( el ) )
             .join(' ');
  }

  toggleValue(item) {
    if( this.getAttribute(item).includes(this.valueValue) ) {
      return this.removeValue(item)
    } else {
      return this.addValue(item)
    }
  }

  getAttribute(item) {
    return item.getAttribute(this.toggleAttribute) || ''
  }
}