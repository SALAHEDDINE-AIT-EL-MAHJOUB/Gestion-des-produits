import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import './ProductView.css';
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
Chart.register(BarElement, CategoryScale, LinearScale, ArcElement);

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  PhotoUrl?: string;
  description?: string;
  listProduitId: number;
}

interface ProductList {
  id: number;
  name: string;
}

function ProductView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productLists, setProductLists] = useState<ProductList[]>([]);
  const [form, setForm] = useState<Omit<Product, "id" | "PhotoUrl"> & { imageUrl?: string }>({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    description: "",
    listProduitId: 1
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [filterListId, setFilterListId] = useState("");

  const filteredProducts = products.filter(p => {
    const matchName = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchList = filterListId === "" || String(p.listProduitId) === filterListId;
    return matchName && matchList;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    fetch("/api/product")
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          alert("Erreur API: " + text);
          throw new Error(text);
        }
        return res.json();
      })
      .then(setProducts)
      .catch(err => console.error(err));

    fetch("/api/productlist")
      .then(res => res.json())
      .then(setProductLists);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "listProduitId"
        ? Number(value)
        : value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setShowForm(true);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: "",
      description: product.description,
      listProduitId: product.listProduitId
    });
    setImageFile(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", String(form.price));
    formData.append("stock", String(form.stock));
    if (imageFile) {
      formData.append("image", imageFile);
      formData.append("PhotoUrl", imageFile.name);
    } else {
      formData.append("PhotoUrl", "");
    }
    formData.append("description", form.description || "");
    formData.append("listProduitId", String(form.listProduitId));

    const url = editId ? `/api/product/${editId}` : "/api/product";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      body: formData
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((prod: Product) => {
        if (editId) {
          setProducts(products.map(p => p.id === editId ? prod : p));
        } else {
          setProducts([...products, prod]);
        }
        setShowForm(false);
        setEditId(null);
        setForm({
          name: "",
          price: 0,
          stock: 0,
          imageUrl: "",
          description: "",
          listProduitId: 1
        });
        setImageFile(null);
      })
      .catch(err => {
        alert("Erreur : " + err.message);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/product/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter(p => p.id !== id)));
  };

  const defaultImage = "/images/no-image.png";

  const totalProducts = products.length;
const outOfStock = products.filter(p => p.stock === 0).length;

const chartData = {
  labels: ["Total Produits", "Rupture de stock"],
  datasets: [
    {
      label: "Nombre",
      data: [totalProducts, outOfStock],
      backgroundColor: ["#2298F1", "#D65B4A"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, precision: 0 } },
};

  if (!products) return <div>Chargement...</div>;

  return (
    <div style={{ paddingTop: window.innerWidth < 768 ? "64px" : "0" }}>
      {/* HEADER DASHBOARD STYLE */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center justify-content-center">
        <div className="row justify-content-center gap-4">
          <div className="col-12 col-md-6 col-lg-3 mb-6"style={{ marginRight: 200 }}>
            <div className="card text-white text-center" style={{ minHeight: 120, position: "relative", background: "#66B92E" }} >
              <div className="title">Total produits</div>
              <FaBoxOpen style={{ fontSize: 28, opacity: 0.3, position: "absolute", right: 13, top: 13 }} />
              <div className="value" style={{ fontSize: 32, fontWeight: 700 }}>
                {products.length === 0 ? <span>0</span> : totalProducts}
              </div>
              <div className="stat">Tous les produits</div>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div className="card text-white text-center" style={{ minHeight: 120, position: "relative", background: "#D65B4A" }}>
              <div className="title">Rupture de stock</div>
              <FaExclamationTriangle style={{ fontSize: 28, opacity: 0.3, position: "absolute", right: 13, top: 13 }} />
              <div className="value" style={{ fontSize: 32, fontWeight: 700 }}>
                {products.length === 0 ? <span>0</span> : outOfStock}
              </div>
              <div className="stat">Stock = 0</div>
            </div>
          </div>
        </div>
      </div>
      {/* Barre de recherche et filtre */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center justify-content-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-control"
          style={{ maxWidth: 220 }}
        />
        <select
          value={filterListId}
          onChange={e => setFilterListId(e.target.value)}
          className="form-select"
          style={{ maxWidth: 220 }}
        >
          <option value="">Toutes les listes</option>
          {productLists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({
              name: "",
              price: 0,
              stock: 0,
              imageUrl: "",
              description: "",
              listProduitId: 1
            });
            setImageFile(null);
          }}
        >
          {showForm && !editId ? "Fermer le formulaire" : " 📦 Créer un produit"}
        </button>
      </div>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => {
            setShowForm(false);
            setEditId(null);
            setForm({
              name: "",
              price: 0,
              stock: 0,
              imageUrl: "",
              description: "",
              listProduitId: 1
            });
            setImageFile(null);
          }}
        >
          <div
            className="card mb-4 shadow-sm"
            style={{ maxWidth: 500, width: "100%", margin: "0 auto", position: "relative" }}
            onClick={e => e.stopPropagation()} // Empêche la fermeture si on clique sur le formulaire
          >
            <div className="card-header bg-primary text-white">
              <i className={`bi ${editId ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
              {editId ? "Modifier le produit" : "Créer un produit"}
              <button
                type="button"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "transparent",
                  border: "none",
                  fontSize: "22px",
                  color: "#fff",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setForm({
                    name: "",
                    price: 0,
                    stock: 0,
                    imageUrl: "",
                    description: "",
                    listProduitId: 1
                  });
                  setImageFile(null);
                }}
              >
                &times;
              </button>
            </div>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-box"></i> Nom du produit
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nom du produit"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Prix DH
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Prix"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-stack"></i> Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-image"></i> Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-card-text"></i> Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-list-ul"></i> Liste de produits
                </label>
                <select
                  name="listProduitId"
                  value={form.listProduitId}
                  onChange={handleChange}
                  className="form-select"
                >
                  {productLists.map(list => (
                    <option key={list.id} value={list.id}>{list.name}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success w-100">
                  <i className={`bi ${editId ? "bi-pencil" : "bi-check-circle"}`}></i>
                  {editId ? " Modifier" : " Ajouter"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setEditId(null);
                      setShowForm(false);
                      setForm({
                        name: "",
                        price: 0,
                        stock: 0,
                        imageUrl: "",
                        description: "",
                        listProduitId: 1
                      });
                      setImageFile(null);
                    }}
                  >
                    <i className="bi bi-x-circle"></i> Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="product-cards-group d-flex flex-wrap justify-content-center">
        {paginatedProducts.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", fontSize: "18px", marginTop: "30px" }}>
            Aucun produit trouvé 📦.
          </div>
        ) : (
          <div className="container">
            <div className="row justify-content-center gap-3">
              {paginatedProducts.map((p, idx) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex mb-4" key={p.id ?? idx}>
                  <div className="card h-100 m-2" style={{ width: "100%" }}>
                    <div className="card-header text-center">
                      <strong>{p.name || 'Nom non défini'}</strong>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center">
                      {p.PhotoUrl && (
                        <img
                          src={`http://localhost:5029${p.PhotoUrl}`}
                          alt={p.name}
                          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                        />
                      )}
                      <p className="mb-1 d-flex align-items-center">
                        
                        <strong>Id : #{p.listProduitId}</strong>
                      </p>
                      <p className="mb-1 d-flex align-items-center">
                        <i className="bi bi-stack text-secondary me-1"></i>
                        <strong>Stock :</strong> {p.stock} unité(s)
                      </p>
                      <p className="mb-1 d-flex align-items-center">
                        <i className="bi bi-list-ul text-secondary me-1"></i>
                        <strong>Liste :</strong>{" "}
                        <span className="badge bg-info ms-1">
                          {productLists.find(l => l.id === p.listProduitId)?.name || ""}
                        </span>
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <p className="mb-1">
                       <strong>{p.price} DH</strong>
                      </p>
                      <div>
                        <button
                          onClick={() => handleEdit(p)}
                          className="btn btn-outline-warning btn-sm me-2"
                          title="Modifier"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="btn btn-outline-danger btn-sm"
                          title="Supprimer"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item${currentPage === i + 1 ? " active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
   
    </div>
  );
}

export default ProductView;