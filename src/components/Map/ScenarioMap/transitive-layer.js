/** A react-leaflet transitive layer */

import { MapLayer } from 'react-leaflet'
import { PropTypes } from 'react'
import LTransitiveLayer from 'leaflet-transitivelayer'
import Transitive from 'transitive-js'

export default class TransitiveLayer extends MapLayer {
  // TODO proptypes
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  componentWillMount () {
    super.componentWillMount()
    let { data, ...rest } = this.props
    this.transitive = new Transitive({ data, ...rest })
    this.leafletElement = new LTransitiveLayer(this.transitive)
  }

  componentDidMount () {
    super.componentDidMount()
    this.leafletElement._refresh() // leaflet-transitive issue #2
  }

  // TODO I think we can update a leaflet layer
}
