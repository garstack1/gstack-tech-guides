# Cannot Reach Container

## Problem

One container cannot connect to another, or you cannot reach a container from your machine.

## Symptoms

Errors such as:

```text
could not resolve host
connection refused
```

## Common Causes

- The containers are not on the same user-defined network
- The hostname used does not match the target container's name
- The containers are on the default `bridge` network, which has no name resolution
- The port was never published, so the host cannot reach it

## Investigation

Check which network the containers are on.

```bash
docker network inspect my-net
```

Confirm the target container is running.

```bash
docker ps
```

## Resolution

Put both containers on the **same user-defined network**, and use the target's container name as the hostname.

```bash
docker network create my-net
docker run -d --name db --network my-net postgres:16
docker run -d --name app --network my-net my-app
```

To reach a container from your own machine, publish its port with `-p`.

## Prevention

- Always create a user-defined network for containers that talk to each other
- Match hostnames to container or service names exactly