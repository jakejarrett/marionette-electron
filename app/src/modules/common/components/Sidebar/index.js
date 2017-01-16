import { Component, on } from "@jakejarrett/marionette-component";
import { remote } from "electron";
import Template from "./index.html";
import Styles from "!css-loader?modules!sass-loader!./style.scss";

/**
 * The Sidebar component, handles anything that goes into the sidebar.
 */
class Sidebar extends Component {

	/**
	 * Component constructor, we run all our initialization here.
	 *
	 * @param elementName {String} The given element name (EG/ app-toolbar)
	 * @param props {Object} Render props, these are rendered with underscore's template method.
	 * @param localName {String} Passed from the app registration, used to prevent conflict with other elements.
	 * @returns {TopBarControls}
	 */
    constructor (elementName, props, localName) {
        super(elementName, localName);

        this.render(elementName, props);
		this._window = remote.getCurrentWindow();

        return this;
    }

	/**
	 * Render the component
	 *
	 * @param elementName {String} The element name (eg/ app-toolbar)
	 * @param props {Object} Properties that we render with (passed to _.template method)
	 */
	render (elementName, props) {
        let data = {
            props: props
        };

        const renderedTemplate = _.template(Template)(data);

        this.renderComponent(elementName, renderedTemplate, Styles);
    }

}

/**
 *  Export the Component
 *
 * @exports DemoComponent
 */
export default Sidebar;
