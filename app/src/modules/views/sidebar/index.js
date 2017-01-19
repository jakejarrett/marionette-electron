import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import { attributes } from "marionette-decorators";
import Sidebar from "modules/common/components/Sidebar";
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
	className: "sidebar"
})
class SidebarView extends View {

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
		const props = [
			{
				name: "New item"
			},
			{
				name: "New item"
			},
			{
				name: "New item"
			}
		];

		this.registerComponent(App.Compontents, "app-sidebar", Sidebar, this.$el.find("#sidebar-container"), props);
    }

    onBeforeDestroy () {
        this.clearComponents();
    }

}

export default SidebarView;
