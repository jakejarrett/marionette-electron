import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import {attributes, on} from "marionette-decorators";
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

    setupComponents () {}

    setupComponentEventListeners () {}

    onBeforeDestroy () {
        this.clearComponents();
    }

}

export default HomeView;
