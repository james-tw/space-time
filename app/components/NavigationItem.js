var React = require('react');
import { Link } from 'react-router';

var NavigationItem = React.createClass({

    render: function() {
        return (
            <li>

                <Link to={this.props.path}>{this.props.title}</Link>
            </li>
        );
    }

});

NavigationItem.propTypes = {
    path: React.PropTypes.string,
    title: React.PropTypes.string
}

module.exports = NavigationItem;