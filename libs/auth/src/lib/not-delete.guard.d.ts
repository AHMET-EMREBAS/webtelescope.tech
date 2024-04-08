import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '@webpackages/core';
/**
 * Prevent user from deleting his own data
 */
export declare class NotDeleteGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(ctx: ExecutionContext): boolean;
}
