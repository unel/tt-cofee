
This is a realisation of the test assigment


For start the project type `docker compose up` in console, then open http://localhost site
You also could try to start only frontend by `npm run idnev` command from front folder, in this case site will be available by this address: http://localhost:8080

First start could be take a long time due to slow dependencies installation.

For developing purposes using docker variant is preferrable because this variant includes mock implementation for api. In that case you need to switch API_HOST variable in file [front/src/lib/api/coffee.ts](front/src/lib/api/coffee.ts) to API_DEV_HOST.
