import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import NavigationView from "modules/common/views/navigation/navigation";
import {attributes, on} from "marionette-decorators";
import DemoComponent from "modules/common/components/demo-component";
import LoginComponent from "modules/common/components/login-component";
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

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        let Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("home");

        this.setupComponents();
        this.setupComponentEventListeners();
    }

    setupComponents () {
        const componentContainer = this.$el.find("#component-container");

        this.registerComponent(App.Compontents, "demo-component", DemoComponent, componentContainer);
        this.registerComponent(App.Compontents, "login-component", LoginComponent, componentContainer);
    }

    setupComponentEventListeners () {
        const loginComponent = this.getComponent("login-component").radioChannel;
        /** We can listen to events emitted by the component. **/
        loginComponent.on("stateChange", stateChange => {
            console.log(stateChange)
        });
    }

    onBeforeDestroy () {
        this.getComponent("login-component").radioChannel.off("stateChange");
        this.clearComponents();
    }

}

export default HomeView;
