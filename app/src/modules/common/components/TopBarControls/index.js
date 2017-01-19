import { Component, on } from "@jakejarrett/marionette-component";
import { remote } from "electron";
import Template from "./index.html";
import Styles from "!css-loader?modules!sass-loader!./style.scss";

/** Utilize remote.require for importing about-window dependency **/
const openAboutWindow = remote.require('about-window').default;

/**
 * The TopBarControls component, handles our window controls.
 *
 * This should be outside of a view instance, instead in the App instance.
 */
class TopBarControls extends Component {

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

		const state = new Backbone.Model();
        const renderedTemplate = _.template(Template)(data);

        this.renderComponent(elementName, renderedTemplate, Styles, state);
    }

    /**
     * When the user clicks close, close the window.
     */
    @on("click #close")
    close (e) {
		this._window.close();
    }

    /**
     * When the user clicks close, close the window.
     */
    @on("click #minimize")
    minimize (e) {
		this._window.minimize();
    }

	/**
	 * When the user clicks close, close the window.
	 */
	@on("click #maximize")
	@on("dblclick #top-controls")
	toggleMaximize (e) {
		if (!this._window.isMaximized()) {
			this._window.maximize();
		} else {
			this._window.unmaximize();
		}

		this.setState("isMaximized", this._window.isMaximized());
	}

	@on("click #about")
	showAboutWindow () {
		openAboutWindow({
			icon_path: "../../app/assets/img/logo.png",
			bug_report_url: "https://github.com/jakejarrett/marionette-electron/issues/new",
			homepage: "https://github.com/jakejarrett/marionette-electron",
			description: "Starter pack for marionette w/ bleeding edge web standards.",
			license: "MIT"
		});
	}

	/**
	 * Set the state of this component (Basic backbone model)
	 *
	 * @param attribute {String} The name of the state you're setting
	 * @param state {*} The state you're setting.
	 */
	setState (attribute, state) {
		this.state.set(attribute, state);
		this.radioChannel.trigger("stateChange", {
			attribute: attribute,
			state: state
		});
	}

	/**
	 * Returns the state of a given attribute.
	 *
	 * @param attribute {String} The name of the state you're looking up
	 * @returns {*} The state of that value.
	 */
	getState (attribute) {
		return this.state.get(attribute);
	}
}

/**
 *  Export the Component
 *
 * @exports DemoComponent
 */
export default TopBarControls;
