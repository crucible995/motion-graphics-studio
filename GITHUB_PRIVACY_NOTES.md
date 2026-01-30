# GitHub Privacy Notes

An honest assessment of GitHub's privacy and security, compiled January 2026.

---

## The Honest Assessment

### The Good
- TLS encryption in transit, encrypted at rest
- SOC 2 compliant, regular security audits
- Secret scanning & push protection
- Used by 90% of Fortune 100 companies
- Research institutions like EMBL-EBI, MIT, and major universities use it

### The Concerning

**Copilot Data Leakage (Real Incidents):**
- Researchers found Copilot could leak AWS keys and zero-day bugs from private repos via prompt injection
- "Zombie Data" issue - repos made private were still accessible through Copilot because it cached them when they were public
- Microsoft Copilot continued exposing private repos even after being notified

**Training Data Policies:**

| Tier | Trains on Your Code? |
|------|---------------------|
| Free | **Yes** - prompts may be used for model improvement |
| Pro | No (as of recent policy) |
| Business/Enterprise | No (but code still sent to their servers for analysis) |

**The Catch:** Even if they don't *train* on your code, your code is still sent to Microsoft/Azure servers for processing. Depending on NDAs or institutional policies, this could already be a breach.

### What Researchers Say

From a PLOS Biology paper on GitHub for lab research:
> "GitHub is not suitable for storing sensitive data, as it might breach institutional guidelines. Platforms similar to GitHub such as **GitLab and Bitbucket might be more suitable** for certain labs to meet their privacy or hosting requirements."

---

## Recommendation for Sensitive Work

| Sensitivity Level | Recommendation |
|------------------|----------------|
| **Low** (tutorials, public libs) | GitHub is fine |
| **Medium** (proprietary but not critical) | GitHub Enterprise with Copilot disabled |
| **High** (sensitive research, IP) | Self-hosted **Forgejo** or **GitLab** |
| **Critical** (regulated, biosecurity) | Air-gapped self-hosted GitLab |

---

## Quick Win: Disable Copilot for Sensitive Repos

If you stay on GitHub, at minimum:
```bash
# Create .github/copilot-settings.json in your repo
{
  "content_exclusion": {
    "enabled": true,
    "paths": ["**/*"]  # Exclude everything
  }
}
```

---

## Sources

- [GitHub Copilot Chat Flaw Leaked Data From Private Repositories - SecurityWeek](https://www.securityweek.com/github-copilot-chat-flaw-leaked-data-from-private-repositories/)
- [Private GitHub Repos Still Reachable Through Copilot - gHacks](https://www.ghacks.net/2025/02/26/private-github-repos-still-reachable-through-copilot-after-being-made-private/)
- [Microsoft Copilot Continues to Expose Private Repositories - Developer Tech](https://www.developer-tech.com/news/microsoft-copilot-continues-to-expose-private-github-repositories/)
- [GitHub Copilot Privacy: Key Risks - GitGuardian](https://blog.gitguardian.com/github-copilot-security-and-privacy/)
- [GitHub Enables Collaborative Laboratory Research - PLOS Biology](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3003029)
- [Self-Hosted Git Platforms 2026 Comparison](https://dasroot.net/posts/2026/01/self-hosted-git-platforms-gitlab-gitea-forgejo-2026/)
