#!/bin/bash
# 简化的 RSS 抓取脚本，使用 curl 而不是 bun fetch

OUTPUT_DIR="/root/.openclaw/workspace/output"
mkdir -p "$OUTPUT_DIR"

echo "[simple-digest] Starting RSS fetch..."

# 测试几个主要的 RSS 源
FEEDS=(
  "simonwillison.net|https://simonwillison.net/atom/everything/"
  "jeffgeerling.com|https://www.jeffgeerling.com/blog.xml"
  "krebsonsecurity.com|https://krebsonsecurity.com/feed/"
  "antirez.com|http://antirez.com/rss"
  "overreacted.io|https://overreacted.io/rss.xml"
  "matklad.github.io|https://matklad.github.io/feed.xml"
  "paulgraham.com|http://www.aaronsw.com/2002/feeds/pgessays.rss"
  "dynomight.net|https://dynomight.net/feed.xml"
)

for feed in "${FEEDS[@]}"; do
  IFS='|' read -r name url <<< "$feed"
  echo "[simple-digest] Fetching $name..."
  curl -sL --max-time 10 "$url" -o "/tmp/rss-$name.xml" 2>/dev/null && echo "  ✓ Success" || echo "  ✗ Failed"
done

echo "[simple-digest] Done fetching."
ls -la /tmp/rss-*.xml 2>/dev/null | wc -l
echo " files downloaded"
