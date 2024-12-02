build:
		docker-compose up -d --build

start:
		docker-compose up

stop:
		docker-compose down

modules:
		sudo docker cp nodejs:/app/node_modules/ ./

migrate:
		docker exec -it nodejs /bin/sh -c "npx prisma migrate dev"

test:
		docker exec -it nodejs /bin/sh -c "npm run test"
.PHONY: test

e2e:
		docker exec -it nodejs /bin/sh -c "npm run test:e2e"

coverage:
		docker exec -it nodejs /bin/sh -c "npm run test:cov"

npm:
		docker exec -it nodejs /bin/sh -c "npm install"

add:
		docker exec -it nodejs /bin/sh -c "npm install $(module)"
		$(MAKE) modules

logs:
		docker logs nodejs -f
