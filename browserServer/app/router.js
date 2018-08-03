"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { router } = app;
    router.resources('block', '/browser/v1/block', 'block');
    router.resources('transaction', '/browser/v1/transaction', 'transaction');
    router.resources('account', '/browser/v1/account', 'account');
    router.resources('action', '/browser/v1/action', 'action');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDaEMsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUEifQ==