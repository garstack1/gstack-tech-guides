# Drift and Self-Healing

What happens if someone changes the cluster directly, bypassing Git? The cluster no longer matches the source of truth. This is called **drift**, and Argo CD can automatically fix it. In this lesson you cause drift on purpose and watch Argo CD undo it. 🪄

## What we will do (in very simple steps)

1. Understand what drift is
2. Turn on self-healing
3. Change the cluster by hand and watch Argo CD revert it

---

## What is drift?

Git says the cluster should have two Snapshot pods. If someone runs a command that changes it to five, the cluster has **drifted** from Git. Reality and the source of truth disagree.

Left alone, drift is how systems slowly become a mystery: nobody is quite sure why production looks the way it does. GitOps fixes this by treating Git as the only truth and correcting anything that strays.

---

## Step 1: Turn on self-healing

Auto-sync keeps the cluster up to date when **Git** changes. **Self-heal** goes further: it also reverts changes made directly to the **cluster**.

In the Argo CD dashboard, open the `snapshot` app, go to **App Details**, and in the sync policy enable **Self Heal**.

> 💡 Declaratively, this is `selfHeal: true` inside the Application's `syncPolicy.automated` block.

---

## Step 2: Cause drift on purpose

Your manifest says `replicas: 2`. Let's change the live cluster to five, behind Git's back:

```bash
kubectl scale deployment snapshot --replicas=5
```

Check it:

```bash
kubectl get pods
```

You will see five Snapshot pods. The cluster now disagrees with Git.

---

## Step 3: Watch Argo CD heal it

Look at the Argo CD dashboard. It notices the difference and marks the app **OutOfSync**. Because self-heal is on, it then acts on its own: it scales the deployment back to the two replicas Git asked for.

Run this again after a moment:

```bash
kubectl get pods
```

You are back to two pods. Your manual change was quietly undone. Git won. 🎯

> ℹ️ Reconciliation runs on a short interval, so the fix can take a minute or two. You can also hit **Refresh** in the dashboard to prompt it.

---

## Why this matters

Self-healing gives you two strong guarantees:

- The cluster **always** trends back to what Git says, so it never quietly drifts.
- To change production, you change **Git**, which means every change is reviewed, recorded, and reversible.

Manual tinkering simply does not stick. That is exactly the discipline that makes large systems manageable.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- Self-heal is enabled on the `snapshot` app
- Scaling the deployment by hand made it OutOfSync
- Argo CD reverted it back to the replica count in Git

---

## 🩹 Common hiccups

- **It did not revert**: confirm **Self Heal** is enabled, not just auto-sync. They are separate settings.
- **It took a while**: reconciliation is periodic. Give it a minute, or click Refresh in the dashboard.
- **Pods keep flapping between counts**: that is the two systems disagreeing. Once self-heal settles, Git's value wins.

---

**Next up:** [Progressive Delivery](progressive-delivery.md), a look at safer rollout strategies like canary and blue-green.