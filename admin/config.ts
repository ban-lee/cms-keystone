import { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './custom-navigtion';

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
};
