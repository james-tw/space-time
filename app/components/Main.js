import React from 'react';

require('../sass/main.scss');

var Main = React.createClass({

    render: function() {
        return (
            <div className="main-container">
                {this.props.children}
            </div>
        );
    }

});

module.exports = Main;