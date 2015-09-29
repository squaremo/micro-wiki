.PHONY: all clean

GRAFANA_REV:=57055f72c4745abe6c33a26359ebfb6e59920345

all: grafana-plugins

grafana-plugins:
	git clone https://github.com/grafana/grafana-plugins.git
	cd grafana-plugins; git checkout $(GRAFANA_REV)

clean:
	rm -rf ./grafana-plugins
