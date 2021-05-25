# project-template
An opinionated project template by TRIGO


# Generate Openshift deployment template:
Edit deploy/generate/generate.ts to your needs, the full API doc can be found here: https://github.com/trigo-at/trigo-create-openshift-app/tree/master/docs

run `npm run make:template`

If you need something that is not available in the API yet place the definition in deploy/generate/override
and it will be applied on top of the generated definition if kind and name match
eg. this would add the serviceAccount spec to the generated deployment config that matches the name template: 

```
apiVersion: v1
kind: DeploymentConfig
metadata:
  name: template
spec:
  template:
    spec:
      serviceAccount: 'template-serviceAccountName'
      serviceAccountName: 'template-serviceAccountName'
```
