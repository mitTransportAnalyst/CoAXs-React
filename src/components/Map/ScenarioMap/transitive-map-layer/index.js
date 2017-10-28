import {Map} from 'leaflet'
import isEqual from 'lodash.isequal'
import {PropTypes} from 'react'
import {MapLayer} from 'react-leaflet'
import Transitive from 'transitive-js'
import LeafletTransitiveLayer from 'leaflet-transitivelayer'
import "./style.css"

export default class TransitiveMapLayer extends MapLayer {
  static propTypes = {
    data: PropTypes.object.isRequired,
    map: PropTypes.instanceOf(Map),
    styles: PropTypes.object
  };

  shouldComponentUpdate (newProps, newState) {
    // console.log(!isEqual(newProps, this.props) || !isEqual(newState, this.state));
    return !isEqual(newProps, this.props) || !isEqual(newState, this.state)
  }

  componentWillMount () {
    super.componentWillMount();
    this.transitive = new Transitive({
      data: this.props.data,
      styles: this.props.styles,
     });
    this.leafletElement = new LeafletTransitiveLayer(this.transitive)
  }

  componentDidMount () {
    super.componentDidMount();
    this.leafletElement._refresh()
  }

  componentWillReceiveProps (props) {
    super.componentWillReceiveProps(props);
    this.transitive.updateData(props.data)
  }

  componentDidUpdate (prevProps, prevState) {
    this.leafletElement._refresh()
  }

  render () {
    return null
  }
}
