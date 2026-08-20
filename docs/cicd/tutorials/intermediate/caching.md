# Faster Pipelines

Every pipeline run starts on a fresh machine, which means it re-downloads and reinstalls your dependencies from scratch, every single time. That is slow and wasteful. **Caching** lets a run reuse work from the last one, so your pipeline speeds up noticeably. ⚡

## What we will do (in very simple steps)

1. Understand what caching does
2. Turn on dependency caching
3. See the pipeline get faster

---

## How caching works

A cache stores files from one run so a later run can restore them instead of rebuilding them. It is keyed on a file, usually your dependency list:

- **First run**: nothing cached yet, so it installs normally and **saves** the result (a cache miss).
- **Next run**: if `requirements.txt` has not changed, it **restores** the saved packages instead of downloading them (a cache hit).
- **If you change `requirements.txt`**: the key changes, so it installs fresh and saves a new cache.

You always get correct results. Caching only skips work that would produce the same thing anyway.

---

## Step 1: Turn on pip caching

Caching your Python dependencies takes just one line. In the `test` job, update the Python setup step:

```yaml
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: 'pip'
```

The only addition is `cache: 'pip'`. It automatically caches your installed packages, keyed on `requirements.txt`.

---

## Step 2: See it work

Push the change:

```bash
git add .
git commit -m "Cache pip dependencies"
git push
```

The **first** run after this saves the cache. Push a trivial change and look at the **second** run: in the Python setup step you will see a **"Cache restored"** message, and the install step finishes far quicker. On a small app the saving is modest, but on real projects with many dependencies it can turn minutes into seconds. 🎉

---

## Going further

Two more speed levers, for when you need them:

- **Docker layer caching**: the build job can cache image layers between runs, so unchanged layers are not rebuilt. This uses Docker's `buildx` and a cache setting.
- **Matrices**: to test across several versions at once, a matrix runs the same job in parallel for each value:

    ```yaml
    strategy:
      matrix:
        python-version: ["3.11", "3.12", "3.13"]
    ```

    with `python-version: ${{ matrix.python-version }}`. Three test runs, in parallel, one per version.

These are optional. The pip cache alone already helps on most projects.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You added `cache: 'pip'` to the Python setup step
- A later run shows a "Cache restored" message
- You can explain when a cache is reused and when it is rebuilt

---

## 🩹 Common hiccups

- **Always a cache miss**: caching keys on `requirements.txt`. If that file keeps changing, the cache keeps rebuilding, which is expected.
- **No speed difference on the first run**: the first run only saves the cache. The benefit shows from the second run on.
- **Cache errors**: make sure `cache: 'pip'` sits under the `with:` of the `setup-python` step, correctly indented.

---

**Next up:** [Rollbacks](rollbacks.md), where you learn to undo a bad deploy quickly by returning to a previous version.