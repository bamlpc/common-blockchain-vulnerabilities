push:
	git pull && git update-index --chmod=+x .github/scripts/commit.sh && git add . && git commit -m "ci: fix Permission denied error" && git push

PHONY: push
