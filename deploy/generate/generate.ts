/* eslint-disable no-shadow */
/* eslint-disable no-new */
import {
    ConfigMap,
    Container,
    DefaultResources,
    DeploymentConfig,
    DeployOptions,
    fromConfigMap,
    fromContainer,
    fromSecrets,
    LightShipProbes,
    Parameter,
    propsFromParameter,
    RecreateStrategy,
    Route,
    Secret,
    Service,
    TrigoChart,
} from '@trigo/trigo-create-openshift-app';

import {resolve} from 'path';

// can also use loadParamsFromFile(resolve(__dirname, '../config/prod/settings.env')); to auto generate param definitions for configmaps and secrets
export const configParams: Parameter[] = [
    {
        name: 'FOO',
        required: true,
    },
    {
        name: 'BAR',
        required: true,
    },
];

export const secretParams: Parameter[] = [
    {
        name: 'FOO_SECRET',
        required: true,
    },
    {
        name: 'BAR_SECRET',
        required: true,
    },
];

//global options applied to all ressources, set this to your appname
export const deployOptions: DeployOptions = {
    name: 'template',
    labels: {
        app: 'template',
        deploymentconfig: 'template',
    },
};

class Template extends TrigoChart {
    constructor(deployOptions: DeployOptions) {
        super(deployOptions);


        //remove if you don't have secrets
        const secretProps = propsFromParameter(secretParams);
        new Secret(this, deployOptions, secretProps);

        //remove if you don't have a configmap
        const configMapProps = propsFromParameter(configParams);
        new ConfigMap(this, deployOptions, configMapProps);

        //service definitions
        new Service(this, deployOptions, {
            ports: [{port: 3000}],
        });

        //route definition if you need one,
        //if tls = true automaticly applies let's enrypt annotation
        new Route(this, deployOptions, {
            host: 'XXX.app.ocp.trigo.cloud',
            tls: true,
        });

        /**
         * Container definition, if you are using LightShip use probes: LightShipProbes
         * there is also a Healthz3000 to check /healthz on port 3000 otherwise specify your own probe
         *
         * DefaultResources, override individually if your app needs more
         * {
         *   cpuLimit: 100,
         *   memoryLimit: 256,
         *   memoryLimitUnit: 'Mi',
         *   cpuRequest: 100,
         *   memoryRequest: 256,
         *   memoryRequestUnit: "Mi",
         *  }
         */
        const container: Container = {
            name: deployOptions.name,
            probes: LightShipProbes,
            env: fromConfigMap(deployOptions.name, configMapProps).concat(fromSecrets(deployOptions.name, secretProps)),
            resources: {...DefaultResources, memoryLimit: 1, memoryLimitUnit: 'Gi'},
        };

        new DeploymentConfig(this, deployOptions, {
            triggerOnConfigChange: true,
            containers: [container],
            imageTrigger: [fromContainer(container)],
            strategy: RecreateStrategy,
        });
    }
}

export const chart = new Template(deployOptions);
