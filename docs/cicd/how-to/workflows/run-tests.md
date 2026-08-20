# Run Tests in CI

## When to Use This Guide

Use this guide to run your test suite automatically in the pipeline, so every change is checked.

---

!!! tip "Quick Command"

    ```yaml
    - run: pytest
    ```

---

## Step 1: Add the test steps

In your job, check out the code, set up the language, install dependencies, and run the tests:

```yaml
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - run: pip install -r requirements.txt pytest

      - run: pytest
```

## Step 2: Put tests before the build

Steps run top to bottom, and a failed step stops the job. Placing `pytest` **before** the build means a failing test blocks the build entirely.

---

## Common Issues

**"No module named app"**

Run pytest from the repository root, where your code and test files live.

**"pytest: command not found"**

Include `pytest` in the install step.

---

## Related Guides

- [Cache Dependencies](cache-dependencies.md)
- [Build and Push an Image](build-and-push.md)