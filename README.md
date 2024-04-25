# Server Vigil

## Overview
Server Vigil is a simple server monitoring tool. Currently you can only see the last ping of your servers. More features coming soon.

## Getting Started

### Manager
The manager is at the heart of this project. He keeps track of all the machines and their measurement data. It is a SvelteKit project and can be used anywhere SvelteKit is running. You need to set `DATABASE_CONNECTION_URL` and `JWT_SECRET_KEY` environment variables. 

The manager requires a running PostgreSQL instance. You can use `DATABASE_CONNECTION_URL='connection url' npm run push` to apply any required migrations.

### Agent
The agent is a small executable that must be run on the servers to monitor them. You can build the executable with `cargo build --release`. Upload it to your server and create a cronjob to run it with the token you received when registering a new machine with the manager. The command to run the agent should look like this: `<agent-executable> '<token>'`.