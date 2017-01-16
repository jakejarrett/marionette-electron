import Marionette, { AppRouter } from "marionette";
import { controller, appRoute } from "marionette-decorators";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
@controller(new HomeRouterController)
class HomeRouter extends AppRouter {

    /**
     * When the (/) page route is hit, we will import the home view & then show it.
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
