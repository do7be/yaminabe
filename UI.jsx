var CSSTransitionGroup = React.addons.CSSTransitionGroup;

PopItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      item: {
        text: '',
      }
    };
  },
  render() {
    var value = <span key={this.props.item.text}>{this.props.item.text}</span>
    return (
      <CSSTransitionGroup transitionName="popItem" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {value}
      </CSSTransitionGroup>
    );
  }
});
