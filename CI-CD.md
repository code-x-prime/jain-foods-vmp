# CI/CD – Client & Front (server excluded)

**Rule:**

- **client/** me change → sirf **client** (customer website) deploy hota hai.
- **front/** me change → sirf **front** (admin panel) deploy hota hai.
- **server** ke liye koi workflow nahi; server manually deploy karo.

Branch: **main**. Push main pe jane par GitHub Actions path dekhta hai — jis folder me change hua, usi ka workflow chalta hai.

---

## Workflows

| File                                  | Kab chalta hai                                      | Kya karta hai                                                                          |
| ------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `.github/workflows/deploy-client.yml` | Push to `main` + **client/** me koi file change\*\* | VPS pe `git pull` → `client` me `npm ci` → `npm run build` → `pm2 restart jain-client` |
| `.github/workflows/deploy-front.yml`  | Push to `main` + **front/** me koi file change\*\*  | VPS pe `git pull` → `front` me `npm ci` → `npm run build` → `pm2 restart jain-admin`   |

Agar sirf `server/` ya koi aur folder change ho to koi deploy workflow nahi chalega.

---

## Tumhare VPS ke liye (IP: 72.60.221.123)

**Step 1 – GitHub repo me jao**  
Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

**Step 2 – Ye 3 secrets daalo (exact name same hona chahiye):**

| Name              | Value           |
| ----------------- | --------------- |
| `SSH_HOST`        | `72.60.221.123` |
| `SSH_USER`        | `root`          |
| `SSH_PRIVATE_KEY` | (neeche dekho)  |

**Step 3 – SSH private key kaise banao aur daalo**

**Option A – Naya key (recommended)**  
Apne laptop/PC pe (Git Bash ya terminal):

```bash
ssh-keygen -t ed25519 -C "github-jainfoods" -f ~/.ssh/github_jainfoods -N ""
```

- Public key VPS pe daalna hai:  
  `cat ~/.ssh/github_jainfoods.pub` copy karo → VPS pe:  
  `echo "paste-yahan" >> ~/.ssh/authorized_keys`
- Private key GitHub Secret me:  
  `cat ~/.ssh/github_jainfoods` **pura** copy karo (-----BEGIN ... se -----END ... tak) → GitHub me **SSH_PRIVATE_KEY** secret ki value me paste.

**Option B – Pehle se VPS pe login jis key se ho raha hai**  
Us key ka **private** part (jo tumhare PC pe hai) copy karke GitHub me **SSH_PRIVATE_KEY** me paste karo. Public key pehle se VPS pe `authorized_keys` me hona chahiye.

**Step 4 – REPO_PATH**  
Tumhara repo path `~/jain-foods-vmp` hai, isliye **REPO_PATH secret mat banao** — default use hoga. Agar kabhi path change ho to secret add karna: `REPO_PATH` = `/root/jain-foods-vmp` (ya jo path ho).

---

## GitHub pe Secrets (reference)

| Secret            | Value                                                                     | Zaroori?                             |
| ----------------- | ------------------------------------------------------------------------- | ------------------------------------ |
| `SSH_HOST`        | `72.60.221.123`                                                           | Haan                                 |
| `SSH_USER`        | `root`                                                                    | Haan                                 |
| `SSH_PRIVATE_KEY` | VPS ke liye SSH private key (pura content, `-----BEGIN ... END ...-----`) | Haan                                 |
| `REPO_PATH`       | VPS pe repo path (default: `~/jain-foods-vmp`)                            | Nahi, tumhare case me chhod sakte ho |

---

## VPS pe pehle se ye hona chahiye

- Git repo clone: `~/jain-foods-vmp` (ya jo path `REPO_PATH` me diya hai)
- Node + npm
- PM2, aur apps already start: `jain-client`, `jain-admin` (jaise `pm2 start m` se)

Pehli baar deploy se pehle VPS pe ek baar manually:

```bash
cd ~/jain-foods-vmp
git pull origin main
# client / front dono ke liye ek baar build kar lena theek hai
cd client && npm ci && npm run build
cd ../front && npm ci && npm run build
pm2 start m   # ya jain-client, jain-admin alag start
pm2 save
```

Uske baad CI/CD se sirf jo folder change hua hoga usi ka pull + build + pm2 restart hoga.

---

## Summary

- **Front ka code** push → **admin** (front) deploy.
- **Client ka code** push → **client** (website) deploy.
- **Server** — CI/CD me nahi, manual deploy.
