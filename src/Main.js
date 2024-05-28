// src/Main.js
import React, { useState, useEffect } from "react";

function Main() {
  const [livros, setLivros] = useState([]);
  const [editandoLivroIndex, setEditandoLivroIndex] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    paginas: "",
    autor: "",
  });

  useEffect(() => {
    const livrosSalvos = localStorage.getItem("livros");
    if (livrosSalvos) {
      setLivros(JSON.parse(livrosSalvos));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = () => {
    const { nome, paginas, autor } = formData;
    return nome.trim() && paginas.trim() && autor.trim();
  };

  const registrar = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novosLivros = [...livros];
    if (editandoLivroIndex !== null) {
      novosLivros[editandoLivroIndex] = formData;
      setEditandoLivroIndex(null);
    } else {
      novosLivros.push(formData);
    }
    setLivros(novosLivros);
    localStorage.setItem("livros", JSON.stringify(novosLivros));
    setFormData({ nome: "", paginas: "", autor: "" });
  };

  const editarLivro = (index) => {
    setFormData(livros[index]);
    setEditandoLivroIndex(index);
  };

  const deletarLivro = (index) => {
    const novosLivros = livros.filter((_, i) => i !== index);
    setLivros(novosLivros);
    localStorage.setItem("livros", JSON.stringify(novosLivros));
  };

  return (
    <div>
      <form id="meuFormulario" onSubmit={registrar}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="paginas">Paginas:</label>
        <input
          type="text"
          id="paginas"
          name="paginas"
          value={formData.paginas}
          onChange={handleChange}
          required
        />

        <label htmlFor="autor">Autor:</label>
        <input
          type="text"
          id="autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">
          {editandoLivroIndex !== null ? "Atualizar" : "Enviar"}
        </button>
      </form>
      <hr />
      <div className="titulo2">
        <h1>Livros</h1>
      </div>
      <div className="tabelaEstilo">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Páginas</th>
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <tr key={index}>
                <td>{livro.nome}</td>
                <td>{livro.paginas}</td>
                <td>{livro.autor}</td>
                <td>
                  <button onClick={() => editarLivro(index)}>Editar</button>
                  <button onClick={() => deletarLivro(index)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
