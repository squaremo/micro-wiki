## Microservice-based wiki

Assumes you are using the weave proxy:

    $ weave launch
    $ eval $(weave env)

Build the various services:

    $ make -C pages
    $ make -C preso

Bring all the services up:

    $ ./microservicectl up

The web interface is port-mapped to 8080; the Prometheus interface is
port-mapped to 9090.

You can rebuild and restart a service:

    $ make -C preso
    $ ./microservice restart preso
