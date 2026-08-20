# App Out of Sync

## Problem

Argo CD shows your application as **OutOfSync**, and the new version is not live.

## Symptoms

The app tile in the dashboard is marked **OutOfSync**, or a resource shows a sync error.

## Common Causes

- Auto-sync is off, so the change is detected but not applied
- The sync ran but a resource failed (a bad manifest or a bad image tag)
- Argo CD is watching the wrong branch or path
- The manifest in Git is invalid

## Investigation

- Open the app and click the resource that is out of sync to read its message.
- Check the app is watching the correct **branch** and **path** (for example `main` and `k8s`).
- If a pod will not start, the cause is usually the image, not Argo CD.

## Resolution

If auto-sync is off, either enable it or click **Sync** once. If a resource failed, fix the manifest or image tag in Git and let Argo CD reconcile. Use **Refresh** to prompt an immediate check.

## Prevention

- Enable auto-sync so Git changes apply on their own
- Validate manifests before committing them