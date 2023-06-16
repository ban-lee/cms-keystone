import { CSSProperties } from 'react';
import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

const HeaderStyles: CSSProperties = {
  paddingInline: '1em',
  margin: '2em 0 0.5em',
};

export function CustomNavigation({ lists, authenticatedItem }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <li><h3 style={HeaderStyles}>Admin</h3></li>
      <ListNavItems lists={lists} include={['User']} />
      <li><h3 style={HeaderStyles}>Arknights</h3></li>
      <ListNavItems lists={lists} include={[
        'Event',
        'GachaBanner',
        'Material',
        'Operator',
        'Skin',
      ]} />
    </NavigationContainer>
  );
}
