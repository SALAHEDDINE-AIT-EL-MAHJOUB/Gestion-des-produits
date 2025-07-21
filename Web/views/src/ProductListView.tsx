import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./ProductListView.css";

interface ProductList {
  id: number;
  name: string;
}

const ProductListView: React.FC = () => {
  const [lists, setLists] = useState<ProductList[]>([]);
  const [form, setForm] = useState<{ name: string }>({ name: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/productlist")
      .then(res => res.json())
      .then(setLists);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/productlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(list => {
        setLists([...lists, list]);
        setShowForm(false); // <-- ferme le formulaire après ajout
        setForm({ name: "" }); // (optionnel) réinitialise le champ
      });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/productlist/${id}`, { method: "DELETE" })
      .then(() => setLists(lists.filter(l => l.id !== id)));
  };

  const startEdit = (id: number, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditName(e.target.value);

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`/api/productlist/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, name: editName })
    })
      .then(res => {
        if (res.ok) {
          return res.headers.get("content-type")?.includes("application/json")
            ? res.json()
            : Promise.resolve({});
        }
        throw new Error("Erreur lors de la modification");
      })
      .then(updated => {
        setLists(lists.map(l => l.id === editId ? updated : l));
        setEditId(null);
        setEditName("");
      })
      .catch(err => alert((err as Error).message));
  };

  const filteredLists = lists.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    String(l.id).includes(search)
  );

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Listes de produits</h2>
      
     

      {/* Bouton pour afficher le formulaire d'ajout */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <button
          className="product-list-add-btn"
          onClick={() => setShowForm(true)}
        >
          Ajouter une liste
        </button>
      </div>

       {/* Barre de recherche centrée */}
      <div className="product-list-search-bar mb-4 mb-4">
        {FaSearch({ style: { marginRight: 8, color: "#5dade2" } })}
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="product-list-search-input"
        />
      </div>

      {/* Formulaire d'ajout affiché seulement si showForm est true */}
      {showForm && (
        <div className="product-list-modal-bg" onClick={() => setShowForm(false)}>
          <div className="product-list-modal" onClick={e => e.stopPropagation()}>
            <h3 className="product-list-modal-title">Ajouter une liste</h3>
            <form onSubmit={handleSubmit} className="product-list-modal-form">
              <input
                name="name"
                placeholder="Nom de la liste"
                value={form.name}
                onChange={handleChange}
                required
                className="product-list-modal-input"
              />
              <button type="submit" className="product-list-add-btn">
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="product-list-btn-cancel"
              >
                Annuler
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="product-list-modal-close"
              aria-label="Fermer"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <table className="product-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLists.map((l, idx) => (
            <tr
              key={l.id}
              className={idx % 2 === 0 ? "product-list-row-even" : "product-list-row-odd"}
            >
              <td style={{ textAlign: "center", fontWeight: "500" }}>{l.id}</td>
              <td>
                {editId === l.id ? (
                  <form onSubmit={handleEditSubmit} style={{ display: "flex", gap: 8 }}>
                    <input
                      value={editName}
                      onChange={handleEditChange}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #5dade2",
                        background: "#f8f9fa"
                      }}
                      autoFocus
                    />
                    <button type="submit" className="product-list-btn-edit">
                      {FaEdit({})}
                      Valider
                    </button>
                    <button type="button" onClick={() => setEditId(null)} className="product-list-btn-cancel">
                      Annuler
                    </button>
                  </form>
                ) : (
                  l.name
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {editId === l.id ? null : (
                  <>
                    <button
                      onClick={() => startEdit(l.id, l.name)}
                      className="product-list-btn-edit"
                      style={{ marginRight: "8px" }}
                    >
                      {FaEdit({})}
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="product-list-btn-delete"
                    >
                      {FaTrash({})}
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {filteredLists.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                Aucune liste trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListView;