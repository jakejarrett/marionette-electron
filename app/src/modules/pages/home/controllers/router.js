import Marionette, { AppRouter } from "marionette";
import { attribute, controller, appRoute } from "marionette-decorators";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
@controller(new HomeRouterController)
class HomeRouter extends AppRouter {

    constructor (...args) {
        super(args);
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    @appRoute("(/)")
    startIndexRoute () {
        System.import("../views/home").then(View => App.getContentContainer().show(new View.default()) );
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default HomeRouter;
