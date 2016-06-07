var React = require('react');

var NavigationItem = React.createClass({

    render: function() {
        return (
            <li>
                <a href={this.props.path}>{this.props.title}</a>
            </li>
        );
    }

});

NavigationItem.propTypes = {
    path: React.PropTypes.string,
    title: React.PropTypes.string
}

module.exports = NavigationItem;