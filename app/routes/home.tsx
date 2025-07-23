import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/home";

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async ({ request, context, params }, next) => {
    const { searchParams } = new URL(request.url);
    const callNext = searchParams.has("next");

    try {
      callNext && (await next());
    } catch (error) {
      if (isRouteErrorResponse(error)) {
        // The error is extracted in middleware. How to re-throw as if no middleware was applied?
        console.log("Middleware route error response", error);
      }
      throw error;
    }
  },
];
