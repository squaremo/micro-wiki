## Microservice-based wiki

Build the various services:

    $ for d in */Makefile; do make -C `dirname $d`; done

You'll need a recent Node.JS and npm, and jq. And docker of course.

Make sure a [recent weave script][weave-script] is on your path and
start the infrastructure:

    $ ./microwikictl start-infra

Bring all the services up:

    $ ./microwikictl up

The web interface is port-mapped to 8080 on the docker host; the
Prometheus interface is port-mapped to 9090; and the dashboard is
port-mapped to 3000.

Run the load generator:

    $ ./microwikictl load

You can rebuild and restart a service:

    $ make -C preso
    $ ./microservice restart preso

[weave-script]: https://github.com/weaveworks/weave/releases/download/latest_release/weave
