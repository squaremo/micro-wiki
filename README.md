## Microservice-based wiki

Create some hosts:

    $ docker-machine create -d virtualbox micro-wiki-1
    $ docker-machine create -d virtualbox micro-wiki-2

Make sure a [recent weave script][weave-script] is on your path, and
*for each host* enlist the host in the weave network, supplying an IP
address for each of the hosts. Since I used `docker-machine` to create
the hosts, I switch between them with `docker-machine env`:

    $ hosts="$(docker-machine ip micro-wiki-1 micro-wiki-2)"
    $ eval $(docker-machine env micro-wiki-1)
    $ ./microwikictl enlist-host $hosts
    $ eval $(docker-machine env micro-wiki-2)
    $ ./microwikictl enlist-host $hosts

On one host, start the infrastructural services (etcd, prometheus, and
a dashboard):

    $ eval $(docker-machine env micro-wiki-1)
    $ ./microwikictl start-infra

On one or more hosts, bring all the services up:

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
