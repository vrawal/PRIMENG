import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(
  {
    ...config,
    remotes: [
      ['operation_names', 'https://icy-rock-0adac8500.azurestaticapps.net/operation_names/remoteEntry.js'],
      ['vehicle', 'https://icy-rock-0adac8500.azurestaticapps.net/vehicle/remoteEntry.js'],
      ['person', 'https://icy-rock-0adac8500.azurestaticapps.net/person/remoteEntry.js'],
    ],
  },
  { dts: false }
);
