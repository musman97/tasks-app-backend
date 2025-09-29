export const PUBLIC_KEY = 'isPublic';

import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
