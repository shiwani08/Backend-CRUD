# How Middleware, Routes and Controllers Work Together

Customer → Waiter (Middleware) → Menu (Route) → Chef (Controller) → Food (Response)

For example:

You (customer) say: “I want pizza” (you hit /products route).

Waiter (middleware) says: “Okay, let me check your order and table number” (auth/logging).

Menu (route) decides: “This order goes to the pizza chef” (maps URL to controller).

Chef (controller) cooks the pizza (fetches data or saves data).

Waiter (middleware again) serves it to you (response).

## In Layman’s Terms
- Routes: What you can ask for.

- Controllers: Who actually does the work.

- Middleware: The helpers that check or prepare things before/after the work.

### Instead of the "serve" in the json file, I can write anything and that will work as the command to run the server