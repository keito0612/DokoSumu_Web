# ===========================================
# Docker 操作コマンド
# ===========================================

# 開発環境
# docker-compose.yml + docker-compose.dev.yml をマージ
build:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

nbuild:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d 

up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

logs:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# 本番環境 (ローカルテスト用)
# docker-compose.yml + docker-compose.prod.yml をマージ
prod-build:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build

prod-up:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

prod-logs:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

# 環境変数ファイルを指定して実行
prod-up-env:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file src/.env.production up -d

# ===========================================
# コンテナ操作
# ===========================================
api:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec api bash

nextjs:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec next bash

rapi:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec -u root api bash

# ===========================================
# ログ表示
# ===========================================
wlog:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs web

alog:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs api

nlog:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs next

# ===========================================
# その他
# ===========================================
dls:
	docker container ls

# nextコンテナのnode_modulesをホストにコピー
nodem:
	docker cp prerebi-next:/app/node_modules ./next/

dump:
	@echo "Running the MySQL backup script..."
	@/bin/bash scripts/mysql_backup.sh

clog:
	cat /var/log/cron

cedit:
	crontab -e

# Huskyの設定で、-T オプションを記述
test:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec -T api php artisan test

# 設定確認 (マージ結果を表示)
config-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml config

config-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml config
