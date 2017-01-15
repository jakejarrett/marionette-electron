import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import {attributes, on} from "marionette-decorators";
import TopBarControls from "modules/common/components/TopBarControls";
import Template from "./home.html";
import "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 * @exports HomeView
 */
@attributes({
    template: Template,
    className: "home"
})
class HomeView extends View {

    constructor () {
        super();
    }

    initialize () { }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        this.setupComponents();
        this.setupComponentEventListeners();
    }

    setupComponents () {
        const componentContainer = this.$el.find("#topbar-container");

        this.registerComponent(App.Compontents, "app-controls", TopBarControls, componentContainer, {title: "Home"});
    }

    setupComponentEventListeners () {
        // const loginComponent = this.getComponent("login-component").radioChannel;
    }

    onBeforeDestroy () {
        this.getComponent("login-component").radioChannel.off("stateChange");
        this.clearComponents();
    }

}

export default HomeView;
