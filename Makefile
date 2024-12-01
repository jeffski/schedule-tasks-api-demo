test:
		docker exec -it nodejs /bin/sh -c "npm run test"
.PHONY: test

e2e:
		docker exec -it nodejs /bin/sh -c "npm run test:e2e"

install:
		docker exec -it nodejs /bin/sh -c "npm install"

add:
		docker exec -it nodejs /bin/sh -c "npm install $(module)"
		$(MAKE) modules

modules:
		sudo docker cp nodejs:/app/node_modules/ ./