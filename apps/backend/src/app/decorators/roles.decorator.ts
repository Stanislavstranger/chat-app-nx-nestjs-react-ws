import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@./interfaces';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
