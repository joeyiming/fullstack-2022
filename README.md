## Create Heroku App Remotely
1. `heroku create`
2. `heroku addons:create heroku-postgresql:hobby-dev -a <app-name>`
3. `heroku config -a <app-name>`

## Connect
- `heroku run psql -h <host-of-postgres-addon> -p 5432 -U <username> <dbname> -a <app-name>`