# Cache Dependencies

## When to Use This Guide

Use this guide to speed up a workflow by reusing installed dependencies between runs.

---

!!! tip "Quick Command"

    ```yaml
    with:
      cache: 'pip'
    ```

---

## Step 1: Enable caching

For Python, add `cache: 'pip'` to the setup step:

```yaml
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: 'pip'
```

It caches your packages, keyed on `requirements.txt`.

## How it behaves

- **First run**: saves the cache (a miss).
- **Later runs**: restores it if `requirements.txt` is unchanged (a hit).
- **If `requirements.txt` changes**: it rebuilds the cache.

---

## Common Issues

**Always a cache miss**

The cache key is your dependency file. If it keeps changing, the cache keeps rebuilding, which is expected.

**No speed difference the first time**

The first run only saves the cache. The benefit shows from the second run on.

---

## Related Guides

- [Run Tests in CI](run-tests.md)