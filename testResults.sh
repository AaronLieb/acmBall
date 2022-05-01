#!/bin/bash

# Usage: ./testResults.sh

id=$(jq ".tile_id" config.json)

r=$(curl \
  -H 'X-Master-key: $2b$10$BfSdlGY7.T2MK8eNEgBqx.ZDgA9oto5l2NO6PogwTLk27MQeiWRpC' \
  -H 'X-Bin-Meta: false' \
  --request GET \
    https://api.jsonbin.io/v3/b/626daf2125069545a32b655a/latest | jq ".results[$id]")

echo $e

[[ $r = "true" ]] && e=0 || e=1

exit $e