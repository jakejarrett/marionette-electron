import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import { attributes } from "marionette-decorators";
import TopBarControls from "modules/common/components/TopBarControls";
import Template from "./index.html";
import "./index.scss";

/**
 * Top bar
 *
 * @module modules/views/topbar
 * @exports TopBarView
 */
@attributes({
	template: Template,
	className: "topbar"
})
class TopBarView extends View {

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
		this.registerComponent(App.Compontents, "app-controls", TopBarControls, this.$el.find("#topbar-container"), { title: "Home" });
    }

    onBeforeDestroy () {
        this.clearComponents();
    }

}

export default TopBarView;
