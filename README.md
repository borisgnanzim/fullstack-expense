# Fullstack Expense Tracker

Une application web complète de gestion de dépenses personnelles. Suivez vos revenus et dépenses en temps réel avec une interface intuitive.

## 🚀 Fonctionnalités

- ✅ Ajouter/Supprimer des transactions
- 📊 Visualiser le solde, revenus et dépenses
- 📈 Ratio revenus/dépenses en temps réel
- 🎨 Interface moderne et responsive
- 🌍 Support multilingue (Français)
- 🔒 API REST sécurisée avec CORS

## 📋 Stack Technique

### Backend
- **Framework** : Django 6.0 + Django REST Framework
- **Base de données** : SQLite
- **Python** : 3.x
- **CORS** : django-cors-headers

### Frontend
- **Framework** : Next.js 15+ avec TypeScript
- **Styling** : Tailwind CSS + DaisyUI
- **État** : React Hooks
- **HTTP** : Axios
- **Notifications** : React Hot Toast
- **Icons** : Lucide React

## 📦 Installation

### Prérequis
- Python 3.x
- Node.js 18+
- Git

### Backend Setup

```bash
cd backend

# Créer et activer l'environnement virtuel
python -m venv env
.\env\Scripts\activate  # Windows
source env/bin/activate  # Linux/Mac

# Installer les dépendances
pip install -r requirements.txt

# Appliquer les migrations
python manage.py migrate

# Lancer le serveur
python manage.py runserver
```

Le serveur backend sera disponible sur `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🔌 API Endpoints

### Transactions
- `GET /api/transactions/` - Récupérer toutes les transactions
- `POST /api/transactions/` - Créer une nouvelle transaction
- `DELETE /api/transactions/{id}/` - Supprimer une transaction

**Format des données :**
```json
{
  "id": "uuid",
  "text": "Description de la transaction",
  "amount": 50.00,
  "created_at": "2026-03-31T10:30:00Z",
  "updated_at": "2026-03-31T10:30:00Z"
}
```

## 📝 Variables d'Environnement

### Frontend (`.env`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🏗️ Architecture

```
fullstack-expense/
├── backend/                 # API Django
│   ├── api/                # App Django principale
│   │   ├── models.py       # Modèles de données
│   │   ├── serializers.py  # Sérialisation DRF
│   │   ├── views.py        # ViewSets API
│   │   └── urls.py         # Routes API
│   ├── backend/            # Configuration Django
│   │   └── settings.py     # Configuration globale
│   └── manage.py           # CLI Django
│
└── frontend/               # Application Next.js
    ├── app/               # Pages et composants
    │   ├── page.tsx       # Page principale
    │   ├── api.ts         # Configuration Axios
    │   └── layout.tsx     # Layout global
    └── public/            # Ressources statiques
```

## 🔐 Configuration CORS

Le backend accepte les requêtes du frontend :
- `http://localhost:3000` (développement)
- `http://127.0.0.1:3000` (développement)

## 📱 Utilisation

1. Ouvrir `http://localhost:3000`
2. Cliquer sur "Ajouter une transaction"
3. Remplir la description et le montant
   - **Négatif** = Dépense 💰
   - **Positif** = Revenu 💵
4. Le solde, revenus et dépenses se mettent à jour en temps réel

## 🧪 Tests

### Backend
```bash
cd backend
python manage.py test api
```

## 🚀 Déploiement

### Production Backend
```bash
pip install gunicorn
gunicorn backend.wsgi:application
```

### Production Frontend
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Erreur de connexion API
- Vérifier que le backend tourne sur `http://localhost:8000`
- Vérifier la variable `NEXT_PUBLIC_API_URL`
- Vérifier les paramètres CORS dans `backend/settings.py`

### Erreur CORS
- Vérifier que `django-cors-headers` est installé
- Vérifier que `'corsheaders.middleware.CorsMiddleware'` est dans MIDDLEWARE
- Ajouter le domaine frontend à `CORS_ALLOWED_ORIGINS`

## 📄 Licence

MIT License

## 👨‍💻 Auteur

Fullstack Expense Tracker - 2026
