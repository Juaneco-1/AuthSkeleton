import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard.ts.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth (...roles: ValidRoles[]){
    
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(),UserRoleGuard)
    )

}
