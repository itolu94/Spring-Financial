/*jshint esversion: 6 */
import React, {Component} from 'react';
import Main from './Main';

class Layout extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">Spring Financial</a>
                        {/*<ul id="nav-mobile" className="left hide-on-med-and-down">*/}
                            {/*<li><a href="sass.html">Sass</a></li>*/}
                            {/*<li><a href="badges.html">Components</a></li>*/}
                            {/*<li><a href="collapsible.html">JavaScript</a></li>*/}
                        {/*</ul>*/}
                    </div>
                </nav>
                <div id="pageContent" className="container">
                    <Main/>
                </div>
            </div>
        )
    }
}

export default Layout;
